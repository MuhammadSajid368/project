import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [true, "Please Enter Course Name"],
      trim: true,
      unique: true,
      maxLength: [50, "Course Name cannot exceed 50 characters"],
    },
    courseInstructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseClasses: {
      type: Number,
      required: true,
    },
    courseOutline: {
      type: [String],
      required: true,
    },
    coursePrice: {
      type: Number,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    classDuration: {
      type: String,
      require: true,
    },
    classTimming: { type: String, require: true },
    classesDay: {
      type: [String],
    },
    startDate: {
      type: String,
    },
    images: {

        public_id: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: false,
        },
    },
    category: {
      type: String,
      required: [true, "Please Select Category for this Product"],
      enum:  [
          "Web Development",
          "Data Science",
          "AI & Machine Learning",
          "Programming and Software Development Courses",
          "Data Science and Analytics Courses",
          "Cybersecurity Courses",
          "Information Technology (IT) Management Courses",
          "Computer Networking Courses",
          "Graphic Design and Multimedia Courses",
          "Microsoft Office and Productivity Courses",
          "Hardware and Operating System Courses",
          "Web Design and Development Courses",
          "E-commerce and Digital Marketing Courses",
        ],
    },
    addedBy: {
      type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth" ,
      require : false
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
