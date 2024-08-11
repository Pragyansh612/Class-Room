import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const create = () => {
    const [student, setstudent] = useState(false)
    const navigate = useNavigate();
    const studentSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const Class = event.target.Class.value;
        const response = await axios.post("http://localhost:3000/teacher/createStudent", {
            name,
            email,
            password,
            Class
        })
        if (response.data.success) {
            navigate('/teacher/home');
        } else {
            alert(response.data.message)
        }
    }

    return (
        <div className=' flex justify-center gap-6'>
            <div>
                <button onClick={() => { setstudent(!student) }} className='bg-blue-500 rounded-3xl m-2 p-2 font-bold text-white text-center mx-20'> Create  Student Account </button>
                {student && <form className='grid gap-5' onSubmit={studentSubmit} >
                    <h1 className=' text-3xl font-bold text-center'>Create Student's Account </h1>
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="text" name='name' placeholder='Name' required />
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="email" name='email' placeholder='Email' required />
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="text" name='Class' placeholder='Class' required />
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="password" name='password' placeholder='Password' required />
                    <button className='bg-blue-500 rounded-3xl w-24 m-2 p-2 font-bold mx-32 text-white text-center' type="submit">Submit</button>
                </form>}
            </div>
        </div>
    )
}

export default create
