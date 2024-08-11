import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <nav className='h-16 bg-emerald-500 flex justify-between items-center text-white'>
                <div className='flex gap-2 mx-5'>
                    <span className="material-symbols-outlined my-2">
                        library_books
                    </span>
                    <Link to="/" className='text-3xl font-bold hover:text-4xl duration-150'>Class-Room</Link>
                </div>
                <ul className='flex mx-5 gap-5 text-lg'>
                    <li><Link to="" className='hover:font-bold duration-150'>Home</Link></li>
                    <li><Link to="" className='hover:font-bold duration-150'>Classrooms</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default navbar
