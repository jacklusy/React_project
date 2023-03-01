import React from 'react'
import Footer from '../body/Footer';
import LeftSidebar from '../body/LeftSidebar';
import { Link } from 'react-router-dom';
import Navbar from '../body/Navbar';
import RightSidebar from '../body/RightSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

const Profile = () => {

    const navigate = useNavigate()
    const [inputs, setInputs] = useState({});
    const id = JSON.parse(localStorage.getItem('Id'));
    const [users,setUsers] = useState([]);
    const [acceptrdFriends,setAcceptedFriends] = useState([]);  
    const [pendingFriends,setpendingFriends] = useState([]);
    const [pendingRequest,setpendingRequest] = useState([]);
    const [friends,setfriends] = useState([]);
    const [requestFriend,setrequestFriend] = useState([]);
    // const {id}= useParams();

    useEffect(() => {
        getUsers();
        getusers();
        getFriendsAccepted();
        getFriendsPending();
    }, []);


    const getUsers = () => {

          const id = JSON.parse(localStorage.getItem('Id'));

        axios.get(`http://localhost/React/React_project/backend/log_reg.php/${id}`, inputs)
            .then(function (response) {
                console.log(response.data);
                setInputs(response.data);
            })

    }

      // لعرض جميع المستخدمين في الموقع
      const getusers = () => {

          axios.get("http://localhost/React/React_Project/backend/theUsers.php/")
          .then((respone)=>{
              setUsers(respone.data)
              console.log(respone.data);
          })
      }
      
        //   عرض جميع طلبات الصداقة الذين تمت الموافقة عليهم
        const getFriendsAccepted = () => {

            axios.get(`http://localhost/React/React_Project/backend/friends.php/${id}`)
            .then((respone)=>{
                console.log(respone.data);
                let friends = respone.data.map((ele)=>{
                    return ele.friend_id
                })
                console.log(friends);
                setfriends(friends);
                setAcceptedFriends(respone.data)
            })
        }

        // اللي بعثهم المستخدم pending عرض جميع طلبات الصداقة في حالة 
    const getFriendsPending = () => {

        axios.get(`http://localhost:80/frontend/back_end/acceptFriend.php/${id}`)
        .then((respone)=>{
            console.log(respone.data);
            let pendingRequest = respone.data.map((ele)=>{
                return ele.friend_id
            })
            setpendingRequest(pendingRequest);
            console.log(pendingRequest);
            setpendingFriends(respone.data)
        })
    }

         // حذف الصداقة
    const removeFriend = (friendId) => {
        let inputs = {user_id:id , friend_id:friendId};
        axios.put(`http://localhost/React/React_Project/backend/removeFriends.php`,inputs)
        .then((respone)=>{
            console.log(respone.data);
            getFriendsPending();
            getFriendsAccepted();
            
        })


        
    }


    const photoUrl =  inputs.image;
    console.log(photoUrl);


    return (
        <div>
            <Navbar />

            <LeftSidebar />

            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>SocialV | Responsive Bootstrap 5 Admin Dashboard Template</title>

                <div className="wrapper">
                    <div id="content-page" className="content-page">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">

                                    {/* COVER AND USER IMAGE */}
                                    <div className="card">
                                        <div className="card-body profile-page p-0">

                                            <div className="profile-header">
                                                <div className="position-relative">
                                                    <img src="/images/page-img/profile-bg1.jpg" alt="profile-bg" className="rounded img-fluid" />

                                                </div>
                                                <div className="user-detail text-center mb-3">
                                                    <div className="profile-img">
                                                    {!photoUrl ? <img src={require('../images/default.jpg')} alt="userimg" className="avatar-60 rounded-circle img-fluid" /> : <img src={require(`../images/${photoUrl}`)} alt="userimg" className="avatar-60 rounded-circle img-fluid" />}
                                                    </div>
                                                    <div className="profile-detail">
                                                        <h3 className> {inputs.first_name} <span> {inputs.last_name} </span></h3>
                                                    </div>
                                                </div>
                                                <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                                                        {/* {users.filter(function(ele) {
                                                            // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                                                            if (ele.id === id) {
                                                                return false; // skip
                                                            }
                                                            console.log(users)
                                                            return true;
                                                            }).map((ele,index)=>{
                                                                return(
                                                                <Link>      
                                                                {(() => {
                                                                        if (friends.includes(ele.id)){
                                                                                    return (
                                                                                        <div className="iq-friend-request">
                                                                                            <button name="" id="" class="btn btn-primary"  onClick={()=>removeFriend(ele.id)}>Delete Friend</button>
                                                                                        </div>  
                                                                                )
                                                                            }})()}
                                                                 </Link> 
                                                            )})
                                                            } */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* TOP NAV BAR */}
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <div className="user-tabing">
                                                <ul className="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                                                    <li className="nav-item col-12 col-sm-3 p-0">
                                                        <a className="nav-link active" href="#pills-timeline-tab" data-bs-toggle="pill" data-bs-target="#timeline" role="button">Timeline</a>
                                                    </li>

                                                    <li className="nav-item col-12 col-sm-3 p-0">
                                                        <a className="nav-link" href="#pills-friends-tab" data-bs-toggle="pill" data-bs-target="#friends" role="button"> Friend Request</a>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* PROFILE CONTENT */}
                                <div className="col-sm-12">
                                    <div className="tab-content">

                                        {/* TIMELINE POST */}
                                        {/* <div className="tab-pane fade show active" id="timeline" role="tabpanel">
                                            <div className="card-body p-0">
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <div className="card">

                                                        </div>



                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div id="post-modal-data" className="card">

                                                            <div className="card-body">
                                                                <div className="d-flex align-items-center">


                                                                </div>

                                                            </div>
                                                                    
                                                            <div className="modal fade" id="post-modal" tabIndex={-1} aria-labelledby="post-modalLabel" aria-hidden="true">
                                                                <div className="modal-dialog  modal-lg modal-fullscreen-sm-down">
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
                                                                                <form className="post-text ms-3 w-100" action="#">
                                                                                    <input type="text" className="form-control rounded" placeholder="Write something here..." style={{ border: 'none' }} />
                                                                                </form>
                                                                            </div>
                                                                            <hr />
                                                                            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                                                                <li className="col-md-6 mb-3">
                                                                                    <div className="bg-soft-primary rounded p-2 pointer me-3"><a href="#" /><img src="/images/small/07.png" alt="icon" className="img-fluid" /> Photo/Video</div>
                                                                                </li>
                                                                                <li className="col-md-6 mb-3">
                                                                                    <div className="bg-soft-primary rounded p-2 pointer me-3"><a href="#" /><img src="/images/small/08.png" alt="icon" className="img-fluid" /> Tag Friend</div>
                                                                                </li>
                                                                                <li className="col-md-6 mb-3">
                                                                                    <div className="bg-soft-primary rounded p-2 pointer me-3"><a href="#" /><img src="/images/small/09.png" alt="icon" className="img-fluid" /> Feeling/Activity</div>
                                                                                </li>
                                                                                <li className="col-md-6 mb-3">
                                                                                    <div className="bg-soft-primary rounded p-2 pointer me-3"><a href="#" /><img src="/images/small/10.png" alt="icon" className="img-fluid" /> Check in</div>
                                                                                </li>
                                                                                <li className="col-md-6 mb-3">
                                                                                    <div className="bg-soft-primary rounded p-2 pointer me-3"><a href="#" /><img src="/images/small/11.png" alt="icon" className="img-fluid" /> Live Video</div>
                                                                                </li>
                                                                                <li className="col-md-6 mb-3">
                                                                                    <div className="bg-soft-primary rounded p-2 pointer me-3"><a href="#" /><img src="/images/small/12.png" alt="icon" className="img-fluid" /> Gif</div>
                                                                                </li>
                                                                                <li className="col-md-6 mb-3">
                                                                                    <div className="bg-soft-primary rounded p-2 pointer me-3"><a href="#" /><img src="/images/small/13.png" alt="icon" className="img-fluid" /> Watch Party</div>
                                                                                </li>
                                                                                <li className="col-md-6 mb-3">
                                                                                    <div className="bg-soft-primary rounded p-2 pointer me-3"><a href="#" /><img src="/images/small/14.png" alt="icon" className="img-fluid" /> Play with Friends</div>
                                                                                </li>
                                                                            </ul>
                                                                            <hr />
                                                                            <div className="other-option">
                                                                                <div className="d-flex align-items-center justify-content-between">
                                                                                    <div className="d-flex align-items-center">
                                                                                        <div className="user-img me-3">
                                                                                            {!photoUrl ? ( 
                                                                                                <img src="/images/user/default.jpg" alt="userimg" className="rounded-circle me-3" /> 
                                                                                            ): ( 
                                                                                                <img src={require(`../images/${photoUrl}`)} alt="userimg" className="rounded-circle me-3" />
                                                                                            )}
                                                                                        </div>
                                                                                        <h6>Your Story</h6>
                                                                                    </div>
                                                                                    <div className="card-post-toolbar">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                <span className="btn btn-primary">Friend</span>
                                                                                            </span>
                                                                                            <div className="dropdown-menu m-0 p-0">
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-save-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Public</h6>
                                                                                                            <p className="mb-0">Anyone on or off Facebook</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-close-circle-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Friends</h6>
                                                                                                            <p className="mb-0">Your Friend on facebook</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-user-unfollow-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Friends except</h6>
                                                                                                            <p className="mb-0">Don't show to some friends</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-notification-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Only Me</h6>
                                                                                                            <p className="mb-0">Only me</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
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
                                                                    <div className="user-post-data pb-3">
                                                                        <div className="d-flex justify-content-between">
                                                                            <div className="me-3">
                                                                                <img className="rounded-circle  avatar-60" src="/images/user/1.jpg" alt="" />
                                                                            </div>
                                                                            <div className="w-100">
                                                                                <div className="d-flex justify-content-between flex-wrap">
                                                                                    <div className>
                                                                                        <h5 className="mb-0 d-inline-block"><a href="#" className>Bni Cyst</a></h5>
                                                                                        <p className="ms-1 mb-0 d-inline-block">Add New Post</p>
                                                                                        <p className="mb-0">3 hour ago</p>
                                                                                    </div>
                                                                                    <div className="card-post-toolbar">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                <i className="ri-more-fill" />
                                                                                            </span>
                                                                                            <div className="dropdown-menu m-0 p-0">
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-save-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Save Post</h6>
                                                                                                            <p className="mb-0">Add this to your saved items</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-pencil-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Edit Post</h6>
                                                                                                            <p className="mb-0">Update your post and saved items</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-close-circle-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Hide From Timeline</h6>
                                                                                                            <p className="mb-0">See fewer posts like this.</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-delete-bin-7-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Delete</h6>
                                                                                                            <p className="mb-0">Remove thids Post on Timeline</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-notification-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Notifications</h6>
                                                                                                            <p className="mb-0">Turn on notifications for this post</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="user-post">
                                                                        <a href="#"><img src="/images/page-img/p1.jpg" alt="post-image" className="img-fluid w-100" /></a>
                                                                    </div>
                                                                    <div className="comment-area mt-3">
                                                                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                                            <div className="like-block position-relative d-flex align-items-center">
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="like-data">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                <img src="/images/icon/01.png" className="img-fluid" alt="" />
                                                                                            </span>
                                                                                            <div className="dropdown-menu py-2">
                                                                                                <a className="ms-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Like"><img src="/images/icon/01.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Love"><img src="/images/icon/02.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Happy"><img src="/images/icon/03.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="HaHa"><img src="/images/icon/04.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Think"><img src="/images/icon/05.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Sade"><img src="/images/icon/06.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Lovely"><img src="/images/icon/07.png" className="img-fluid" alt="" /></a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="total-like-block ms-2 me-3">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                140 Likes
                                                                                            </span>
                                                                                            <div className="dropdown-menu">
                                                                                                <a className="dropdown-item" href="#">Max Emum</a>
                                                                                                <a className="dropdown-item" href="#">Bill Yerds</a>
                                                                                                <a className="dropdown-item" href="#">Hap E. Birthday</a>
                                                                                                <a className="dropdown-item" href="#">Tara Misu</a>
                                                                                                <a className="dropdown-item" href="#">Midge Itz</a>
                                                                                                <a className="dropdown-item" href="#">Sal Vidge</a>
                                                                                                <a className="dropdown-item" href="#">Other</a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="total-comment-block">
                                                                                    <div className="dropdown">
                                                                                        <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                            20 Comment
                                                                                        </span>
                                                                                        <div className="dropdown-menu">
                                                                                            <a className="dropdown-item" href="#">Max Emum</a>
                                                                                            <a className="dropdown-item" href="#">Bill Yerds</a>
                                                                                            <a className="dropdown-item" href="#">Hap E. Birthday</a>
                                                                                            <a className="dropdown-item" href="#">Tara Misu</a>
                                                                                            <a className="dropdown-item" href="#">Midge Itz</a>
                                                                                            <a className="dropdown-item" href="#">Sal Vidge</a>
                                                                                            <a className="dropdown-item" href="#">Other</a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="share-block d-flex align-items-center feather-icon mt-2 mt-md-0">
                                                                                <a href="#" data-bs-toggle="offcanvas" data-bs-target="#share-btn" aria-controls="share-btn"><i className="ri-share-line" />
                                                                                    <span className="ms-1">99 Share</span></a>
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <ul className="post-comments p-0 m-0">
                                                                            <li className="mb-2">
                                                                                <div className="d-flex flex-wrap">
                                                                                    <div className="user-img">
                                                                                        <img src="/images/user/02.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                                                                                    </div>
                                                                                    <div className="comment-data-block ms-3">
                                                                                        <h6>Monty Carlo</h6>
                                                                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                                            <a href="#">like</a>
                                                                                            <a href="#">reply</a>
                                                                                            <a href="#">translate</a>
                                                                                            <span> 5 min </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="d-flex flex-wrap">
                                                                                    <div className="user-img">
                                                                                        <img src="/images/user/03.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                                                                                    </div>
                                                                                    <div className="comment-data-block ms-3">
                                                                                        <h6>Paul Molive</h6>
                                                                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                                            <a href="#">like</a>
                                                                                            <a href="#">reply</a>
                                                                                            <a href="#">translate</a>
                                                                                            <span> 5 min </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                        <form className="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
                                                                            <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                                                                            <div className="comment-attagement d-flex">
                                                                                <a href="#"><i className="ri-link me-3" /></a>
                                                                                <a href="#"><i className="ri-user-smile-line me-3" /></a>
                                                                                <a href="#"><i className="ri-camera-line me-3" /></a>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                                <div className="post-item">
                                                                    <div className="user-post-data py-3">
                                                                        <div className="d-flex  justify-content-between">
                                                                            <div className="me-3">
                                                                                <img className="rounded-circle  avatar-60" src="/images/user/1.jpg" alt="" />
                                                                            </div>
                                                                            <div className="w-100">
                                                                                <div className="d-flex justify-content-between">
                                                                                    <div className>
                                                                                        <h5 className="mb-0 d-inline-block me-1"><a href="#" className>Bni Cyst</a></h5>
                                                                                        <p className="mb-0 d-inline-block">Share Anna Mull's Post</p>
                                                                                        <p className="mb-0">5 hour ago</p>
                                                                                    </div>
                                                                                    <div className="card-post-toolbar">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                <i className="ri-more-fill" />
                                                                                            </span>
                                                                                            <div className="dropdown-menu m-0 p-0">
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-save-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Save Post</h6>
                                                                                                            <p className="mb-0">Add this to your saved items</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-pencil-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Edit Post</h6>
                                                                                                            <p className="mb-0">Update your post and saved items</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-close-circle-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Hide From Timeline</h6>
                                                                                                            <p className="mb-0">See fewer posts like this.</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-delete-bin-7-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Delete</h6>
                                                                                                            <p className="mb-0">Remove thids Post on Timeline</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-notification-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Notifications</h6>
                                                                                                            <p className="mb-0">Turn on notifications for this post</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="user-post">
                                                                        <a href="#"><img src="/images/page-img/p3.jpg" alt="post-image" className="img-fluid w-100" /></a>
                                                                    </div>
                                                                    <div className="comment-area mt-3">
                                                                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                                            <div className="like-block position-relative d-flex align-items-center">
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="like-data">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                <img src="/images/icon/01.png" className="img-fluid" alt="" />
                                                                                            </span>
                                                                                            <div className="dropdown-menu py-2">
                                                                                                <a className="ms-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Like"><img src="/images/icon/01.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Love"><img src="/images/icon/02.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Happy"><img src="/images/icon/03.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="HaHa"><img src="/images/icon/04.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Think"><img src="/images/icon/05.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Sade"><img src="/images/icon/06.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Lovely"><img src="/images/icon/07.png" className="img-fluid" alt="" /></a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="total-like-block ms-2 me-3">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                140 Likes
                                                                                            </span>
                                                                                            <div className="dropdown-menu">
                                                                                                <a className="dropdown-item" href="#">Max Emum</a>
                                                                                                <a className="dropdown-item" href="#">Bill Yerds</a>
                                                                                                <a className="dropdown-item" href="#">Hap E. Birthday</a>
                                                                                                <a className="dropdown-item" href="#">Tara Misu</a>
                                                                                                <a className="dropdown-item" href="#">Midge Itz</a>
                                                                                                <a className="dropdown-item" href="#">Sal Vidge</a>
                                                                                                <a className="dropdown-item" href="#">Other</a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="total-comment-block">
                                                                                    <div className="dropdown">
                                                                                        <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                            20 Comment
                                                                                        </span>
                                                                                        <div className="dropdown-menu">
                                                                                            <a className="dropdown-item" href="#">Max Emum</a>
                                                                                            <a className="dropdown-item" href="#">Bill Yerds</a>
                                                                                            <a className="dropdown-item" href="#">Hap E. Birthday</a>
                                                                                            <a className="dropdown-item" href="#">Tara Misu</a>
                                                                                            <a className="dropdown-item" href="#">Midge Itz</a>
                                                                                            <a className="dropdown-item" href="#">Sal Vidge</a>
                                                                                            <a className="dropdown-item" href="#">Other</a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="share-block d-flex align-items-center feather-icon mt-2 mt-md-0">
                                                                                <a href="#" data-bs-toggle="offcanvas" data-bs-target="#share-btn" aria-controls="share-btn"><i className="ri-share-line" />
                                                                                    <span className="ms-1">99 Share</span></a>
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <ul className="post-comments p-0 m-0">
                                                                            <li className="mb-2">
                                                                                <div className="d-flex flex-wrap">
                                                                                    <div className="user-img">
                                                                                        <img src="/images/user/02.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                                                                                    </div>
                                                                                    <div className="comment-data-block ms-3">
                                                                                        <h6>Monty Carlo</h6>
                                                                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                                            <a href="#">like</a>
                                                                                            <a href="#">reply</a>
                                                                                            <a href="#">translate</a>
                                                                                            <span> 5 min </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="d-flex flex-wrap">
                                                                                    <div className="user-img">
                                                                                        <img src="/images/user/03.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                                                                                    </div>
                                                                                    <div className="comment-data-block ms-3">
                                                                                        <h6>Paul Molive</h6>
                                                                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                                            <a href="#">like</a>
                                                                                            <a href="#">reply</a>
                                                                                            <a href="#">translate</a>
                                                                                            <span> 5 min </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                        <form className="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
                                                                            <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                                                                            <div className="comment-attagement d-flex">
                                                                                <a href="#"><i className="ri-link me-3" /></a>
                                                                                <a href="#"><i className="ri-user-smile-line me-3" /></a>
                                                                                <a href="#"><i className="ri-camera-line me-3" /></a>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                                <div className="post-item">
                                                                    <div className="user-post-data py-3">
                                                                        <div className="d-flex justify-content-between">
                                                                            <div className="me-3">
                                                                                <img className="rounded-circle avatar-60" src="/images/user/1.jpg" alt="" />
                                                                            </div>
                                                                            <div className="w-100">
                                                                                <div className="d-flex justify-content-between">
                                                                                    <div className>
                                                                                        <h5 className="mb-0 d-inline-block"><a href="#" className>Bni Cyst</a></h5>
                                                                                        <p className="ms-1 mb-0 d-inline-block">Update his Status</p>
                                                                                        <p className="mb-0">7 hour ago</p>
                                                                                    </div>
                                                                                    <div className="card-post-toolbar">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                <i className="ri-more-fill" />
                                                                                            </span>
                                                                                            <div className="dropdown-menu m-0 p-0">
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-save-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Save Post</h6>
                                                                                                            <p className="mb-0">Add this to your saved items</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-pencil-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Edit Post</h6>
                                                                                                            <p className="mb-0">Update your post and saved items</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-close-circle-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Hide From Timeline</h6>
                                                                                                            <p className="mb-0">See fewer posts like this.</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-delete-bin-7-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Delete</h6>
                                                                                                            <p className="mb-0">Remove thids Post on Timeline</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-notification-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Notifications</h6>
                                                                                                            <p className="mb-0">Turn on notifications for this post</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="user-post">
                                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                                                    </div>
                                                                    <div className="comment-area mt-3">
                                                                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                                            <div className="like-block position-relative d-flex align-items-center">
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="like-data">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                <img src="/images/icon/01.png" className="img-fluid" alt="" />
                                                                                            </span>
                                                                                            <div className="dropdown-menu py-2">
                                                                                                <a className="ms-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Like"><img src="/images/icon/01.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Love"><img src="/images/icon/02.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Happy"><img src="/images/icon/03.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="HaHa"><img src="/images/icon/04.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Think"><img src="/images/icon/05.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Sade"><img src="/images/icon/06.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Lovely"><img src="/images/icon/07.png" className="img-fluid" alt="" /></a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="total-like-block ms-2 me-3">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                140 Likes
                                                                                            </span>
                                                                                            <div className="dropdown-menu">
                                                                                                <a className="dropdown-item" href="#">Max Emum</a>
                                                                                                <a className="dropdown-item" href="#">Bill Yerds</a>
                                                                                                <a className="dropdown-item" href="#">Hap E. Birthday</a>
                                                                                                <a className="dropdown-item" href="#">Tara Misu</a>
                                                                                                <a className="dropdown-item" href="#">Midge Itz</a>
                                                                                                <a className="dropdown-item" href="#">Sal Vidge</a>
                                                                                                <a className="dropdown-item" href="#">Other</a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="total-comment-block">
                                                                                    <div className="dropdown">
                                                                                        <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                            20 Comment
                                                                                        </span>
                                                                                        <div className="dropdown-menu">
                                                                                            <a className="dropdown-item" href="#">Max Emum</a>
                                                                                            <a className="dropdown-item" href="#">Bill Yerds</a>
                                                                                            <a className="dropdown-item" href="#">Hap E. Birthday</a>
                                                                                            <a className="dropdown-item" href="#">Tara Misu</a>
                                                                                            <a className="dropdown-item" href="#">Midge Itz</a>
                                                                                            <a className="dropdown-item" href="#">Sal Vidge</a>
                                                                                            <a className="dropdown-item" href="#">Other</a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="share-block d-flex align-items-center feather-icon mt-2 mt-md-0">
                                                                                <a href="#" data-bs-toggle="offcanvas" data-bs-target="#share-btn" aria-controls="share-btn"><i className="ri-share-line" />
                                                                                    <span className="ms-1">99 Share</span></a>
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <ul className="post-comments p-0 m-0">
                                                                            <li className="mb-2">
                                                                                <div className="d-flex flex-wrap">
                                                                                    <div className="user-img">
                                                                                        <img src="/images/user/02.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                                                                                    </div>
                                                                                    <div className="comment-data-block ms-3">
                                                                                        <h6>Monty Carlo</h6>
                                                                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                                            <a href="#">like</a>
                                                                                            <a href="#">reply</a>
                                                                                            <a href="#">translate</a>
                                                                                            <span> 5 min </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="d-flex flex-wrap">
                                                                                    <div className="user-img">
                                                                                        <img src="/images/user/03.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                                                                                    </div>
                                                                                    <div className="comment-data-block ms-3">
                                                                                        <h6>Paul Molive</h6>
                                                                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                                            <a href="#">like</a>
                                                                                            <a href="#">reply</a>
                                                                                            <a href="#">translate</a>
                                                                                            <span> 5 min </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                        <form className="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
                                                                            <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                                                                            <div className="comment-attagement d-flex">
                                                                                <a href="#"><i className="ri-link me-3" /></a>
                                                                                <a href="#"><i className="ri-user-smile-line me-3" /></a>
                                                                                <a href="#"><i className="ri-camera-line me-3" /></a>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                                <div className="post-item">
                                                                    <div className="user-post-data py-3">
                                                                        <div className="d-flex justify-content-between">
                                                                            <div className=" me-3">
                                                                                <img className="rounded-circle avatar-60" src="/images/user/1.jpg" alt="" />
                                                                            </div>
                                                                            <div className="w-100">
                                                                                <div className="d-flex justify-content-between">
                                                                                    <div className>
                                                                                        <h5 className="mb-0 d-inline-block me-1"><a href="#" className>Bni Cyst</a></h5>
                                                                                        <p className=" mb-0 d-inline-block">Change Profile Picture</p>
                                                                                        <p className="mb-0">3 day ago</p>
                                                                                    </div>
                                                                                    <div className="card-post-toolbar">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                <i className="ri-more-fill" />
                                                                                            </span>
                                                                                            <div className="dropdown-menu m-0 p-0">
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-save-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Save Post</h6>
                                                                                                            <p className="mb-0">Add this to your saved items</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-pencil-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Edit Post</h6>
                                                                                                            <p className="mb-0">Update your post and saved items</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-close-circle-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Hide From Timeline</h6>
                                                                                                            <p className="mb-0">See fewer posts like this.</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-delete-bin-7-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Delete</h6>
                                                                                                            <p className="mb-0">Remove thids Post on Timeline</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                                <a className="dropdown-item p-3" href="#">
                                                                                                    <div className="d-flex align-items-top">
                                                                                                        <i className="ri-notification-line h4" />
                                                                                                        <div className="data ms-2">
                                                                                                            <h6>Notifications</h6>
                                                                                                            <p className="mb-0">Turn on notifications for this post</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="user-post text-center">
                                                                        <a href="#"><img src="/images/page-img/p1.jpg" alt="post-image" className="img-fluid profile-img" /></a>
                                                                    </div>
                                                                    <div className="comment-area mt-3">
                                                                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                                            <div className="like-block position-relative d-flex align-items-center">
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="like-data">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                <img src="/images/icon/01.png" className="img-fluid" alt="" />
                                                                                            </span>
                                                                                            <div className="dropdown-menu py-2">
                                                                                                <a className="ms-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Like"><img src="/images/icon/01.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Love"><img src="/images/icon/02.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Happy"><img src="/images/icon/03.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="HaHa"><img src="/images/icon/04.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Think"><img src="/images/icon/05.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Sade"><img src="/images/icon/06.png" className="img-fluid" alt="" /></a>
                                                                                                <a className="me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Lovely"><img src="/images/icon/07.png" className="img-fluid" alt="" /></a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="total-like-block ms-2 me-3">
                                                                                        <div className="dropdown">
                                                                                            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                                140 Likes
                                                                                            </span>
                                                                                            <div className="dropdown-menu">
                                                                                                <a className="dropdown-item" href="#">Max Emum</a>
                                                                                                <a className="dropdown-item" href="#">Bill Yerds</a>
                                                                                                <a className="dropdown-item" href="#">Hap E. Birthday</a>
                                                                                                <a className="dropdown-item" href="#">Tara Misu</a>
                                                                                                <a className="dropdown-item" href="#">Midge Itz</a>
                                                                                                <a className="dropdown-item" href="#">Sal Vidge</a>
                                                                                                <a className="dropdown-item" href="#">Other</a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="total-comment-block">
                                                                                    <div className="dropdown">
                                                                                        <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                            20 Comment
                                                                                        </span>
                                                                                        <div className="dropdown-menu">
                                                                                            <a className="dropdown-item" href="#">Max Emum</a>
                                                                                            <a className="dropdown-item" href="#">Bill Yerds</a>
                                                                                            <a className="dropdown-item" href="#">Hap E. Birthday</a>
                                                                                            <a className="dropdown-item" href="#">Tara Misu</a>
                                                                                            <a className="dropdown-item" href="#">Midge Itz</a>
                                                                                            <a className="dropdown-item" href="#">Sal Vidge</a>
                                                                                            <a className="dropdown-item" href="#">Other</a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="share-block d-flex align-items-center feather-icon mt-2 mt-md-0">
                                                                                <a href="#" data-bs-toggle="offcanvas" data-bs-target="#share-btn" aria-controls="share-btn"><i className="ri-share-line" />
                                                                                    <span className="ms-1">99 Share</span></a>
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <ul className="post-comments p-0 m-0">
                                                                            <li className="mb-2">
                                                                                <div className="d-flex flex-wrap">
                                                                                    <div className="user-img">
                                                                                        <img src="/images/user/02.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                                                                                    </div>
                                                                                    <div className="comment-data-block ms-3">
                                                                                        <h6>Monty Carlo</h6>
                                                                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                                            <a href="#">like</a>
                                                                                            <a href="#">reply</a>
                                                                                            <a href="#">translate</a>
                                                                                            <span> 5 min </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="d-flex flex-wrap">
                                                                                    <div className="user-img">
                                                                                        <img src="/images/user/03.jpg" alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                                                                                    </div>
                                                                                    <div className="comment-data-block ms-3">
                                                                                        <h6>Paul Molive</h6>
                                                                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                                            <a href="#">like</a>
                                                                                            <a href="#">reply</a>
                                                                                            <a href="#">translate</a>
                                                                                            <span> 5 min </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                        <form className="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
                                                                            <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                                                                            <div className="comment-attagement d-flex">
                                                                                <a href="#"><i className="ri-link me-3" /></a>
                                                                                <a href="#"><i className="ri-user-smile-line me-3" /></a>
                                                                                <a href="#"><i className="ri-camera-line me-3" /></a>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        
                                        {/* FRIND REQUIST */}
                                        <div className="tab-pane fade" id="friends" role="tabpanel">
                                            <div className="card">
                                                    <h4 className='text-center text-white p-2' style={{backgroundColor: '#406b72'}}>Friends</h4>
                                                <div className="card-body">
                                                    <div className="friend-list-tab mt-2">
                                                        <div className="tab-content">
                                                            <div className="tab-pane fade active show" id="all-friends" role="tabpanel">
                                                                <div className="card-body p-0">
                                                                    {/* Blog-Box1  */}
                                                                    {users.filter(function(ele) {
                                                                            // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                                                                            if (ele.id === id) {
                                                                                return false; // skip
                                                                            }
                                                                            return true;
                                                                        }).map((ele,index)=>{
                                                                            return(
                                                                                
                                                                            
                                                                            <div className="row justify-content-center">
                                                                                {(() => {
                                                                                        if (pendingRequest.includes(ele.id) || friends.includes(ele.id) || requestFriend.includes(ele.id)){
                                                                                            if(friends.includes(ele.id)){
                                                                                                return (
                                                                                                        <div className="col-lg-10 m-1 border-bottom p-1 border-3">
                                                                                                            <div className="d-flex align-items-center justify-content-between">
                                                                                                                <div className="d-flex align-items-center">
                                                                                                                    <a href="#">
                                                                                                                        <img src={require(`../../components/images/${ele.image}`)} alt="profile-img" className="rounded-circle img-fluid avatar-80" />
                                                                                                                    </a>
                                                                                                                    <div className="friend-info ms-3">
                                                                                                                        <h4>{ele.first_name}</h4>
                                                                                                                        <p className="mb-0">{ele.email}</p>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className="card-header-toolbar d-flex align-items-center">
                                                                                                                    <div className="dropdown">
                                                                                                                        <span className="dropdown-toggle btn text-white me-2" style={{backgroundColor: '#406b72'}} id="dropdownMenuButton01" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                                                                                            <i className="ri-check-line me-1 text-white" /> Friend
                                                                                                                        </span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                )}}})()}
                                                                                </div>
                                                                        )})}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-sm-12 text-center">
                                    <img src="/images/page-img/page-load-loader.gif" alt="loader" style={{ height: '100px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Profile


