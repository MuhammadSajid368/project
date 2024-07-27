import Course from "../../models/Course.js"



export const updateCourse =
     async (req , res , next) => {
          let course = await Course.findById(req.params.id)
          if(!course){
               return next(new ErrorHandler("Course not found" , 404))
           }
          course = await Course.findByIdAndUpdate(req.params.id , req.body , {
               new : true ,
               runValidators:true ,
               useFindAndModify : true 
          })
          res.status(200).json({
               ok : true ,
               course
          })
     }