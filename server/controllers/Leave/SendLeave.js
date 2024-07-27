import { Leave } from "../../models/Leave.js";

export const sendLeave = async (req, res) => {
    try {
        const {sendto , userId , leaveType , startDate , endDate , reason } = req.body;
        if (!sendto || !userId || !leaveType || !startDate || !reason) {
            return res.status(400).json({
                error : "please fill all fields!"
            })
        }
        
        const leave = await Leave.create({
            sendto , userId , leaveType , startDate , endDate , reason
        });
        leave.save()
        res.status(200).json({
            success: "Leave Submitted Successfully" ,
            leave
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "An error occurred while submitting leave"
        });
    }
};
