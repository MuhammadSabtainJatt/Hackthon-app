import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Select, Modal, Input, message } from 'antd';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { firestore } from '../../config/firebase';
const initialstate = { name: "", code: "", description: "" }

export default function Update() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false)
    const [state, setState] = useState(initialstate)
    const params = useParams()


    const getDocument = async () => {
        const docRef = doc(firestore, "Course", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const Data = docSnap.data()
            setState(Data)
        } else {
            console.log("No such document!");
        }
    }
    useEffect(() => {
        getDocument()
        showModal()
    }, [])

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    };

    const handleSubmit = async () => {
        const { name, code, description } = state
        const data = {
            name, code, description,
            dateUpdated: new Date(),
            id: params.id,
        }

        try {
            await setDoc(doc(firestore, "Course", params.id), data, { merge: true });
            message.success("Course is Updated successfully")
        } catch (e) {
            console.error("Error adding document: ", e);
            message.error("Something went wrong while Updating Course")
        }
        setState(initialstate)
        setIsModalOpen(false);
        navigate("/student")
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    return (
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
        </Modal>)
}
