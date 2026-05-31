import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role === "Employer") {
    return next(new ErrorHandler("Employers cannot submit applications.", 400));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload a resume file.", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "application/pdf"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(new ErrorHandler("Invalid file type. Please upload a PNG, JPG, WEBP, or PDF.", 400));
  }

  const cloudinaryResponse = await cloudinary.v2.uploader.upload(resume.tempFilePath, {
    folder: "job_board_resumes",
  });

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(new ErrorHandler("Failed to upload resume. Please try again.", 500));
  }

  const { name, email, coverLetter, phone, address, jobId } = req.body;

  if (!name || !email || !coverLetter || !phone || !address || !jobId) {
    return next(new ErrorHandler("Please fill in all required fields.", 400));
  }

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  const existing = await Application.findOne({
    "applicantID.user": req.user._id,
    "employerID.user": jobDetails.postedBy,
  });
  if (existing) {
    return next(new ErrorHandler("You have already applied for this job.", 400));
  }

  const application = await Application.create({
    name, email, coverLetter, phone, address,
    applicantID: { user: req.user._id, role: "Job Seeker" },
    employerID:  { user: jobDetails.postedBy, role: "Employer" },
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Application submitted successfully!",
    application,
  });
});

export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role === "Job Seeker") {
    return next(new ErrorHandler("Job Seekers cannot access this resource.", 400));
  }
  const applications = await Application.find({ "employerID.user": req.user._id });
  res.status(200).json({ success: true, applications });
});

export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role === "Employer") {
    return next(new ErrorHandler("Employers cannot access this resource.", 400));
  }
  const applications = await Application.find({ "applicantID.user": req.user._id });
  res.status(200).json({ success: true, applications });
});

export const jobseekerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role === "Employer") {
    return next(new ErrorHandler("Employers cannot delete applications.", 400));
  }
  const application = await Application.findById(req.params.id);
  if (!application) {
    return next(new ErrorHandler("Application not found.", 404));
  }

  if (application.applicantID.user.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You are not authorised to delete this application.", 403));
  }

  if (application.resume?.public_id) {
    await cloudinary.v2.uploader.destroy(application.resume.public_id);
  }

  await application.deleteOne();
  res.status(200).json({ success: true, message: "Application deleted successfully!" });
});
