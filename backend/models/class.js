import mongoose from "mongoose";

const classSchema = mongoose.Schema({
    name: String,
    start_time: String,
    end_time: String,
    days: Array,
    teacher: String
})

export default mongoose.model("class", classSchema)