import { useState } from 'react';
import classImage from '../images/class2.png';
import { Link } from 'react-router-dom';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className='text-black flex justify-center text-center font-bold' style={{
        backgroundImage: `url(${classImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '89vh',
        overflow: 'hidden',
      }}>
        <div>
          <h1 className='my-6 text-4xl'> Welcome to Class-Room</h1>
          <h1 className='text-2xl'> Please Login </h1>
          <div className='grid justify-center my-5'>
            <Link to='/principle/login' className='bg-blue-500 rounded-3xl w-24 m-2 p-2 font-bold text-white text-center'> Principle </Link>
            <Link to='/teacher/login' className='bg-blue-500 rounded-3xl w-24 m-2 p-2 font-bold text-white text-center'> Teacher </Link>
            <Link to='/student/login' className='bg-blue-500 rounded-3xl w-24 m-2 p-2 font-bold text-white text-center'> Students </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
