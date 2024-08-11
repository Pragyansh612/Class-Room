import mongoose from "mongoose";

const studentsSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    Class: String
})

export default mongoose.model("students", studentsSchema)