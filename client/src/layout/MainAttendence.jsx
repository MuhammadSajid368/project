import React, { useState } from 'react'
import AddAttendance from './AddAttendence';
import Attendance from './Attendence';

const MainAttendence = () => {
    const [courseId, setCourseId] = useState(''); // Add a default courseId if needed

    const handleCourseChange = (e) => {
      setCourseId(e.target.value);
    };
  
    return (
      <div>
        <h1>Attendance Management System</h1>
        <input
          type="text"
          value={courseId}
          onChange={handleCourseChange}
          placeholder="Enter Course ID"
        />
        <AddAttendance courseId={courseId} />
        <Attendance courseId={courseId} />
      </div>
    );
  };

export default MainAttendence