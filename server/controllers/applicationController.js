import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("Only job seekers can submit applications.", 400));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume file is required.", 400));
  }

  const resumeFile = Array.isArray(req.files.resume)
    ? req.files.resume[0]
    : req.files.resume;

  if (!resumeFile) {
    return next(new ErrorHandler("Resume file is required.", 400));
  }

  const allowedFormats = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "application/pdf",
  ];

  if (!allowedFormats.includes(resumeFile.mimetype)) {
    return next(
      new ErrorHandler(
        "Invalid file type. Please upload a PNG, JPG, WEBP, or PDF file.",
        400
      )
    );
  }

  const resourceType =
    resumeFile.mimetype === "application/pdf" ? "raw" : "image";

  let cloudinaryResponse;
  try {
    cloudinaryResponse = await cloudinary.v2.uploader.upload(
      resumeFile.tempFilePath,
      { resource_type: resourceType }
    );
  } catch (uploadError) {
    
    console.error("[Cloudinary Upload Failed]", uploadError.message);
    return next(new ErrorHandler("Resume upload failed. Please try again.", 500));
  }

  if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
    console.error("[Cloudinary] Upload returned no URL");
    return next(new ErrorHandler("Resume upload failed. Please try again.", 500));
  }

  const { name, email, coverLetter, phone, address, jobId } = req.body;

  if (!name || !email || !coverLetter || !phone || !address) {
    return next(new ErrorHandler("Please fill in all required fields.", 400));
  }

  if (!jobId) {
    return next(new ErrorHandler("Job ID is missing.", 404));
  }

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  const applicantID = { user: req.user._id, role: "Job Seeker" };
  const employerID = { user: jobDetails.postedBy, role: "Employer" };

  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Application submitted successfully!",
    application,
  });
});

export const employerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seekers are not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({ success: true, applications });
  }
);

export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employers are not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({ success: true, applications });
  }
);

export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(new ErrorHandler("Employers cannot delete applications.", 400));
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found.", 404));
    }
    await application.deleteOne();
    res.status(200).json({ success: true, message: "Application withdrawn successfully." });
  }
);