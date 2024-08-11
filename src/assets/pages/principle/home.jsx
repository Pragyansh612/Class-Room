import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setstudents] = useState([]);
  const [Classes, setClasses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editMode2, setEditMode2] = useState(false);
  const [editMode3, setEditMode3] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentClass, setCurrentClass] = useState(null);
  const navigate = useNavigate();

  const teacherDelete = async (id) => {
    try {
      const response = await axios.post("http://localhost:3000/principle/delete", { id });
      alert(response.data.message);
      setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher._id !== id));
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };
  const studentDelete = async (id) => {
      const response = await axios.post("http://localhost:3000/principle/deleteStudent", { id });
      alert(response.data.message);
      setstudents(prevStudents => prevStudents.filter(student => student._id !== id));
  };
  const classDelete = async (id) => {
    const response = await axios.post("http://localhost:3000/principle/deleteClass", { id });
    alert(response.data.message);
    setstudents(prevClasses => prevClasses.filter(Class => Class._id !== id));
  }

  const teacherEdit = (teacher) => {
    setCurrentTeacher(teacher);
    setEditMode(!editMode);
  };
  const studentEdit = (student) => {
    setCurrentStudent(student);
    setEditMode2(!editMode2);
  };
  const classEdit = (Class) => {
    setCurrentClass(Class);
    setEditMode3(!editMode3);
  }

  const editSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const response = await axios.post("http://localhost:3000/principle/update", {
      id: currentTeacher._id,
      name,
      email,
      password
    });

    alert(response.data.message);
    if (response.data.success) {
      setTeachers(prevTeachers =>
        prevTeachers.map(teacher =>
          teacher._id === currentTeacher._id ? { ...teacher, name, email, password } : teacher
        )
      );
      setEditMode(false);
      setCurrentTeacher(null);
    }
  };
  const editStudent = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const response = await axios.post("http://localhost:3000/principle/updateStudent", {
      id: currentStudent._id,
      name,
      email,
      password
    });

    alert(response.data.message);
    if (response.data.success) {
      setstudents(prevStudents =>
        prevStudents.map(student =>
          student._id === currentStudent._id ? { ...student, name, email, password } : student
        )
      );
      setEditMode2(false);
      setCurrentStudent(null);
    }
  };
  const editClass = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const time = event.target.time.value;
    const response = await axios.post("http://localhost:3000/principle/updateClass", {
      id: currentClass._id,
      name,
      time
    });

    alert(response.data.message);
    if (response.data.success) {
      setClasses(prevClasses =>
        prevClasses.map(Class =>
          Class._id === currentClass._id ? { ...Class, name, time } : Class
        )
      );
      setEditMode3(false);
      setCurrentClass(null);
    }
  };

  
  useEffect(() => {
    axios.get("http://localhost:3000/teacher")
      .then(response => setTeachers(response.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/student")
      .then(response => setstudents(response.data))
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3000/principle")
      .then(response => setClasses(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='flex justify-center'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <div>
        <h1 className='text-3xl my-5 font-bold text-center'>Welcome Principal</h1>
        <div className='flex justify-center flex-wrap gap-32'>
          <div>
            <h2 className='text-2xl font-bold mb-4 text-center'>Teachers</h2>
            {teachers.length > 0 ? (
              <table className='min-w-full bg-white border border-gray-300'>
                <thead>
                  <tr>
                    <th className='border-b py-2 px-4 text-left'>Teacher's Name</th>
                    <th className='border-b py-2 px-4 text-left'>Teacher's Email</th>
                    <th className='border-b py-2 px-4 text-left'>Class</th>
                    <th className='border-b py-2 px-4 text-left'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map(teacher => (
                    <tr key={teacher._id}>
                      <td className='border-b py-2 px-4'>{teacher.name}</td>
                      <td className='border-b py-2 px-4'>{teacher.email}</td>
                      <td className='border-b py-2 px-4'>{teacher.Class}</td>
                      <td className='border-b py-2 px-4'>
                        <div className='flex gap-2 mt-1'>
                          <button onClick={() => teacherEdit(teacher)} className="material-symbols-outlined">
                            edit
                          </button>
                          <button onClick={() => teacherDelete(teacher._id)} className="material-symbols-outlined">
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className=' text-center'>No Teachers</div>
            )}
            {editMode && currentTeacher && (
              <form className='grid gap-5 w-96 mx-auto' onSubmit={editSubmit}>
                <h1 className='text-3xl font-bold text-center'>Edit Teacher's Account</h1>
                <input className='mx-3 text-center bg-slate-300 h-8' type="text" name='name' defaultValue={currentTeacher.name} required />
                <input className='mx-3 text-center bg-slate-300 h-8' type="email" name='email' defaultValue={currentTeacher.email} required />
                <input className='mx-3 text-center bg-slate-300 h-8' type="password" name='password' placeholder='New Password' required />
                <button className='bg-blue-500 rounded-3xl w-24 m-2 p-2 font-bold mx-auto text-white text-center' type="submit">Submit</button>
              </form>
            )}
          </div>
          <div>
            <h2 className='text-2xl font-bold mb-4 text-center'>Students</h2>
            {students.length > 0 ? (
              <table className='min-w-full bg-white border border-gray-300'>
                <thead>
                  <tr>
                    <th className='border-b py-2 px-4 text-left'>Teacher's Name</th>
                    <th className='border-b py-2 px-4 text-left'>Teacher's Email</th>
                    <th className='border-b py-2 px-4 text-left'>Class</th>
                    <th className='border-b py-2 px-4 text-left'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student._id}>
                      <td className='border-b py-2 px-4'>{student.name}</td>
                      <td className='border-b py-2 px-4'>{student.email}</td>
                      <td className='border-b py-2 px-4'>{student.Class}</td>
                      <td className='border-b py-2 px-4'>
                        <div className='flex gap-2 mt-1'>
                          <button onClick={() => studentEdit(student)} className="material-symbols-outlined">
                            edit
                          </button>
                          <button onClick={() => studentDelete(student._id)} className="material-symbols-outlined">
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className=' text-center'>No Students</div>
            )}
            {editMode2 && currentStudent && (
              <form className='grid gap-5 w-96 mx-auto' onSubmit={editStudent}>
                <h1 className='text-3xl font-bold text-center'>Edit Student's Account</h1>
                <input className='mx-3 text-center bg-slate-300 h-8' type="text" name='name' defaultValue={currentStudent.name} required />
                <input className='mx-3 text-center bg-slate-300 h-8' type="email" name='email' defaultValue={currentStudent.email} required />
                <input className='mx-3 text-center bg-slate-300 h-8' type="password" name='password' placeholder='New Password' required />
                <button className='bg-blue-500 rounded-3xl w-24 m-2 p-2 font-bold mx-auto text-white text-center' type="submit">Submit</button>
              </form>
            )}
          </div>
          <div>
            <h2 className='text-2xl font-bold mb-4 text-center'>Classes</h2>
            {Classes.length > 0 ? (
              <table className='min-w-full bg-white border border-gray-300'>
                <thead>
                  <tr>
                    <th className='border-b py-2 px-4 text-left'>Class Name</th>
                    <th className='border-b py-2 px-4 text-left'>Start Times</th>
                    <th className='border-b py-2 px-4 text-left'>End Times</th>
                    <th className='border-b py-2 px-4 text-left'>Days</th>
                    <th className='border-b py-2 px-4 text-left'>Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  {Classes.map(Class => (
                    <tr key={Class ._id}>
                      <td className='border-b py-2 px-4'>{Class.name}</td>
                      <td className='border-b py-2 px-4'>{Class.start_time}</td>
                      <td className='border-b py-2 px-4'>{Class.end_time}</td>
                      <td className='border-b py-2 px-4'>{Class.days}</td>
                      <td className='border-b py-2 px-4'>{Class.teacher}</td>
                      <td className='border-b py-2 px-4'>
                        <div className='flex gap-2 mt-1'>
                          <button onClick={() => classEdit(Class)} className="material-symbols-outlined">
                            edit
                          </button>
                          <button onClick={() => classDelete(Class._id)} className="material-symbols-outlined">
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className=' text-center'>No Classes</div>
            )}
            {editMode3 && currentClass && (
              <form className='grid gap-5 w-96 mx-auto' onSubmit={editClass}>
                <h1 className='text-3xl font-bold text-center'>Edit Class</h1>
                <input className='mx-3 text-center bg-slate-300 h-8' type="text" name='name' defaultValue={currentClass.name} required />
                <input className='mx-3 text-center bg-slate-300 h-8' type="time" name='time' defaultValue={currentClass.time} required />
                <button className='bg-blue-500 rounded-3xl w-24 m-2 p-2 font-bold mx-auto text-white text-center' type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
