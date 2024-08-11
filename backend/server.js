import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser'
import principleRoutes from './routes/principleRoutes.js'
import teacherRoutes from './routes/teacherRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
const app = express()

app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use("/principle", principleRoutes)
app.use("/teacher", teacherRoutes)
app.use("/student", studentRoutes)


app.listen(3000, () => {
    console.log("listening")
})