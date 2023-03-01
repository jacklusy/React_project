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
    const [allGroups, setDataGroups] = useState([]);
    const [usersGroups, setUserGroups] = useState([]);
    const [pendingRequestGroups, setPendingRequestGroups] = useState([]);

    const [myAcceptedGroups, setMyAcceptrdGroups] = useState([]);


    const [pendingMembers, setPendingMembers] = useState([]);
    const [acceptedMembers, setAcceptedMembers] = useState([]);


    useEffect(() => {
        getDataGroups();
        getUsersGroup();
        getPendingRequest();
        getMyAcceptrdGroups();
        getGroups();
        getPendingMempers();
        getAcceptedMempers();



    }, [])

    const getMyAcceptrdGroups = () => {

        axios.get(`http://localhost/React/React_Project/backend/getMyGroupAcceptedStatus.php/${current_ID}`)
            .then(response => {
                console.log(response.data)
                let myAcceptedGroups = response.data.map((ele) => {
                    return ele.group_id
                })
                console.log(myAcceptedGroups);
                console.log(id);
                console.log(myAcceptedGroups.hasOwnProperty(id));
                console.log(myAcceptedGroups.includes(id));
                setMyAcceptrdGroups(myAcceptedGroups);
            })

    }
    const getDataGroups = () => {

        axios.get(`http://localhost/React/React_Project/backend/getDataGroups.php/${id}`)
            .then(response => {
                console.log(response.data)
                setGroups(response.data);
            })
    }
    // to bring the accepted members
    const getUsersGroup = () => {

        axios.get(`http://localhost/React/React_Project/backend/getUsersGroup.php/${id}`)
            .then(response => {
                console.log(response.data)
                setUserGroups(response.data);
            })

    }

    const getPendingRequest = () => {
        axios.get(`http://localhost/React/React_Project/backend/getPendingRequestForGroup.php/${id}`)
            .then((respone) => {
                console.log(respone.data);

                setPendingRequestGroups(respone.data);
                // setPendingMempers(respone.data)
            })
    }

    // to delete a member of the group
    const deleteFromGroup = (userId) => {

        let inputs = { user_id: userId, group_id: id };
        axios.put(`http://localhost/React/React_Project/backend/deleteRequestForGroup.php`, inputs)
            .then((respone) => {
                console.log(respone.data);
                getDataGroups();
                getUsersGroup();
                getPendingRequest();

            })

    }

    // to delete a request
    const deleteRequest = (userId) => {

        let inputs = { user_id: userId, group_id: id };
        axios.put(`http://localhost/React/React_Project/backend/deleteRequestForGroup.php`, inputs)
            .then((respone) => {
                console.log(respone.data);
                getDataGroups();
                getUsersGroup();
                getPendingRequest();

            })

    }
    //  ????? ??? ???????? ?? ??????
    const acceptRequest = (userId) => {

        let inputs = { user_id: userId, group_id: id };
        axios.put(`http://localhost/React/React_Project/backend/membersGroup.php`, inputs)
            .then((respone) => {
                console.log(respone.data);
                getDataGroups();
                getUsersGroup();
                getPendingRequest();

            })
    }

    // /////////////////////////////////
    // ???? ?? ???????? ?? ??????

    function getGroups() {
        axios.get(`http://localhost/React/React_Project/backend/groups.php/`)
            .then(response => {
                console.log(response.data)
                setDataGroups(response.data);

            })
    }


    // ?????? ??? ????? ????
    const AddToGroup = (groupId) => {
        let inputs = { user_id: current_ID, group_id: groupId };
        axios.post(`http://localhost/React/React_Project/backend/membersGroup.php/save`, inputs)
            .then((respone) => {
                console.log(respone.data);
                getPendingMempers();

                // getFriendsRequest();
            })
    }
    //???????? pending ???? ?? ????? ???????? ???? ?????? 
    const getPendingMempers = () => {

        axios.get(`http://localhost/React/React_Project/backend/getPendingMember.php/${current_ID}`)
            .then((respone) => {
                console.log(respone.data);
                let pendingMembers = respone.data.map((ele) => {
                    return ele.group_id
                })
                console.log(pendingMembers);
                setPendingMembers(pendingMembers);
                // setPendingMempers(respone.data)
            })
    }

    const getAcceptedMempers = () => {

        axios.get(`http://localhost/React/React_Project/backend/getAcceptedMember.php/${current_ID}`)
            .then((respone) => {
                console.log(respone.data);
                let acceptedMembers = respone.data.map((ele) => {
                    return ele.group_id
                })
                console.log(acceptedMembers);
                setAcceptedMembers(acceptedMembers);
                // setPendingMempers(respone.data)
            })
    }

    // ???? ??? ??????? 
    const removeRequest = (GroupId) => {
        let inputs = { user_id: current_ID, group_id: GroupId };
        axios.put(`http://localhost/React/React_Project/backend/getPendingMember.php/edit`, inputs)
            .then((respone) => {
                console.log(respone.data);
                getGroups();
                getPendingMempers();
            })

    }

    // delete group

    const deleteGroup = (id) => {
        axios.delete(`http://localhost:80/react_project/back_end/groups.php/${id}`).then(function (response) {
            window.location.assign('/home')
        })
    }





    // ///////////////////////////////////////
    let flag = false;

    return (
        <>
            {groups.map((groups, index) => {

                return <div key={index}>

                    <Navbar />

                    <RightSidebar />
                    <LeftSidebar />
                    <div>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                        <title>Group details</title>

                        <div className="wrapper">
                            <div id="content-page" className="content-page">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                <div className="group-info d-flex align-items-center">
                                                    <div className="me-3">
                                                        <img className="rounded-circle img-fluid avatar-100" src={groups && groups.group_image ? require(`../images/${groups.group_image}`) : "assets/ad.png"} />
                                                    </div>
                                                    <div className="info">
                                                        <h4>{groups.group_name}</h4>
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
                                                        <h4 className="card-title">Admin Name : {groups.first_name}</h4>
                                                    </div>
                                                </div>
                                                <div className="card-bod">
                                                    <ul className="list-inline p-0 m-0">


                                                        <h4></h4>
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* end of member requests */}


                                            <div className="card">

                                                <div className="card-bod">


                                                    <div className="sub-drop sub-drop-large w-100 " aria-labelledby="group-drop">
                                                        <div className="card shadow-none m-0">
                                                            <div className="card-header d-flex justify-content-between bg-primary">
                                                                <div className="header-title">
                                                                    <h5 className="mb-0 text-white">Group Request</h5>
                                                                </div>
                                                                <small className="badge  bg-light text-dark ">{pendingRequestGroups.length}</small>
                                                            </div>
                                                            <div className="card-body p-0" >
                                                                <div className="iq-friend-request" style={{ padding: '.5rem 0' }}>
                                                                    <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">

                                                                        {pendingRequestGroups.map((names, index) => {

                                                                            return (
                                                                                <>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <img className="avatar-40 rounded" src={require(`../images/${names.image}`)} alt="" />
                                                                                        <div className="ms-3">


                                                                                            <h6 className="mb-0 ">{names.first_name}</h6>
                                                                                            <p className="mb-0">40 friends</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <a href="javascript:void();" className="me-3 btn btn-primary rounded" onClick={() => acceptRequest(names.user_id)}>Confirm</a>
                                                                                        <a href="javascript:void();" className="me-3 btn btn-secondary rounded" onClick={() => deleteRequest(names.user_id)}>Delete</a>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

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
                                                                <small className="badge  bg-light text-dark ">{pendingRequestGroups.length}</small>
                                                            </div>
                                                            <div className="card-body p-0" >
                                                                <div className="iq-friend-request" style={{ padding: '.5rem 0' }}>
                                                                    <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                                        {usersGroups.map((names, index) => {

                                                                            return (
                                                                                <>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <img className="avatar-40 rounded" src={require(`../images/${names.image}`)} alt="" />
                                                                                        <div className="ms-3">


                                                                                            <h6 className="mb-0 ">{names.first_name}</h6>
                                                                                            {/* <p className="mb-0">40 friends</p> */}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="d-flex align-items-center">
                                                                                        {/* <a href="javascript:void();" className="me-3 btn btn-primary rounded" onClick={() => acceptRequest(names.user_id)}>Confirm</a> */}
                                                                                        <a href="javascript:void();" className="me-3 btn btn-secondary rounded" onClick={() => deleteFromGroup(names.user_id)}>Delete</a>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        })}
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



                    </div>
                    <Footer />
                </div>
            })}
        </>
    );
}

export default GroupDetails
