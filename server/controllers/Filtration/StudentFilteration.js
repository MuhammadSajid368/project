
const ErrorHandler = require("../../utils/ErrorHandler");
const AsyncErrors = require("../../middlewares/AsyncErrors");
const APIFeatures = require("../../utils/apiFeatures");
const Student = require("../../models/studentSchema");


/// filteration search and pagination users data present in database 
exports.filterStudents = AsyncErrors(async (req , res , next ) => {
    const resPerPage = 5 ;
    const studentCount = await Student.countDocuments()
    const apiFeatures = new APIFeatures(Student.find() , req.query).search().filter().pagination(resPerPage);
    const students = await apiFeatures.query
    if (!students || students.length === 0) {
        return next(new ErrorHandler("No Student Record  found" , 404))
    }
    res.send({
        success : true ,
        count : users.length ,
        studentCount ,
        students
    })
})
