import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const create = () => {
    const [teachaccount, setteachaccount] = useState(false)
    const [student, setstudent] = useState(false)
    const [Classroom, setClassroom] = useState(false)
    const [selectedDays, setSelectedDays] = useState([]);
    const navigate = useNavigate();
    const teacherSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const Class = event.target.Class.value;
    
        try {
            const response = await axios.post("http://localhost:3000/principle/createTeacher", {
                name,
                email,
                password,
                Class
            });
    
            if (response.data.success) {
                navigate('/principle/home');
            } else {
                alert(response.data.message);
                console.log(response.data.message)
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };
    const studentSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const Class = event.target.Class.value;
        const response = await axios.post("http://localhost:3000/principle/createStudent", {
            name,
            email,
            password,
            Class
        })
        if (response.data.success) {
            navigate('/principle/home');
        } else {
            alert(response.data.message)
        }
    }
    const classSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const start_time = event.target.start_time.value;
        const end_time = event.target.end_time.value;
        const teacher = event.target.teacher.value;
        try {
            const response = await axios.post("http://localhost:3000/principle/createClass", {
                name,
                start_time,
                end_time,
                days: selectedDays,
                teacher
            });

            if (response.data.success) {
                navigate('/principle/home');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };
    const handleDayChange = (event) => {
        const day = event.target.value;
        setSelectedDays(prevDays =>
            prevDays.includes(day) 
                ? prevDays.filter(d => d !== day) 
                : [...prevDays, day]
        );
    };

    return (
        <div className=' flex justify-center gap-5 mr-10 overflow-y-clip'>
            <div>
                <button onClick={() => { setteachaccount(!teachaccount), setstudent(false), setClassroom(false) }} className='bg-blue-500 rounded-3xl m-2 p-2 font-bold text-white text-center mx-20'> Create Teacher Account </button>
                {teachaccount && <form className='grid gap-5' onSubmit={teacherSubmit} >
                    <h1 className=' text-3xl font-bold text-center'>Create Teacher's Account</h1>
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="text" name='name' placeholder='Name' required />
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="email" name='email' placeholder='Email' required />
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="text" name='Class' placeholder='Class' required />
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="password" name='password' placeholder='Password' required />
                    <button className='bg-blue-500 rounded-3xl w-24 m-2 p-2 font-bold mx-32 text-white text-center' type="submit">Submit</button>
                </form>}
            </div>
            <div>
                <button onClick={() => { setstudent(!student), setteachaccount(false), setClassroom(false) }} className='bg-blue-500 rounded-3xl m-2 p-2 font-bold text-white text-center mx-20'> Create  Student Account </button>
                {student && <form className='grid gap-5' onSubmit={studentSubmit} >
                    <h1 className=' text-3xl font-bold text-center'>Create Student's Account </h1>
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="text" name='name' placeholder='Name' required />
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="email" name='email' placeholder='Email' required />
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="text" name='Class' placeholder='Class' required />
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="password" name='password' placeholder='Password' required />
                    <button className='bg-blue-500 rounded-3xl w-24 m-2 p-2 font-bold mx-32 text-white text-center' type="submit">Submit</button>
                </form>}
            </div>
            <div>
                <button onClick={() => { setClassroom(!Classroom), setteachaccount(false), setstudent(false) }} className='bg-blue-500 rounded-3xl m-2 p-2 font-bold text-white text-center mx-20'> Create Classroom </button>
                {Classroom && <form className='grid gap-3 w-12' onSubmit={classSubmit} >
                    <h1 className=' text-3xl font-bold text-center'>Create Class-Room</h1>
                    <input className=' mx-3 text-center bg-slate-300 h-8' type="text" name='name' placeholder='Class-Name' required />
                    <label className='mx-3 text-center'>Start Time</label>
                     <input className='mx-3 text-center bg-slate-300 h-8' type="time" name='start_time' placeholder='Start Time' required />
                     <label className='mx-3 text-center'>End Time</label>
                    <input className='mx-3 text-center bg-slate-300 h-8' type="time" name='end_time' placeholder='End Time' required />
                    <input className='mx-3 text-center bg-slate-300 h-8' type="text" name='teacher' placeholder='Assigned Teacher' required />
                    <fieldset className=''>
                        <legend className='text-center'>Select Days</legend>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                            <label key={day} className='text-center'>
                                <div className=' flex flex-wrap gap-5'>
                                <input 
                                    type="checkbox" 
                                    value={day} 
                                    checked={selectedDays.includes(day)} 
                                    onChange={handleDayChange} 
                                />
                                {day}
                                </div>
                            </label>
                        ))}
                    </fieldset>
                    <button className='bg-blue-500 rounded-3xl w-24 m-2 p-2 font-bold mx-32 text-white text-center' type="submit">Submit</button>
                </form>}
            </div>
        </div>
    )
}

export default create
