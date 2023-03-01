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
                                    <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap">
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
                                <div className="col-lg-8">
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
                                        <div className="modal fade" id="post-modal" tabIndex={-1} aria-labelledby="post-modalLabel" aria-hidden="true">
                                            <div className="modal-dialog   modal-fullscreen-sm-down">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="post-modalLabel">Create Post</h5>
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><i className="ri-close-fill" /></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="d-flex align-items-center">
                                                            <div className="user-img">
                                                                <img src="/images/user/1.jpg" alt="userimg" className="avatar-60 rounded-circle img-fluid" />
                                                            </div>
                                                            <form className="post-text ms-3 w-100" action="javascript:void();">
                                                                <input type="text" className="form-control rounded" placeholder="Write something here..." style={{ border: 'none' }} />
                                                            </form>
                                                        </div>
                                                        <hr />
                                                        
                                                        <hr />
                                                        <div className="other-option">
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="user-img me-3">
                                                                        <img src="/images/user/1.jpg" alt="userimg" className="avatar-60 rounded-circle img-fluid" />
                                                                    </div>
                                                                    <h6>Your Story</h6>
                                                                </div>
                                                               
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary d-block w-100 mt-3">Post</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="post-item">
                                                <div className="user-post-data py-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div className=" me-3">
                                                            <img className="rounded-circle img-fluid" src="/images/user/04.jpg" alt="" />
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="d-flex justify-content-between">
                                                                <div className>
                                                                    <h5 className="mb-0 d-inline-block"><a href="#" className>Paige Turner</a></h5>
                                                                    <p className="mb-0">8 hour ago</p>
                                                                </div>
                                                                <div className="card-post-toolbar">
                                                                    <div className="dropdown">
                                                                        <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                            <i className="ri-more-fill" />
                                                                        </span>
                                                                       
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="user-post">
                                                    <a href="javascript:void();"><img src="/images/page-img/52.jpg" alt="post-image" className="img-fluid w-100" /></a>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">

                                        {/* For member requests */}
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between">
                                            <div className="header-title">
                                                <h4 className="card-title">Groups</h4>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-inline p-0 m-0">
                                                <li className="mb-3 pb-3 border-bottom">
                                                    <div className="iq-search-bar members-search p-0">
                                                        <form action="#" className="searchbox w-auto">
                                                            <input type="text" className="text search-input bg-grey" placeholder="Type here to search..." />
                                                            <a className="search-link" href="#"><i className="ri-search-line" /></a>
                                                        </form>
                                                    </div>
                                                </li>
                                                <li className="mb-3 d-flex align-items-center">
                                                    <div className="avatar-40 rounded-circle bg-gray text-center me-3"><i className="ri-bank-card-line h4" /></div>
                                                    <h6 className="mb-0">Your Feed</h6>
                                                </li>
                                                <li className="mb-3 d-flex align-items-center">
                                                    <div className="avatar-40 rounded-circle bg-gray text-center me-3"><i className="ri-compass-3-line h4" /></div>
                                                    <h6 className="mb-0">Discover</h6>
                                                </li>
                                                <li>
                                                    <button type="submit" className="btn btn-primary d-block w-100"><i className="ri-add-line pe-2" />Create New Group</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                        {/* end of member requests */}


                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between">
                                            <div className="header-title">
                                                <h4 className="card-title">About</h4>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-inline p-0 m-0">
                                                <li className="mb-3">
                                                    <p className="mb-0">Developer's Group...</p>
                                                </li>
                                                <li className="mb-3">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0">
                                                            <i className="ri-lock-fill h4" />
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Private</h6>
                                                            <p className="mb-0">Success in slowing economic activity.</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0">
                                                            <i className="ri-eye-fill h4" />
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Visible</h6>
                                                            <p className="mb-0">Various versions have evolved over the years</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className>
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0">
                                                            <i className="ri-group-fill h4" />
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>General group</h6>
                                                            <p className="mb-0">There are many variations of passages</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
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
