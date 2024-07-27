import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
  sendto  : {type : mongoose.Schema.Types.ObjectId , ref : "Auth"},
  leaveType: String,
  startDate: Date,
  endDate: Date,
  reason: String,
  status: { type: String, default: "Pending" , enum : ['Pending' , "Approved" , "Rejected"] }, // Pending, Approved, Rejected
});

export const Leave = mongoose.model("Leave", leaveSchema);
