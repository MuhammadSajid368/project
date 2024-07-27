import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Attendance = ({ courseId }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`/attendence/course/${courseId}`);
        setAttendanceRecords(response.data.attendanceRecords);
        setCourse(response.data.course);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAttendance();
  }, [courseId]);

  return (
    <div>
      <h2>Attendance for Course: {course && course.courseName}</h2>
      <ul>
        {attendanceRecords.map(record => (
          <li key={record._id}>
            {record.student.username} - {record.status} on {new Date(record.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;
