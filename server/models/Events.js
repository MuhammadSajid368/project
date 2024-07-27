import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    endDate: { type: String, required: true },
    image : {} ,
    location: { type: String, required: true },
    organizer: { type: String, required: true },
    status : {type : String , enum : ["upcoming" , "expired" , "cancelled"] , default : "upcoming"}
  } , {timestamps : true});
  
  const Event = mongoose.model('Event', eventSchema);

export {Event}