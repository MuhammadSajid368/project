import Course from "../../models/Course.js"





export const singleCourse = 
    async (req, res , next) => {
        const course = await Course.findById(req.params.id)
        if(!course){
         return next(new ErrorHandler("Course not found" , 404))
     }
        res.status(200).json({
         success : true ,
         course
        })
 }