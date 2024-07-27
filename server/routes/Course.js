import express from "express";
import { fetchCourses } from "../controllers/Courses/fetchCourses.js";
import { singleCourse } from "../controllers/Courses/singleCourse.js";
import { updateCourse } from "../controllers/Courses/updateCourse.js";
import { deleteCourse } from "../controllers/Courses/deleteCourse.js";
const Routes = express.Router();
import multer from "multer";
import cloudinary from "cloudinary";
import Course from "../models/Course.js";
import { API_KEY, API_SECRET, CLOUD_NAME } from "../config/config.js";
import { Event } from "../models/Events.js";
import { requriedLoggedIn } from "../middlewares/authMiddleware.js";
import Auth from "../models/authModel.js";
import fs from "fs";
import path from "path";

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

// Set up multer for handling file uploads
const upload = multer({ dest: "uploads/" });

Routes.route("/courses").get(fetchCourses);
Routes.post("/add/courses", upload.single("image"), async (req, res) => {
  try {
    // Extract course details from request body
    const {
      courseName,
      courseInstructor,
      courseClasses,
      courseOutline,
      coursePrice,
      courseDescription,
      classDuration,
      classTimming,
      classesDay,
      startDate,
      category,
    } = req.body;

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    // Create new course object
    const newCourse = new Course({
      courseName,
      courseInstructor,
      courseClasses,
      courseOutline,
      coursePrice,
      courseDescription,
      classDuration,
      classTimming,
      classesDay,
      startDate,
      images: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      category,
    });

    // Save the course to the database
    await newCourse.save();

    // Respond with success message
    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    // Handle errors
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Routes.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, endDate, description, date, location, organizer } = req.body;

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const newEvent = new Event({
      title,
      description,
      date,
      endDate,
      location,
      organizer,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(400).json({ message: "Failed to create event." });
  }
});

Routes.put(
  "/upload-image",
  requriedLoggedIn,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const existUser = await Auth.findById(req.user.id);

      // Check if the user has an existing image
      if (existUser.image) {
        const existAvatar = `/uploads/${existUser.image}`;

        // Check if the file exists before attempting to unlink
        if (fs.existsSync(existAvatar)) {
          fs.unlinkSync(existAvatar);
        } else {
          console.log("File does not exist:", existAvatar);
        }
      }

      // Assuming req.file.filename contains the correct path to the uploaded file
      const fileUrl = req.file.filename;

      // Update user's image URL in the database
      const user = await Auth.findByIdAndUpdate(req.user.id, {
        image: fileUrl,
      });

      console.log(user);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("Error uploading image:", error.message);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);


Routes.route("/course/:id").get(singleCourse);
Routes.route("/admin/course/:id").put(updateCourse).delete(deleteCourse);

export { Routes };
