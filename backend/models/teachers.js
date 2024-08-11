import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    Class: String
})

export default mongoose.model("teacher", teacherSchema)