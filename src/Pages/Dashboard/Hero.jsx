import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Student from './Student';
import LeftNav from './LeftNav';
import Update from '../UpdateStudent'
import Course from './Course';
import Attendence from './Attendence'
import Main from "./Main"

const Hero = () => {
    return (
        <div className="flex">
            <LeftNav />
            <main className="flex-grow p-4 ms-[200px]">
                <Routes> 
                    
                    <Route path="/" element={<Main />} />
                    <Route path="/update/:id" element={<Update />} />
                    <Route path="/student" element={<Student />} />
                    <Route path="/course" element={<Course />} />
                    <Route path="/attendence" element={<Attendence />} />

                </Routes>
            </main>
        </div>
    );
};

export default Hero;
