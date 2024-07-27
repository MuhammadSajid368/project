import { model, Schema, ObjectId } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
    },
    first_name: {
        type: String,
        trim: true,
        default: "",
    },
    last_name: {
        type: String,
        trim: true,
        default: "",
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: 100,
        minlength: 4
    },
    address: {type: String, default: ""},
    status:{
        type : String ,
        default : "active",
        enum : ["active" , "block" , "pending"]
    },
    image: {},
    gender : {
        type: [String],
        enum: ["male", "female", "custom"  , "prefer not say"],
    },
    role: {
        type: [String],
        default: [""],
        enum: ["student", "teacher", "staff" , "guests" , "admin"],
    },
    resetCode: {}
}, {timestamps: true});

const Auth = model("User", userSchema);
export default Auth;
