import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    
    title: { type: String, required: true },
    icons : {
        public_id : {
            type : String 
        },
        url : {
            type : String
        }
    },
    description: { type: String, required: true },
    questions : {
        type : Array ,
        default : []
    },
    answers : {
        type : Array ,
        default : []
    },
    correctAnswer: { type: Number, required: true }
}, {timestamps  : true})

const Questions = new  mongoose.model("Questions",questionSchema) 
export default  Questions