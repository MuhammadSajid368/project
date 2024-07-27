import React, { useState } from 'react';
import axios from 'axios';

const AddAttendance = ({ courseId }) => {
  const [studentId, setStudentId] = useState('');
  const [status, setStatus] = useState('Present');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/attendence/course/${courseId}/student/${studentId}`, { status });
      setStudentId('');
      setStatus('Present');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Student ID"
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Late">Late</option>
      </select>
      <button type="submit">Add Attendance</button>
    </form>
  );
};

export default AddAttendance;
