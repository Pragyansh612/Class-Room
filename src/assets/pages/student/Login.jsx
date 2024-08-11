import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const response = await axios.post("http://localhost:3000/student", {
      email,
      password
    })
    if(response.data.success){
        localStorage.setItem('student', JSON.stringify(response.data.student));
      navigate('/student/home');
    } else{
      alert(response.data.message)
    }
  }
  return (
    <div className=' flex justify-center my-10'>
        <form className=' grid gap-5' onSubmit={handleSubmit}>
          <h1 className=' text-3xl font-bold text-center'>Student's Login</h1>
          <input className=' mx-3 text-center bg-slate-300 h-8' type="email" name='email' placeholder='Email' required  />
          <input className=' mx-3 text-center bg-slate-300 h-8' type="password" name='password' placeholder='Password' required />
          <button className='bg-blue-500 rounded-3xl w-24 m-2 p-2 font-bold mx-20 text-white text-center' type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Login
