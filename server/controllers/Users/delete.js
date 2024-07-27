import Auth from "../../models/authModel.js"


export const deleteUserRequest = async (req , res , next) => {
    try {
        const userId = req.params.id 

        const user =  await Auth.findOneAndDelete(userId)
         
        if (!user) {
            return res.status(404).json({
                error : "No user found!"
            })
        }
        res.status(200).json({
            message : "User deleted successfully"
            })
    } catch (error) {
        res.status(500).json({
            error : `interval server error ${error.message}`
        })
    }
}