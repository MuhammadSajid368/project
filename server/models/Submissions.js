import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [{ type: String, required: true }]
  });
  
  const Submission = mongoose.model('Submission', submissionSchema);
  
  export default Submission