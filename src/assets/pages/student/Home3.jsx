import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home3 = () => {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            const storedStudent = JSON.parse(localStorage.getItem('student'));
            setStudent(storedStudent);

            if (storedStudent && storedStudent.Class) {
                try {
                    const response = await axios.get(`http://localhost:3000/studentsByClass/${storedStudent.Class}`);
                    setStudents(response.data);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchStudentData();
    }, []);

    return (
        <div className='flex justify-center'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <div>
                <h1 className='text-3xl my-5 font-bold text-center'>Welcome Student {student?.name}</h1>
                <h1 className='text-3xl my-5 font-bold text-center'>Your class is {student?.Class}</h1>
                <div className='flex justify-center flex-wrap gap-20'>
                    <div>
                        <h2 className='text-2xl font-bold mb-4 text-center'>Students in Your Class</h2>
                        {students.length > 0 ? (
                            <ul>
                                {students.map((student) => (
                                    <li key={student._id} className='text-lg'>{student.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No other students in your class.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home3;
