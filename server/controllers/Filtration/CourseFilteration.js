
import Course from "../../models/Course.js"
import CourseFeature from "../../utils/CourseFeatures.js"



/// filteration search and pagination users data present in database 
export const  filterCourses = async (req , res , next ) => {
    const resPerPage = 5 ;
    const courseCount = await Course.countDocuments()
    const apiFeatures = new CourseFeature(Course.find() , req.query).search().filter().pagination(resPerPage);
    const courses = await apiFeatures.query
    if (!courses || courses.length === 0) {
        return next(new ErrorHandler("No course Record  found" , 404))
    }
    res.send({
        success : true ,
        result : courses.length ,
        courseCount ,
        courses
    })
}
