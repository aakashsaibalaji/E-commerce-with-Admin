import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/Adminmenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/Forms/Categoryform';
import {Modal} from 'antd';
function Createcategory() {
    const [catogories,setCatogories] = useState([]);
    const [name,setName] = useState("");
    const [visible,setVisible] = useState(false);
    const [selected,setSelected]=useState(null);
    const [newname,setNewname] = useState("");
    const handleupdate=async(e)=>{
        e.preventDefault();
        try{
           const {data} = await axios.put(`http://localhost:5500/E-commerce/categories/update-category/${selected._id}`,{name:newname})
           if(data.succes){
            toast.success(`successfully updated the category`);
            setSelected(null)
            setNewname("")
            setVisible(false)
            getAllcategory();
           }
           else{
            toast.error("something went wrong");
           }
        }catch(error){
            console.log(error);
            toast.error("someting went wrong in updating category")
        }
    }
    const handledelete=async(id)=>{
        try{
           const {data} = await axios.delete(`http://localhost:5500/E-commerce/categories/delete-category/${id}`)
           if(data.success){
            toast.success(`successfully deleted the category`);
            getAllcategory();
           }
           else{
            toast.error("something went wrong");
           }
        }catch(error){
            console.log(error);
            toast.error("someting went wrong in updating category")
        }
    }
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            if(!name){
                toast.warning('Please enter a the name first');
            }
            const {data} = await axios.post('http://localhost:5500/E-commerce/categories/create-category',{name})
            if(data.succes){
                toast.success("successfully new category is created");
                setName('');
                getAllcategory();
            } 
        }catch(error){
            console.log(error);
            toast.error("someting went wrong in adding category")
        }
    }
    const getAllcategory = async()=>{
        try{
            const {data} = await axios.get('http://localhost:5500/E-commerce/categories/get-category')
            if(data?.success){
                setCatogories(data?.category);
            }
        }catch(error){
            console.log(error);
            toast.error("unsuccesfull getting values");
        }
    }
    useEffect(()=>{
        getAllcategory();
    },[]);
    return (<>
     <Layout>
        <div className='d-flex justify-content-center'>
           <h3>Create category</h3>
        </div>
        <div className='row'>
            <div className='col-lg-3 col-md-8 col-11'>
                <AdminMenu/>
            </div>
            <div className='col-lg-8 col-md-11 col-11'>
                <h2>Manage Categories</h2>
                <div className='w-50'>
                    <CategoryForm handlesubmit={handleSubmit} value={name} setValue={setName}/>
                </div>
                <div className='mb-5'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Changes</th>
                            </tr>
                        </thead>
                        <tbody>
                                {catogories.map((category) => (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>
                                            <button className='btn btn-primary mx-2' onClick={()=>{setVisible(true); setNewname(category.name); setSelected(category)}}>Edit</button>
                                            <button className='btn btn-danger' onClick={()=>handledelete(category._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
                    <CategoryForm value={newname} setValue={setNewname} handlesubmit={handleupdate}/>
                </Modal>
            </div>
        </div>
     </Layout>
    </>);
}

export default Createcategory;