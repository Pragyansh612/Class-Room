import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home2 = () => {
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const storedTeacher = JSON.parse(localStorage.getItem('teacher'));
    setTeacher(storedTeacher);

    axios.get("http://localhost:3000/student")
      .then(response => setStudents(response.data))
      .catch(err => console.log(err));
  }, []);

  const studentDelete = async (id) => {
    try {
      const response = await axios.post("http://localhost:3000/principle/deleteStudent", { id });
      alert(response.data.message);
      setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const studentEdit = (student) => {
    setCurrentStudent(student);
    setEditMode(true);
  };

  const editStudent = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      const response = await axios.post("http://localhost:3000/principle/updateStudent", {
        id: currentStudent._id,
        name,
        email,
        password
      });
      alert(response.data.message);
      if (response.data.success) {
        setStudents(prevStudents =>
          prevStudents.map(student =>
            student._id === currentStudent._id ? { ...student, name, email, password } : student
          )
        );
        setEditMode(false);
        setCurrentStudent(null);
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const filteredStudents = teacher
    ? students.filter(student => student.Class === teacher.Class)
    : students;

  return (
    <div className='flex justify-center'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <div>
        {teacher && <h1 className='text-3xl my-5 font-bold text-center'>Welcome Teacher {teacher.name}</h1>}
        <div className='flex justify-center flex-wrap gap-20'>
          <div>
            <h2 className='text-2xl font-bold mb-4 text-center'>Students</h2>
            {filteredStudents.length > 0 ? (
              <table className='min-w-full bg-white border border-gray-300'>
                <thead>
                  <tr>
                    <th className='border-b py-2 px-4 text-left'>Student Name</th>
                    <th className='border-b py-2 px-4 text-left'>Student Email</th>
                    <th className='border-b py-2 px-4 text-left'>Class</th>
                    <th className='border-b py-2 px-4 text-left'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
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
              <div className='text-center'>No Students</div>
            )}
            {editMode && currentStudent && (
              <form className='grid gap-5 w-96 mx-auto' onSubmit={editStudent}>
                <h1 className='text-3xl font-bold text-center'>Edit Student's Account</h1>
                <input className='mx-3 text-center bg-slate-300 h-8' type="text" name='name' defaultValue={currentStudent.name} required />
                <input className='mx-3 text-center bg-slate-300 h-8' type="email" name='email' defaultValue={currentStudent.email} required />
                <input className='mx-3 text-center bg-slate-300 h-8' type="text" name='Class' defaultValue={currentStudent.Class} required />
                <input className='mx-3 text-center bg-slate-300 h-8' type="password" name='password' placeholder='New Password' required />
                <button className='bg-blue-500 rounded-3xl w-24 m-2 p-2 font-bold mx-auto text-white text-center' type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home2;
