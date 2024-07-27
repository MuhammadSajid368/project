// components/QuizForm.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitQuizForm, updateQuizForm } from '../redux/actions/quizActions';

const QuizForm = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.quiz);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   dispatch(updateQuizForm({ [name]: value }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitQuizForm());
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={title} onChange={handleInputChange} required />
        <label>Description:</label>
        <textarea name="description" value={description} onChange={handleInputChange} required />
        {/* Add logic to handle question inputs */}
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default QuizForm;
