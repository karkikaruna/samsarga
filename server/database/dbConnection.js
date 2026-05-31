import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "job_board",
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error("Database connection failed:", err.message);
      process.exit(1);
    });
};
