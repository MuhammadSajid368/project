import express from "express";
import Assignment from "../models/Assignment.js";
import createQuiz, { createAssignment, dropQuestions, dropResult, getQuestions, getResult, insertQuestions, storeResult } from "../controllers/quiz.js";
const quizRoute = express.Router();


quizRoute.route('/questions')
        .get(getQuestions)
        .post(insertQuestions)
        .delete(dropQuestions);
 
quizRoute.route('/result')
        .get(getResult)
        .post(storeResult)
        .delete(dropResult);

quizRoute.get("/get/quiz", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


quizRoute.post("/create/quiz", createQuiz);
quizRoute.post("/create/assignment", createAssignment);

quizRoute.get("/get/assignment", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default quizRoute;
