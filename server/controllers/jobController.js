import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({ success: true, jobs });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seekers are not allowed to post jobs.", 400));
  }

  const {
    title, description, category, country,
    city, location, fixedSalary, salaryFrom, salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide all required job details.", 400));
  }

  const hasFixed  = fixedSalary  && String(fixedSalary).trim()  !== "";
  const hasRanged = salaryFrom   && String(salaryFrom).trim()   !== ""
                 && salaryTo     && String(salaryTo).trim()     !== "";

  if (!hasFixed && !hasRanged) {
    return next(new ErrorHandler("Please provide either a fixed salary or a salary range.", 400));
  }
  if (hasFixed && hasRanged) {
    return next(new ErrorHandler("Please provide either fixed salary or a range, not both.", 400));
  }

  const job = await Job.create({
    title, description, category, country, city, location,
    postedBy: req.user._id,
    ...(hasFixed  ? { fixedSalary }          : {}),
    ...(hasRanged ? { salaryFrom, salaryTo }  : {}),
  });

  res.status(201).json({ success: true, message: "Job posted successfully!", job });
});

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role === "Job Seeker") {
    return next(new ErrorHandler("Job Seekers cannot access this resource.", 400));
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({ success: true, myJobs });
});

export const updateJob = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role === "Job Seeker") {
    return next(new ErrorHandler("Job Seekers cannot access this resource.", 400));
  }
  const job = await Job.findById(req.params.id);
  if (!job) return next(new ErrorHandler("Job not found.", 404));

  if (job.postedBy.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You are not authorised to update this job.", 403));
  }

  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, message: "Job updated successfully!", job: updated });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role === "Job Seeker") {
    return next(new ErrorHandler("Job Seekers cannot access this resource.", 400));
  }
  const job = await Job.findById(req.params.id);
  if (!job) return next(new ErrorHandler("Job not found.", 404));

  if (job.postedBy.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You are not authorised to delete this job.", 403));
  }

  await job.deleteOne();
  res.status(200).json({ success: true, message: "Job deleted successfully!" });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) return next(new ErrorHandler("Job not found.", 404));
  res.status(200).json({ success: true, job });
});
