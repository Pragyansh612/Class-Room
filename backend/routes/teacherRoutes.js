import express from 'express';
import teachersModel from '../models/teachers.js';
import studentsModel from '../models/students.js';

const router = express.Router();

router.get("/", (req, res) => {
    teachersModel.find()
        .then(teachers => {
            res.json(teachers);
        })
        .catch(err => res.json(err))
});
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const teacher = await teachersModel.findOne({ email: email });
        if (!teacher) {
            return res.status(401).json({ success: false, message: "Wrong Email or Password" });
        }
        if (teacher.password === password) {
            res.status(200).json({ success: true, teacher });
        } else {
            return res.status(401).json({ success: false, message: "Wrong Email or Password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
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

export default router;