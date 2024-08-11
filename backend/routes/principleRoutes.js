import express from 'express';
import moment from 'moment';
import principleModel from '../models/principle.js';
import teachersModel from '../models/teachers.js';
import studentsModel from '../models/students.js';
import classModel from '../models/class.js'
const app = express()
const router = express.Router();
app.use(express.json());

router.get("/", (req, res) => {
    classModel.find()
        .then(classes => {
            res.json(classes);
        })
        .catch(err => res.json(err));
});

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const principle = await principleModel.findOne({ email: email });
        if (!principle) {
            return res.status(401).json({ success: false, message: "Wrong Email or Password" });
        }
        if (principle.password === password) {
            res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false, message: "Wrong Email or Password" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.post("/createTeacher", async (req, res) => {
    const { name, email, password, Class } = req.body;
    const teacher = await teachersModel.findOne({ email: email });
    if (teacher) return res.status(401).json({ success: false, message: "Teacher already exists" });
    const sameClass = await teachersModel.findOne({ Class });
    if (sameClass) {
        console.log("hey")
        return res.status(402).json({ success: false, message: "Teacher already assigned to another class" });
    } else {
        await teachersModel.create({
            name,
            email,
            password,
            Class
        });
        res.status(200).json({ success: true });
    }

});

router.post("/delete", async (req, res) => {
    const { id } = req.body;
    const result = await teachersModel.findOneAndDelete({ _id: id });
    if (!result) return res.status(401).json({ success: false, message: "Teacher doesn't exist" });
    res.status(200).json({ success: true, message: "Teacher deleted successfully" });
});

router.post("/update", async (req, res) => {
    const { id, name, email, password } = req.body;
    const result = await teachersModel.findOneAndUpdate(
        { _id: id },
        { name, email, password },
        { new: true }
    );
    if (!result) {
        return res.status(404).json({ success: false, message: "Teacher does not exist" });
    }
    res.status(200).json({ success: true, message: "Teacher updated successfully" });
});

router.post("/createStudent", async (req, res) => {
    const { name, email, password, Class } = req.body;
    const student = await studentsModel.findOne({ email: email });
    if (student) return res.status(401).json({ success: false, message: "Student already exists" });

    await studentsModel.create({
        name,
        email,
        password,
        Class
    });
    res.status(200).json({ success: true });
});
router.post("/deleteStudent", async (req, res) => {
    const { id } = req.body;
    const result = await studentsModel.findOneAndDelete({ _id: id });
    if (!result) return res.status(401).json({ success: false, message: "Student doesn't exist" });
    res.status(200).json({ success: true, message: "Student deleted successfully" });
});
router.post("/updateStudent", async (req, res) => {
    const { id, name, email, password } = req.body;
    const result = await studentsModel.findOneAndUpdate(
        { _id: id },
        { name, email, password },
        { new: true }
    );
    if (!result) {
        return res.status(404).json({ success: false, message: "Student does not exist" });
    }
    res.status(200).json({ success: true, message: "Student updated successfully" });
});

router.post("/createClass", async (req, res) => {
    const { name, start_time, end_time, days, teacher } = req.body;
    let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    try {
        // Check if the class already exists
        const classroom = await classModel.findOne({ name: name });
        if (classroom) return res.status(401).json({ success: false, message: "Class already exists" });
        let timingIsValid = true;
        const startTime = moment(start_time, "HH:mm");
        const endTime = moment(end_time, "HH:mm");
        console.log(startTime.hour())
        for (let day of days) {
            if (weekdays.includes(day)) {
                if (startTime.hour() < 12 || endTime.hour() > 18) {
                    timingIsValid = false;
                    break;
                }
            } else if (day === "Saturday") {
                if (startTime.hour() < 12 || endTime.hour() > 16) {
                    timingIsValid = false;
                    break;
                }
            } else {
                timingIsValid = false;
                break;
            }
        }

        if (!timingIsValid) {
            return res.status(400).json({ success: false, message: "Class Timing is wrong" });
        }
        await classModel.create({ name, start_time, end_time, days, teacher });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});
router.post("/deleteClass", async (req, res) => {
    const { id } = req.body;
    const result = await classModel.findOneAndDelete({ _id: id });
    if (!result) return res.status(401).json({ success: false, message: "Class doesn't exist" });
    res.status(200).json({ success: true, message: "Class deleted successfully" });
});
router.post("/updateClass", async (req, res) => {
    const { id, name, time } = req.body;
    const result = await classModel.findOneAndUpdate(
        { _id: id },
        { name, time },
        { new: true }
    );
    if (!result) {
        return res.status(404).json({ success: false, message: "Class does not exist" });
    }
    res.status(200).json({ success: true, message: "Class updated successfully" });
});

export default router;
