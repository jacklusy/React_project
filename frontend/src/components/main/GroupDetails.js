import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../body/Footer';
import LeftSidebar from '../body/LeftSidebar';
import Navbar from '../body/Navbar';
import RightSidebar from '../body/RightSidebar';

const GroupDetails = () => {


    const { id } = useParams();
    const current_ID = JSON.parse(localStorage.getItem('id'));


    const [groups, setGroups] = useState([]);
    const [usersGroups, setUserGroups] = useState([]);
    const [pendingRequestGroups, setPendingRequestGroups] = useState([]);


    useEffect(() => {
        getDataGroups();
        getUsersGroup();
        getPendingRequest();


    }, [])

    const getDataGroups = () => {
        axios.get(`http://localhost/React/React_project/backend/getDataGroups.php/${id}`)
            .then(response => {
                console.log(response.data[0])
                setGroups(response.data[0]);
            })
    }

    const getUsersGroup = () => {

        axios.get(`http://localhost/React/React_project/backend/getUsersGroup.php/${id}`)
            .then(response => {
                console.log(response.data)
                setUserGroups(response.data);
            })

    }

    const getPendingRequest = () => {
        axios.get(`http://localhost/React/React_project/backend/getPendingRequestForGroup.php/${id}`)
            .then((respone) => {
                // console.log(respone.data);

                setPendingRequestGroups(respone.data);
                // setPendingMempers(respone.data)
            })
    }


    // Delete member of the group
    const deleteFromGroup = (userId) => {

        let inputs = { user_id: userId, group_id: id };
        axios.put(`http://localhost/React/React_project/backend/deleteRequestForGroup.php`, inputs)
            .then((respone) => {
                console.log(respone.data);
                getDataGroups();
                getUsersGroup();
                getPendingRequest();

            })

    }

    // delete a request for the group
    const deleteRequest = (userId) => {

        let inputs = { user_id: userId, group_id: id };
        axios.put(`http://localhost/React/React_project/backend/deleteRequestForGroup.php`, inputs)
            .then((respone) => {
                console.log(respone.data);
                getDataGroups();
                getUsersGroup();
                getPendingRequest();

            })

    }
    // To accept request to join the group
    const acceptRequest = (userId) => {

        let inputs = { user_id: userId, group_id: id };
        axios.put(`http://localhost/React/React_project/backend/membersGroup.php`, inputs)
            .then((respone) => {
                console.log(respone.data);
                getDataGroups();
                getUsersGroup();
                getPendingRequest();

            })
    }

    let i = 1;

    return (
        <>

            <Navbar />

            <RightSidebar />
            <LeftSidebar />
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>SocialV | Responsive Bootstrap 5 Admin Dashboard Template</title>

                <div className="wrapper">
                    <div id="content-page" className="content-page">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                        <div className="group-info d-flex align-items-center">
                                            <div className="me-3">
                                                <img className="rounded-circle img-fluid avatar-100" src="/images/page-img/gi-1.jpg" alt="" />
                                            </div>
                                            <div className="info">
                                                <h4>Developer's...</h4>
                                                <p className="mb-0"><i className="ri-lock-fill pe-2" />Private Group . 323 members</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div id="post-modal-data" className="card">
                                        <div className="card-header d-flex justify-content-between">
                                            <div className="header-title">
                                                <h4 className="card-title">Create Post</h4>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="user-img">
                                                    <img src="/images/user/1.jpg" alt="userimg" className="avatar-60 rounded-circle" />
                                                </div>
                                                <form className="post-text ms-3 w-100 " data-bs-toggle="modal" data-bs-target="#post-modal" action="javascript:void();">
                                                    <input type="text" className="form-control rounded" placeholder="Write something here..." style={{ border: 'none' }} />
                                                </form>
                                            </div>
                                            <hr />
                                           
                                        </div>

                                    </div>

                                </div>
                                <div className="col-lg-5">
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between">
                                            <div className="header-title">
                                                <h4 className="card-title">Groups</h4>
                                            </div>
                                        </div>
                                        <div className="card-bod">
                                            <ul className="list-inline p-0 m-0">


                                                <li>
                                                    <button type="submit" className="btn btn-primary d-block w-100"><i className="ri-add-line pe-2" />Create New Group</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card">
                                       
                                        <div className="card-bod">
                                            
                                                
                                                <div className="sub-drop sub-drop-large w-100 " aria-labelledby="group-drop">
                                                    <div className="card shadow-none m-0">
                                                        <div className="card-header d-flex justify-content-between bg-primary">
                                                            <div className="header-title">
                                                                <h5 className="mb-0 text-white">Group Request</h5>
                                                            </div>
                                                            <small className="badge  bg-light text-dark ">4</small>
                                                        </div>
                                                        <div className="card-body p-0" >
                                                            <div className="iq-friend-request" style={{padding:'.5rem 0'}}>
                                                                <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                                    <div className="d-flex align-items-center">
                                                                        <img className="avatar-40 rounded" src="/images/user/01.jpg" alt="" />
                                                                        <div className="ms-3">
                                                                            <h6 className="mb-0 ">Jaques Amole</h6>
                                                                            <p className="mb-0">40 friends</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <a href="javascript:void();" className="me-3 btn btn-primary rounded">Confirm</a>
                                                                        <a href="javascript:void();" className="me-3 btn btn-secondary rounded">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="iq-friend-request"  style={{padding:'.5rem 0'}}>
                                                                <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                                    <div className="d-flex align-items-center">
                                                                        <img className="avatar-40 rounded" src="/images/user/02.jpg" alt="" />
                                                                        <div className="ms-3">
                                                                            <h6 className="mb-0 ">Lucy Tania</h6>
                                                                            <p className="mb-0">12 friends</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <a href="javascript:void();" className="me-3 btn btn-primary rounded">Confirm</a>
                                                                        <a href="javascript:void();" className="me-3 btn btn-secondary rounded">Delete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="iq-friend-request"  style={{padding:'.5rem 0'}}>
                                                                <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                                    <div className="d-flex align-items-center">
                                                                        <img className="avatar-40 rounded" src="/images/user/03.jpg" alt="" />
                                                                        <div className=" ms-3">
                                                                            <h6 className="mb-0 ">Manny Petty</h6>
                                                                            <p className="mb-0">3 friends</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <a href="javascript:void();" className="me-3 btn btn-primary rounded">Confirm</a>
                                                                        <a href="javascript:void();" className="me-3 btn btn-secondary rounded">Delete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="iq-friend-request"  style={{padding:'.5rem 0'}}>
                                                                <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                                    <div className="d-flex align-items-center">
                                                                        <img className="avatar-40 rounded" src="/images/user/04.jpg" alt="" />
                                                                        <div className="ms-3">
                                                                            <h6 className="mb-0 ">Marsha Mello</h6>
                                                                            <p className="mb-0">15 friends</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <a href="javascript:void();" className="me-3 btn btn-primary rounded">Confirm</a>
                                                                        <a href="javascript:void();" className="me-3 btn btn-secondary rounded">Delete </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-center">
                                                                <a href="#" className=" btn text-primary">View More Request</a>
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
                </div>

            </div>
            <Footer />

        </>
    );
}

export default GroupDetails
