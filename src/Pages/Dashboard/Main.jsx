import React, { useState, useEffect } from 'react'
import { doc, getDocs, setDoc, collection } from '@firebase/firestore';
import { firestore } from '../../config/firebase';


export default function Main() {
    const [student, setStudent] = useState([])
    const [course, setCourse] = useState([])

    const getStudent = async () => {
        const querySnapshot = await getDocs(collection(firestore, "Student"));
        let array = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            array.push(data)
        });
        setStudent(array)
    }
    const getCourse = async () => {
        const querySnapshot = await getDocs(collection(firestore, "Course"));
        let array = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            array.push(data)
        });
        setCourse(array)

    }

    useEffect(() => {
        getStudent()
        getCourse()
    }, [])

    return (
        <div className="container">
            <h1 className='text-3xl mb-20'> Dashboard</h1>
            <div>
                <div className="card text-3xl  flex justify-between shadow rounded p-4 my-4">
                    <div>
                        Total Students
                    </div>
                    <div>
                        {student.length}
                    </div>
                </div>

            </div>
            <div>
                <div className="card text-3xl flex justify-between shadow rounded p-4 mt-5">
                    <div>
                        Total Courses
                    </div>
                    <div>
                        {course.length}
                    </div>
                </div>

            </div>
        </div>
    )
}
