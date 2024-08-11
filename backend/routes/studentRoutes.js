import express from 'express';
import studentsModel from '../models/students.js';

const router = express.Router();

router.get("/", (req, res) => {
    studentsModel.find()
        .then(students => {
            res.json(students);
        })
        .catch(err => res.json(err));
});
router.get('/studentsByClass/:className', async (req, res) => {
    const { className } = req.params;
    try {
        const students = await studentsModel.find({ Class: className });
        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await studentsModel.findOne({ email: email });
        if (!student) {
            return res.status(401).json({ success: false, message: "Wrong Email or Password" });
        }
        if (student.password === password) {
            res.status(200).json({ success: true, student });
        } else {
            return res.status(401).json({ success: false, message: "Wrong Email or Password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;