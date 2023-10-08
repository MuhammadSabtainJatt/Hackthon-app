import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Sidebar() {


    return (
        <div className={`bg-gray-800 text-white h-screen fixed top-0 w-36 transition-all duration-300 ease-in-out overflow-y-auto`}>
            
            <div className="p-4">
                <h1 className="text-2xl font-semibold">SMS</h1>
                <ul className="mt-4">
                    <li className="mb-2">
                        <Link to="/" className="text-gray-300 hover:text-white flex items-center">
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/course" className="text-gray-300 hover:text-white flex items-center">
                            Course
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/student" className="text-gray-300 hover:text-white flex items-center">
                            <span className=''>Student</span>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/attendence" className="text-gray-300 hover:text-white flex items-center">
                            Attendence
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
