import React, { useState, useEffect } from 'react';
import {  EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Select, Divider, Modal, Input, Row, Col, DatePicker, message } from 'antd';
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from '@firebase/firestore';
import { firestore } from 'config/firebase';
import { useNavigate } from 'react-router-dom';

const initialstate = { name: "", address: "", status: "", }
const Messages = () => {
    
    const navigate=useNavigate()
    const [isProcessing, setIsProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, setState] = useState({})
    const [document, setDocument] = useState([])

    const getDocument = async () => {
        const querySnapshot = await getDocs(collection(firestore, "Student"));
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

    const handleDelete = async (todo) => {
        try {
            await deleteDoc(doc(firestore, 'Student', todo.id));
            let deletedDocument = document.filter(doc => doc.id !== todo.id)
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
        const { name, address, status } = state
        const data = {
            name, address, status,
            id: Math.random().toString(36).slice(2),
            dateCreate: serverTimestamp()
        }
        try {
            const docRef = await setDoc(doc(firestore, "Student", data.id), data);
            message.success("Student is added successfully")
            setIsModalOpen(false);
            setState(initialstate)
        } catch (e) {
            console.error("Error adding student: ", e);
        }
        getDocument()
    }

    return (
        <>
            <div className="container">
                <div className='flex justify-between'>
                    <h1 className='text-3xl inline'>Students </h1>
                    <button className='bg-gray-200 p-2 rounded' onClick={showModal}>Add Student</button>

                </div><br /><br />
                <div className="row text-center">
                    <div className="col">
                        <h1 className='text-3xl'>Students</h1>
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
                                {document.map((student, i) => (
                                    <tr key={i} className="hover:bg-gray-100">
                                        <td className="border-t-2 border-gray-600 text-left py-2 px-4">{i + 1}</td>
                                        <td className="border-t-2 border-gray-600 text-left py-2 px-4">{student.name}</td>
                                        <td className="border-t-2 border-gray-600 text-left py-2 px-4">{student.status}</td>
                                        <td className="border-t-2 border-gray-600 text-left py-2 px-4">
                                            <button onClick={() => handleDelete(student)}>
                                                <DeleteOutlined className="text-red-500" />
                                            </button>
                                            <button onClick={() => navigate(`/update/${student.id}`)}>
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
                                <h1 className='text-center my-2 text-3xl  '><u>Add Student</u></h1>
                                <div className="col">
                                    <label htmlFor="name">Name</label>
                                    <Input placeholder="Enter Name" className='form-control my-1' value={state.name} name="name" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row text-primary">
                                <div className="col">
                                    <label htmlFor="Address">Address</label>
                                    <Input type="text" className='form-control my-1' value={state.address} name="address" onChange={handleChange} />
                                </div>
                                <div className="row text-primary ">
                                    <label htmlFor="status">Add Status</label> <br />
                                    <Select
                                        placeholder="Select Status"
                                        className="px-1 w-full"
                                        value={state.status}
                                        onChange={(status) => setState((s) => ({ ...s, status }))} 
                                    >
                                        {['Inactive', 'Active'].map((list, i) => {
                                            return (
                                                <Select.Option key={i} value={list}>
                                                    {list}
                                                </Select.Option>
                                            );
                                        })}
                                    </Select></div>
                            </div>
                            <div className="row text-center">
                                <div className="col">
                                    <Button className='w-75  mt-4 mb-3 btn-danger' onClick={handleSubmit} htmlType="submit" loading={isProcessing}
                                    >Submit</Button>
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
