import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/classroom")

const principleSchema = mongoose.Schema({
    email: String,
    password: String
})

export default mongoose.model("principle", principleSchema)