import express from "express"
import { fetchAllUsers } from "../controllers/Users/fetchAllUser.js"
import { userDetails } from "../controllers/Users/userDetails.js"
import { fetchStaff, fetchStudents, fetchTeachers  } from "../controllers/Users/fetchByRole.js"
import { updateUser } from "../controllers/Users/updateUser.js"
import {  requriedLoggedIn } from "../middlewares/authMiddleware.js"
import { deleteUserRequest } from "../controllers/Users/delete.js"
import { updateUserStatus } from "../controllers/Users/updateStatus.js"
const userRouter = express.Router()

userRouter.get("/admin/all/users" ,  fetchAllUsers)
userRouter.get("/admin/user/:id",  userDetails )
userRouter.get("/all/students", fetchStudents )
userRouter.get("/all/teachers", fetchTeachers )
userRouter.put("/update-profile", requriedLoggedIn,  updateUser )
userRouter.patch("/update-status",  updateUserStatus )
userRouter.delete("/delete-user/:id",  deleteUserRequest )
userRouter.get("/all/staff", fetchStaff )


export {userRouter}