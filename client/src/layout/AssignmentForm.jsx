// components/AssignmentForm.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitAssignmentForm, updateAssignmentForm } from '../redux/actions/assignmentActions';

const AssignmentForm = () => {
  const dispatch = useDispatch();
  const { title, description, deadline } = useSelector(state => state.assignment);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateAssignmentForm({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitAssignmentForm({ title, description, deadline }));
  };

  return (
    <div>
      <h2>Create Assignment</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={title} onChange={handleInputChange} required />
        <label>Description:</label>
        <textarea name="description" value={description} onChange={handleInputChange} required />
        <label>Deadline:</label>
        <input type="datetime-local" name="deadline" value={deadline} onChange={handleInputChange} required />
        <button type="submit">Create Assignment</button>
      </form>
    </div>
  );
};

export default AssignmentForm;
