import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill in all fields.", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("This email is already registered.", 409));
  }

  const user = await User.create({ name, email, phone, password, role });
  sendToken(user, 201, res, "Registered successfully!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password and role.", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password.", 401));
  }

  if (user.role !== role) {
    return next(new ErrorHandler(`No ${role} account found with this email.`, 403));
  }

  sendToken(user, 200, res, "Logged in successfully!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    })
    .json({ success: true, message: "Logged out successfully." });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new ErrorHandler("User not found.", 404));
  res.status(200).json({ success: true, user });
});
