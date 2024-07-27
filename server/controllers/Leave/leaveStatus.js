import { Leave } from "../../models/Leave.js";




export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId, status } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status },
      { new: true }
    );
    if (!leave) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(leave);
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ error: error.message });
  }
};
