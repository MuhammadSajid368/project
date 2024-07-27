import { Leave } from "../../models/Leave.js";
import mongoose from "mongoose";

export const getAuthenticatedUserLeaves = async (req, res) => {
  try {
    const teacherId = new mongoose.Types.ObjectId(req.params.teacherId); 

    // Aggregation pipeline to sort leaves with "Pending" status first
    const leaves = await Leave.aggregate([
      { $match: { sendto: teacherId } },
      {
        $addFields: {
          statusOrder: {
            $cond: {
              if: { $eq: ["$status", "Pending"] },
              then: 0,
              else: 1
            }
          }
        }
      },
      { $sort: { statusOrder: 1, startDate: -1 } }, // Sort by statusOrder first, then by startDate if needed
      { $project: { statusOrder: 0 } } // Remove the statusOrder field from the output
    ]);

    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAuthenticatedSenderLeaves = async (req, res) => {
  try {
    const studentId = new mongoose.Types.ObjectId(req.params.studentId); 
    const leaves = await Leave.find({ userId: studentId });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};