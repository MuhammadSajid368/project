import Course from "../../models/Course.js"



export const deleteCourse = 
    async (req , res , next) => {
        let course = await Course.findById(req.params.id)
        if(!course){
            res.status(404).json({message : "course not found!!"})
        }
        await course.deleteOne()
        res.status(200).json({
            message : "course deleted successfully"
        })
    }