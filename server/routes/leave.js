import express from 'express'
import { sendLeave } from '../controllers/Leave/SendLeave.js'
import { getAuthenticatedSenderLeaves, getAuthenticatedUserLeaves } from '../controllers/Leave/filterLeaves.js'
import { updateLeaveStatus } from '../controllers/Leave/leaveStatus.js'
const leaveRoute = express.Router()

leaveRoute.post("/user/request-for-leave" , sendLeave)
leaveRoute.get('/teacher/:teacherId', getAuthenticatedUserLeaves);
leaveRoute.get('/student/:studentId', getAuthenticatedSenderLeaves);
leaveRoute.patch("/update-leave-status",  updateLeaveStatus )




export {leaveRoute}