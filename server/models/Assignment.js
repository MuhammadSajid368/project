import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }]
  });
  
  const Assignment = mongoose.model('Assignment', assignmentSchema);
  
 export default Assignment