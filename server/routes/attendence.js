import express from "express";
import Course from "../models/Course.js";
import Auth from "../models/authModel.js";
import Attendance from "../models/Attendence.js";
const router = express.Router();

// Fetch attendance for a specific course
router.get('/course/:courseId', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId).populate('students');
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const attendanceRecords = await Attendance.find({ course: courseId }).populate('student');
        res.json({ course, attendanceRecords });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add attendance for a student in a course
router.post('/course/:courseId/student/:studentId', async (req, res) => {
    try {
        const { courseId, studentId } = req.params;
        const { status } = req.body;

        const course = await Course.findById(courseId);
        const student = await Auth.findById(studentId);

        if (!course || !student) {
            return res.status(404).json({ message: "Course or Student not found" });
        }

        const newAttendance = new Attendance({
            student: studentId,
            course: courseId,
            status,
        });

        await newAttendance.save();
        res.status(201).json(newAttendance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
