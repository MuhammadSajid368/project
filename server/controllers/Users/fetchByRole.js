import Auth from "../../models/authModel.js";

export const fetchStudents = async (req , res) => {
    try {
        const students = await Auth.find({ role: 'student' });
        console.log(students);
        res.json({
            message : "students fetched successfully",
            students
        })
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};


export const fetchTeachers = async (req , res) => {
    try {
        const teachers = await Auth.find({ role: 'teacher' });
        console.log(teachers);
        res.json({
            message : "teachers fetched successfully",
            teachers
        })
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

export const fetchStaff = async (req , res) => {
    try {
        const staff = await Auth.find({ role: 'staff' });
        console.log(staff);
        res.json({
            message : "teachers fetched successfully",
            staff
        })
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};