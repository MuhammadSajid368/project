import express from "express"
import { payment } from "../controllers/payment.js"
const paymentRoutes = express.Router()

paymentRoutes.post("/create-checkout-session" , payment)

export default paymentRoutes