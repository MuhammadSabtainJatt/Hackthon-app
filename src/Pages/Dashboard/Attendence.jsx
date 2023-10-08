import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore } from 'config/firebase';

export default function Attendance() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const studentsRef = collection(firestore, 'Student');
            const querySnapshot = await getDocs(studentsRef);

            const studentsData = [];
            querySnapshot.forEach((doc) => {
                studentsData.push({ id: doc.id, ...doc.data() });
            });

            setStudents(studentsData);
        } catch (error) {
            console.error('Error fetching students: ', error);
        }
    };

    const markAttendance = async (studentId, status) => {
        try {
            // Update the status of a student
            const studentDocRef = doc(firestore, 'Student', studentId);
            await updateDoc(studentDocRef, {
                status: status,
            });

            // Update the local state
            const updatedStudents = students.map((student) =>
                student.id === studentId ? { ...student, status: status } : student
            );
            setStudents(updatedStudents);
        } catch (error) {
            console.error('Error updating student attendance: ', error);
        }
    };

    return (<>

        <div className="container">
            <div className='flex justify-between'>
                <h1 className='text-3xl inline'>Attendence </h1>

            </div><br /><br />
            <div className="row text-center">
                <div className="col">
                    <h1 className='text-3xl'>Attendence</h1>
                </div>
            </div>
            <div className="p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-1/3 text-left py-2 px-4">ID</th>
                                <th className="w-1/3 text-left py-2 px-4">Name</th>
                                <th className="w-1/3 text-left py-2 px-4">Status</th>
                                <th className="w-1/3 text-left py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-200">
                            {students.map((student, i) => (
                                <tr key={i} className="hover:bg-gray-100">
                                    <td className="border-t-2 border-gray-600 text-left py-2 px-4">{i + 1}</td>
                                    <td className="border-t-2 border-gray-600 text-left py-2 px-4">{student.name}</td>
                                    <td className="border-t-2 border-gray-600 text-left py-2 px-4">{student.status}</td>
                                    <td className="border-t-2 border-gray-600 text-left py-2 px-4 flex">
                                        <button className='bg-green-500 mx-1 p-2 rounded' onClick={() => markAttendance(student.id, 'present')}>
                                            Present
                                        </button>
                                        <button className='bg-red-500 mx-1 p-2 rounded' onClick={() => markAttendance(student.id, 'absent')}>
                                            Absent
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </>
        );
}