import React from 'react'
import Footer from '../body/Footer';
import LeftSidebar from '../body/LeftSidebar';
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineDelete,
  AiOutlineEdit,
  AiFillLike,
} from "react-icons/ai";
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
    const [likes, setLikes] = useState([]);
    const [acceptrdFriends,setAcceptedFriends] = useState([]);  
    const [pendingFriends,setpendingFriends] = useState([]);
    const [pendingRequest,setpendingRequest] = useState([]);
    const [friends,setfriends] = useState([]);
    const [requestFriend,setrequestFriend] = useState([]);
    const [comments, setComments] = useState([]);
    // const {id}= useParams();

    const [posts, setPosts] = useState([]);
    const current_Fname = JSON.parse(localStorage.getItem("first_name"));
    const current_Lname = JSON.parse(localStorage.getItem("last_name"));
    const current_ID = JSON.parse(localStorage.getItem("Id"));
    const current_Email = JSON.parse(localStorage.getItem("email"));
    const [file, setFile] = useState(null);

    useEffect(() => {
        getUsers();
        getusers();
        getPosts();
        getComments();
        getFriendsAccepted();
        getFriendsPending();
    }, []);

    function getPosts() {
        axios
          .get(`http://localhost/React/React_project/backend/posts.php`)
    
          .then((response) => {
            setPosts(response.data);
            getComments();
            getLikes();
          });
      }


      const handleEditPostSubmit = async (e) => {
        e.preventDefault();
    
        const formEditData = new FormData();
    
        formEditData.append("post_content", inputs["post_content"]);
        formEditData.append("post_id", inputs["post_id"]);
        formEditData.append("file", file);
    
        console.log(formEditData);
    
        try {
          const response = await axios.post(
            "http://localhost/React/React_Project/backend/postEdit.php/",
            formEditData
          );
          console.log(response.data);
          window.location.assign("/home");
        } catch (error) {
          console.error(error);
        }
      };
    
      const deletePost = (id) => {
        axios
          .delete(`http://localhost/React/React_Project/backend/posts.php/${id}`)
          .then(function (response) {});
        window.location.assign("/home");
      };

      function getComments() {
        axios
          .get(`http://localhost/React/React_Project/backend/comments.php/`)
          .then((response) => {
            setComments(response.data);
          });
      }

      const editComment = (id) => {
        document.getElementById(`comment${id}`).style.display = "none";
        document.getElementById(`editCommentForm${id}`).style.display = "block";
        document.getElementById(`editCommentBTN${id}`).style.display = "none";
      };

      const deleteComment = (id) => {
        axios
          .delete(`http://localhost/React/React_Project/backend/comments.php/${id}`)
          .then(function (response) {
            getComments();
          });
      };

      const getLikes = () => {
        axios
          .get(`http://localhost/React/React_project/backend/likes.php/`)
          .then((response) => {
            setLikes(response.data);
          });
      };

      const editPost = (id) => {
        document.getElementById(`post${id}`).style.display = "none";
        document.getElementById(`editPostForm${id}`).style.display = "block";
        document.getElementById(`editPostBTN${id}`).style.display = "none";
      };

      const handleEditPost = (id) => {
        const post_id = id;
        const value = document.getElementById(`editPostInput${id}`).value;
        setInputs({ post_content: value, post_id: post_id });
      };

      const handleCreateComment = (e) => {
        e.preventDefault();
        console.log(inputs);
        axios
          .post(
            "http://localhost/React/React_Project/backend/comments.php/",
            inputs
          )
          .then
          // window.location.assign('/home')
          ();
      };


    const canclePostEdit = (id) => {
        document.getElementById(`post${id}`).style.display = "block";
        document.getElementById(`editPostForm${id}`).style.display = "none";
        document.getElementById(`editPostBTN${id}`).style.display = "inline-block";
        document.getElementById(`imgPost${id}`).style.display = "block";
      };
    
      const cancleCommentEdit = (id) => {
        document.getElementById(`comment${id}`).style.display = "block";
        document.getElementById(`editCommentForm${id}`).style.display = "none";
        document.getElementById(`editCommentBTN${id}`).style.display =
          "inline-block";
      };

      const handleEditComment = (id) => {
        const comment_id = id;
        const value = document.getElementById(`editCommentInput${id}`).value;
        setInputs({ comment_content: value, comment_id: comment_id });
      };

      const handleEditCommentSubmit = (e) => {
        e.preventDefault();
        axios
          .put("http://localhost/React/React_Project/backend/comments.php/", inputs)
          .then
          // window.location.assign('/')
          ();
      };
    
      const handleLikePost = (id) => {
        const post_id = id;
        const user_id = current_ID;
        setInputs({ user_id: user_id, post_id: post_id });
      };

      const handleChange = (e) => {
        const value = e.target.value;
        const post_id = e.target.id;
        const user_id = e.target.name;
        setInputs({ comment_content: value, post_id: post_id, user_id: user_id });
      };
    
      const likePost = (e) => {
        e.preventDefault();
        console.log(inputs);
    
        axios
          .post("http://localhost/React/React_project/backend/likes.php/", inputs)
          .then(getPosts());
      };
      const removeLikePost = (e) => {
        e.preventDefault();
        console.log(inputs);
        axios
          .post(
            "http://localhost/React/React_Project/backend/likeDelete.php/",
            inputs
          )
          .then(getPosts());
      };


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