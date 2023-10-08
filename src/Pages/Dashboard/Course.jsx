import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Select, Divider, Modal, Input, Row, Col, DatePicker, message } from 'antd';
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from '@firebase/firestore';
import { firestore } from 'config/firebase';
import { useNavigate } from 'react-router-dom';

const initialstate = { name: "", code: "", description: "" }
const Messages = () => {

    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, setState] = useState({})
    const [document, setDocument] = useState([])

    const getDocument = async () => {
        const querySnapshot = await getDocs(collection(firestore, "Course"));
        let array = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            array.push(data)
        });
        setDocument(array)
    }

    useEffect(() => {
        getDocument()
    }, [])

    const handleDelete = async (Data) => {
        try {
            await deleteDoc(doc(firestore, 'Course', Data.id));
            let deletedDocument = document.filter(doc => doc.id !== Data.id)
            setDocument(deletedDocument)
            console.log('deletedDocument', deletedDocument)
            message.success('Student deleted successfully');
        } catch (error) {
            console.error('Error deleting Student: ', error);
        }
    }
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleSubmit = async () => {
        const {name,code,description } = state
        const data = {
            name,code,description,
            id: Math.random().toString(36).slice(2),
            dateCreate: serverTimestamp()
        }
        console.log('data', data)
        try {
            const docRef = await setDoc(doc(firestore, "Course", data.id), data);
            message.success("Course is added successfully")
            setIsModalOpen(false);
            setState(initialstate)
        } catch (e) {
            console.error("Error adding Course: ", e);
        }
        getDocument()
    }

    return (
        <>
            <div className="container">
                <div className='flex justify-between'>
                    <h1 className='text-3xl inline'>Course </h1>
                    <button className='bg-gray-200 p-2 rounded' onClick={showModal}>Add Course</button>

                </div><br /><br />
                <div className="row text-center">
                    <div className="col">
                        <h1 className='text-3xl'>Courses</h1>
                    </div>
                </div>
                <div className="p-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="w-1/3 text-left py-2 px-4">Course Code</th>
                                    <th className="w-1/3 text-left py-2 px-4">Course Name</th>
                                    <th className="w-1/3 text-left py-2 px-4">Description</th>
                                    <th className="w-1/3 text-left py-2 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-200">
                                {document.map((course, i) => (
                                    <tr key={i} className="hover:bg-gray-100">
                                        <td className="border-t-2 border-gray-600 text-left py-2 px-4">{course.code}</td>
                                        <td className="border-t-2 border-gray-600 text-left py-2 px-4">{course.name}</td>
                                        <td className="border-t-2 border-gray-600 text-left py-2 px-4">{course.description}</td>
                                        <td className="border-t-2 border-gray-600 text-left py-2 px-4">
                                            <button onClick={() => handleDelete(course)}>
                                                <DeleteOutlined className="text-red-500" />
                                            </button>
                                            <button onClick={() => navigate(`/updatecourse/${course.id}`)}>
                                                <EditOutlined className="text-teal-500" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
            <Modal open={isModalOpen} >
                <div className="row">
                    <div className="col">
                        <div className=" p-4">
                            <div className="row text-primary">
                                <h1 className='text-center my-2 text-3xl  '><u>Add Course</u></h1>
                                <div className="col">
                                    <label htmlFor="code">Course Code</label>
                                    <Input placeholder="Enter Course Code" className='form-control my-1' value={state.code} name="code" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row text-primary">
                                <div className="col">
                                    <label htmlFor="Name">Course Name</label>
                                    <Input type="text" className='form-control my-1' value={state.name} name="name" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row text-primary">
                            <div className="col">
                                    <label htmlFor="Description">Course Description</label>
                                    <Input type="text" className='form-control my-1' value={state.description} name="description" onChange={handleChange} />
                                </div>
                                </div>
                            <div className="row text-center">
                                <div className="col">
                                    <Button className='w-75  mt-4 mb-3 btn-danger' onClick={handleSubmit} htmlType="submit" loading={isProcessing}
                                    >Add Course</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Messages;
