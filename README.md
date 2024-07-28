# Learning Management System (LMS)

## Project Overview
This Learning Management System (LMS) is a comprehensive platform designed for educational institutions to manage and deliver courses online. The system includes separate dashboards for administrators, teachers, and students, each with specific functionalities. The LMS allows admins to add courses and events, manage users, and approve leave requests. Students can purchase courses, apply for leave, and access course materials.

## Features
### Admin Panel
- **Admin Authentication**: Secure login using AWS Cognito.
- **Course Management**: Add, edit, and delete courses.
- **Event Management**: Add, edit, and delete events.
- **User Management**: View all users, including students and teachers.
- **Leave Approval**: Approve or reject leave applications from students.
- **Profile Management**: Admins can update their email, change their password, and update their profile photo.

### Teacher Dashboard
- **Course Management**: Manage the courses they are teaching.
- **Student Interaction**: Communicate with students enrolled in their courses.
- **Profile Management**: Teachers can update their email, change their password, and update their profile photo.

### Student Dashboard
- **Course Purchase**: Browse and purchase courses.
- **Leave Application**: Apply for leave and track the status of their applications.
- **Course Access**: Access purchased course materials and resources.
- **Profile Management**: Students can update their email, change their password, and update their profile photo.

## Technologies Used
- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: AWS Cognito
- **Deployment**: Vercel (Frontend), AWS (Backend)
- **Others**: Axios for HTTP requests, Mongoose for MongoDB interaction

## Installation
### Prerequisites
- Node.js and npm
- MongoDB
- AWS account

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/MuhammadSajid368/project.git
   cd project/server
