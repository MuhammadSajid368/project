// import Assignment from "../models/Assignment.js";
// import Quiz from "../models/Quiz.js";



// controller.js

import Questions from "../models/Quiz/questionSchema.js";
import Result from "../models/Quiz/resultSchema.js";
import {  answers, question } from "./data.js";

/** get all questions */
export async function getQuestions(req, res) {
	try {
		let q = await Questions.find();
		if (q.length === 0) {
			await Questions.insertMany({ question , answers });
			q = await Questions.find();
		}
		res.json(q);
	} catch (error) {
		res.json({ error });
	}
}

/** insert all questinos */
export async function insertQuestions(req, res){
	try {
         const questions = await Questions.create(req.body)
		 questions.save()
		 res.json({
			questions
		 })
	} catch (error) {
		res.json({ 
			error
		 })
	}
}

/** Delete all Questions */
export async function dropQuestions(req, res){
try {
		await Questions.deleteMany();
		res.json({ msg: "Questions Deleted Successfully...!"});
} catch (error) {
		res.json({ error })
}
}

/** get all result */
export async function getResult(req, res){
	try {
		const r = await Result.find();
		res.json(r)
	} catch (error) {
		res.json({ error })
	}
}

/** post all result */
export async function storeResult(req, res) {
	try {
		const { username, result, attempts, points, achived } = req.body;
		if (!username && !result) throw new Error('Data Not Provided...!');

		const newResult = await Result.create({ username, result, attempts, points, achived });
		res.json({ msg: "Result Saved Successfully...!", result: newResult });

	} catch (error) {
		res.json({ error });
	}
}

/** delete all result */
export async function dropResult(req, res){
	try {
		await Result.deleteMany();
		res.json({ msg : "Result Deleted Successfully...!"})
	} catch (error) {
		res.json({ error })
	}
}

const createQuiz =  async (req, res) => {
    try {
        const newQuiz = new Quiz(req.body);
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

 export const createAssignment = async (req, res) => {
    const assignment = new Assignment({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline
    });
  
    try {
      const newAssignment = await assignment.save();
      res.status(201).json(newAssignment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
export default createQuiz  