import Course from "../../models/Course.js"




export const fetchCourses = 
    async (req , res , next) => {
        const courses = await Course.find()
        const courseCount = Course.countDocuments
        
        if (!courses || courses.length === 0) {
            res.status(200).json({
                success : false ,
                message : "course not found!!"
            })
        }
        else{
            res.status(200).json({
                success : true ,
                courseCount,
                courses
            })
        }
        
    }