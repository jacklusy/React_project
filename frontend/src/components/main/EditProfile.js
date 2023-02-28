import React from 'react'
import LeftSidebar from '../body/LeftSidebar';
import Navbar from '../body/Navbar';
import RightSidebar from '../body/RightSidebar';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProfile = () => {


    const navigate = useNavigate()
    const [inputs, setInputs]=useState({}); 
    // const {id}= useParams();

    useEffect(()=>{
        getUsers();
    },[] );


    const getUsers = () => {
        
        axios.get(`http://localhost/React/React_project/backend/log_reg.php/${id}`)
        .then(function(response){
            console.log(response.data);
            setInputs(response.data);
        })

    }
    

    const handleChange= (event)=>{

        const name = event.target.name; // to get the name of the input
        const value = event.target.value; // to get the value of the input 
        console.log(name,'name');
        setInputs(values =>({...values, [name]: value})); // to set the values (the name of input then : the value of that input) to values
    }  

    let id= localStorage.getItem("Id");

    const handleSubmit =(event)=>{
        event.preventDefault(); // to prevent the page from refresh on submit
       console.log(inputs, "My inputs")

        axios.put(`http://localhost/React/React_project/backend/log_reg.php/${id}/edit`, inputs)
        .then(function(response){
         console.log(response.data);
         navigate('/EditProfile/:id/edit');
         toast.success('Updated Successfully 👌');
    })
}


    return (
        <div>
            <Navbar />
            <RightSidebar/>
            <LeftSidebar />
            
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>SocialV | Responsive Bootstrap 5 Admin Dashboard Template</title>
                
                
                <div className="wrapper">
                    <div id="content-page" className="content-page">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <div className="iq-edit-list">
                                                <ul className="iq-edit-profile row nav nav-pills">
                                                    <li className="col-md-3 p-0">
                                                        <a className="nav-link active" data-bs-toggle="pill" href="#personal-information">
                                                            Personal Information
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="iq-edit-list-data">
                                    <div className="tab-content">
                                        <div className="tab-pane fade active show" id="personal-information" role="tabpanel">
                                            <div className="card">
                                                <div className="card-header d-flex justify-content-between">
                                                    <div className="header-title">
                                                        <h4 className="card-title">Personal Information</h4>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <form  onSubmit={handleSubmit}>
                                                        <div className="form-group row align-items-center">
                                                            <div className="col-md-12">
                                                                <div className="profile-img-edit">
                                                                    <img className="profile-pic" src="/images/user/11.png" alt="profile-pic" />
                                                                    <div className="p-image">
                                                                        <i className="ri-pencil-line upload-button text-white" />
                                                                        <input className="file-upload" type="file" accept="image/*" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className=" row align-items-center">
                                                            <div className="form-group col-sm-6">
                                                                <label htmlFor="fname" className="form-label">First Name:</label>
                                                                <input type="text" className="form-control" name='first_name' value={inputs.first_name} id="fname"    onChange={handleChange}/>
                                                            </div>
                                                            <div className="form-group col-sm-6">
                                                                <label htmlFor="lname" className="form-label">Last Name:</label>
                                                                <input type="text" className="form-control" name='last_name' value={inputs.last_name} id="lname"    onChange={handleChange}/>
                                                            </div>
                                                            <div className="form-group col-sm-6">
                                                                <label htmlFor="uname" className="form-label">Email</label>
                                                                <input type="text" className="form-control" name='email' value={inputs.email} id="email"    onChange={handleChange}/>
                                                            </div>
                                                            <div className="form-group col-sm-6">
                                                                <label htmlFor="cname" className="form-label">Password</label>
                                                                <input type="password" className="form-control" name='password' value={inputs.password} id="pass"    onChange={handleChange}/>
                                                            </div>
                                                        
                                                            <div className="form-group col-sm-6">
                                                                <label htmlFor="dob" className="form-label">Phone Number</label>
                                                                <input className="form-control" name='phone' value={inputs.phone} id="phone"    onChange={handleChange}/>
                                                            </div>

                                                            <div className="form-group col-sm-6">
                                                                <label htmlFor="cname" className="form-label">Image</label>
                                                                <input type="file" className="form-control" name='image'   id="image"    onChange={handleChange}/>
                                                            </div>
                                                            
                                                        </div>
                                                        <button type="submit" className="btn btn-primary me-2">Submit</button>
                                                        <button type="reset" className="btn bg-soft-danger">Cancle</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
      
      );
}


export default EditProfile;


