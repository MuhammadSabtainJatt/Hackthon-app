import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { Button, Select,  Modal, Input,  message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { firestore } from '../../config/firebase';
const initialstate = { name:"",address:"",status:"" }

export default function Update() {
  const navigate=useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing,setIsProcessing]=useState(false)
  const [state, setState] = useState(initialstate)
  const params = useParams()


  const getDocument = async() => {
    const docRef = doc(firestore, "Student", params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const Data=docSnap.data()
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
    const { name,address,status } = state
    const data = {
        name,address,status,
      dateCreated: new Date(),
      id: params.id,
      role: "",
    }

    try {
      await setDoc(doc(firestore, "Student",params.id),data,{merge:true});
      message.success("Student is Updated successfully")
    } catch (e) {
      console.error("Error adding document: ", e);
      message.error("Something went wrong while Updating todo")
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
  )
}
