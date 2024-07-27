import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    username : {
        type : mongoose.Schema.Types.ObjectId ,
    },
    result : {
        type : Array
    },
    attempts : {
        type : Number,  
        default:0
    },
    points : {
        type : Number, 
        default : 0
    },
    achieved : {
        type : String ,
        default : ""
    }
} , {timestamps : true}) ;


// resultSchema.methods.addAttempts = function(num){
//     this.attempts += num;
//     return this.save();
// };

// resultSchema.statics.createResult = async function (username , quiz) {
//      let userRes = await this.findOne({username});
//       if(!userRes){
//           userRes = await this.create({username , results : []});
//       }
//        const resIndex = userRes.results.findIndex((el)=> el.quiz === quiz);
//        if(resIndex !== -1 ) throw 'Quiz already answered';
//        else{
//            const obj = {
//                quiz ,
//                answer : null ,
//                isCorrect : false ,
//            };
//            userRes.results.push(obj);
//            return userRes.save().then(()=>userRes.results[userRes.results.length-1]);
//        }
// };

// resultSchema.methods.checkAnswer = function ({answer , quiz }) {
//     if(this.isModified('results')) throw "Can't check while changing";
//     const index = this.results.findIndex(el => el.quiz===quiz );
//     if(index===-1) throw 'No such Quiz in database';
//     const item = this.results [index];
//     item.answer=answer;
//     item.isCorrect=item.answers.includes(answer);
//     return this.save();
// };

const Result = mongoose.model("Result" , resultSchema);
export default Result