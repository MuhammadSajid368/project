// routes/events.js
import express from "express";
import {
  deleteEvent,
  eventDetails,
  getAllEvents,
  upcomingEvents,
  updateEventStatus,
} from "../controllers/events.js";
const eventRouter = express.Router();

import multer from "multer";
import cloudinary from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_NAME } from "../config/config.js";
import { Event } from "../models/Events.js";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

eventRouter.get("/get/events", getAllEvents);
eventRouter.get("/event/:id", eventDetails);
eventRouter.get("/upcoming/events", upcomingEvents);
eventRouter.patch("/event/update-event-status", updateEventStatus);
eventRouter.delete("/:id", deleteEvent);

export default eventRouter;
