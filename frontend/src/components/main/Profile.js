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
                                    <div className="tab-content">

                                        {/* TIMELINE POST */}
                                        <div className="tab-pane fade show active" id="timeline" role="tabpanel">
                                            {/* ALL POSTS */}
                                            {posts.map((post, index_post) => {
                                            var flagLike = false;
                                            return (
                                                <div
                                                className="card card-block card-stretch"
                                                key={index_post}>
                                                <div className="card-body">
                                                    <div className="user-post-data">
                                                    <div className="d-flex justify-content-between">
                                                        {/* POST USER IMAGE */}
                                                        <div className="me-3">
                                                        {!post.image ?(
                                                                <img className="rounded-circle avatar-40" src={require('../images/default_user.jpeg')} alt="" />
                                                            ):(

                                                                <img className="rounded-circle avatar-40" src={require(`../images/${post.image}`)} alt="" />

                                                            )}
                                                        
                                                        </div>
                                                        <div className="w-100">
                                                        <div className="d-flex justify-content-between">
                                                            <div>
                                                            <p className="mb-0 d-inline-block">
                                                                {post.first_name}
                                                            </p>
                                                            <p className="mb-0 text-primary" style={{ fontSize: "8px" }}>
                                                                {post.created_at}
                                                            </p>
                                                            </div>
                                                            {post.user_id === current_ID ? (
                                                            <div className="card-post-toolbar">
                                                                <div className="dropdown">
                                                                <span
                                                                    className="dropdown-toggle"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false"
                                                                    role="button">
                                                                    <i className="ri-more-fill" />
                                                                </span>
                                                                <div className="dropdown-menu m-0 p-0">
                                                                    <a
                                                                    className="dropdown-item p-3"
                                                                    href="#">
                                                                    <button
                                                                        className="d-flex text-start  border-0 bg-transparent"
                                                                        onClick={() => {
                                                                        deletePost(post.post_id);
                                                                        }}>
                                                                        <AiOutlineDelete className="fs-4" />
                                                                        <div className="data ms-2">
                                                                        <h6>Delete</h6>
                                                                        </div>
                                                                    </button>
                                                                    </a>
                                                                    <a
                                                                    className="dropdown-item p-3"
                                                                    href="#">
                                                                    <button
                                                                        className="d-flex text-start align-items-top border-0 bg-transparent"
                                                                        id={`editPostBTN${post.post_id}`}
                                                                        onClick={() => {
                                                                        editPost(post.post_id);
                                                                        }}>
                                                                        <AiOutlineEdit className="fs-4" />
                                                                        <div className="data ms-2">
                                                                        <h6>Edit</h6>
                                                                        </div>
                                                                    </button>
                                                                    </a>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            ) : null}
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <hr />
                                                    {post.post_image !== "a" ? (
                                                    <>
                                                        {/* IMAGE POST */}
                                                        <div className="row-span-md-1 justify-content-center text-center ms-5 me-5">
                                                        <img
                                                            id={`imgPost${post.post_id}`}
                                                            className="img-thumnail border"
                                                            src={require(`../images/${post.post_image}`)}
                                                            style={{height: "100%", width: "100%"}}
                                                            alt=""
                                                        />

                                                        </div>
                                                        {/* CONTENT POST */}
                                                        <div className="mt-1 ms-5 me-5">
                                                            <p id={`post${post.post_id}`} className="mt-2 mb-1 pb-2 fw-bolder">{post.content}</p>
                                                        </div>
                                                        {/* EDIT POST */}
                                                        <div className="user-post">
                                                        <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
                                                            <form
                                                            className="card card-block card-stretch"
                                                            id={`editPostForm${post.post_id}`}
                                                            action=""
                                                            style={{ display: "none" }}
                                                            onSubmit={handleEditPostSubmit}>
                                                            <textarea
                                                                className="form-control rounded"
                                                                type="text"
                                                                defaultValue={post.content}
                                                                id={`editPostInput${post.post_id}`}
                                                                onChange={() =>
                                                                    handleEditPost(post.post_id)
                                                                }
                                                            />

                                                            <br />

                                                            <div className="w-100 d-flex">
                                                                <input
                                                                type="file"
                                                                id="file"
                                                                onChange={(e) =>
                                                                    setFile(e.target.files[0])
                                                                }
                                                                />
                                                                <button
                                                                className="btn btn-outline-secondary border w-25 me-2"
                                                                type="submit">
                                                                Update
                                                                </button>
                                                                <button
                                                                className="btn btn-primary w-25"
                                                                onClick={() => {
                                                                    canclePostEdit(post.post_id);
                                                                }}
                                                                type="button">
                                                                Cancle
                                                                </button>
                                                            </div>
                                                            </form>
                                                        </div>
                                                        </div>
                                                        {/* IMAGE POST */}
                                                        {/* <div className="row-span-md-1 justify-content-center">
                                                        <img
                                                            id={`imgPost${post.post_id}`}
                                                            className="img-thumnail rounded w-100"
                                                            src={require(`../images/${post.post_image}`)}
                                                            alt=""
                                                        />

                                                        </div> */}
                                                    </>
                                                    ) : (
                                                    // POPUP FORM POST
                                                    <>
                                                        {/* CONTENT POST */}
                                                        {/* <div className="mt-3">
                                                            <p id={`post${post.post_id}`} className="mt-3 mb-4 pb-2">{post.content}</p>
                                                        </div> */}
                                                        {/* EDIT POST */}
                                                        <div className="user-post">
                                                        <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
                                                            <form
                                                            className="card card-block card-stretch"
                                                            id={`editPostForm${post.post_id}`}
                                                            action=""
                                                            style={{ display: "none" }}
                                                            onSubmit={handleEditPostSubmit}>
                                                            <textarea
                                                                className="form-control rounded"
                                                                type="text"
                                                                defaultValue={post.content}
                                                                id={`editPostInput${post.post_id}`}
                                                                onChange={() =>
                                                                handleEditPost(post.post_id)
                                                                }
                                                            />

                                                            <br />

                                                            <div className="w-100 d-flex">
                                                                <input
                                                                type="file"
                                                                id="file"
                                                                onChange={(e) =>
                                                                    setFile(e.target.files[0])
                                                                }
                                                                />
                                                                <button
                                                                className="btn btn-outline-secondary border w-25 me-2"
                                                                type="submit">
                                                                Update
                                                                </button>
                                                                <button
                                                                className="btn btn-primary w-25"
                                                                onClick={() => {
                                                                    canclePostEdit(post.post_id);
                                                                }}
                                                                type="button">
                                                                Cancle
                                                                </button>
                                                            </div>
                                                            </form>
                                                        </div>
                                                        </div>
                                                        {/* OLD IMAGE POST */}
                                                        <div className="row-span-2 row-span-md-1 justify-content-center">
                                                        <hr />
                                                        {/* {post.post_image !== "null" ? (
                                                            <p
                                                            id={`post${post.post_id}`}
                                                            className="mt-3 mb-4 pb-2">
                                                            {post.content}
                                                            </p>
                                                        ) : (
                                                            <img
                                                            className="rounded-circle img-fluid"
                                                            width={"60px"}
                                                            src={require(`../images/profile.jpg`)}
                                                            alt=""
                                                            />
                                                        )} */}

                                                        {/* <img id={`imgPost${post.post_id}`}  className="img-thumnail rounded w-100" src={require(`../images/${post.post_image}`)} alt='' /> */}
                                                        </div>
                                                    </>
                                                    )}

                                                    {/* LIKE AND COMMENT ICON */}

                                                    <div className="comment-area p-3">
                                                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                        <div className="like-block position-relative d-flex align-items-center">
                                                            <div className="d-flex align-items-center">
                                                            <div className="like-data">
                                                                <div className="dropdown">
                                                                {/* BUTTON LIKE */}
                                                                {likes.map((like, index_like) => {
                                                                    if (
                                                                    like.user_id === current_ID &&
                                                                    like.post_id === post.post_id
                                                                    ) {
                                                                    return (flagLike = true);
                                                                    }
                                                                })}

                                                                {flagLike === true ? (
                                                                    <form
                                                                    action=""
                                                                    onSubmit={removeLikePost}>
                                                                    <button
                                                                        className="border-0 bg-transparent"
                                                                        onClick={() =>
                                                                        handleLikePost(post.post_id)
                                                                        }>
                                                                        <AiFillLike className="fs-3 text-primary" />
                                                                        {/* LIKE NUMBER */}
                                                                    </button>
                                                                    </form>
                                                                ) : (
                                                                    <form action="" onSubmit={likePost}>
                                                                    <button
                                                                        className="border-0 bg-transparent"
                                                                        onClick={() =>
                                                                        handleLikePost(post.post_id)
                                                                        }>
                                                                        <AiOutlineLike className="fs-3 text-light" />
                                                                        {/* LIKE NUMBER */}
                                                                    </button>
                                                                    </form>
                                                                )}
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    <hr />
                                                    {/* COMMENT CONTAINER */}
                                                    {comments.map((comment, index_comment) => {
                                                        if (comment.post_id == post.post_id) {
                                                        return (
                                                            <div
                                                            className="card card-block card-stretch"
                                                            key={index_comment}>
                                                            <div className="card-body">
                                                                <div className="user-post-data">
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="me-2">
                                                                    <img
                                                                        src="/images/user/02.jpg"
                                                                        width={"60px"}
                                                                        alt="userimg"
                                                                        className="rounded-circle img-fluid"
                                                                    />
                                                                    </div>
                                                                    <div className="w-100">
                                                                    <div className="d-flex justify-content-between">
                                                                        <div className="mt-1">
                                                                        <h5 className="mb-0 d-inline-block">
                                                                            {comment.first_name}
                                                                        </h5>
                                                                        <p
                                                                            className="mb-0 text-primary"
                                                                            style={{ fontSize: "8px" }}>
                                                                            {comment.comment_created_at}
                                                                        </p>
                                                                        </div>
                                                                        {/* TOOLS COMMENT  */}
                                                                        {comment.user_id ==
                                                                        current_ID ? (
                                                                        <div className="card-post-toolbar">
                                                                            <div className="dropdown">
                                                                            <span
                                                                                className="dropdown-toggle"
                                                                                data-bs-toggle="dropdown"
                                                                                aria-haspopup="true"
                                                                                aria-expanded="false"
                                                                                role="button">
                                                                                <i className="ri-more-fill" />
                                                                            </span>
                                                                            <div className="dropdown-menu m-0 p-0">
                                                                                <a
                                                                                className="dropdown-item p-3"
                                                                                href="#">
                                                                                <button
                                                                                    className="d-flex text-start  border-0 bg-transparent"
                                                                                    onClick={() => {
                                                                                    deleteComment(
                                                                                        comment.comment_id
                                                                                    );
                                                                                    }}>
                                                                                    <AiOutlineDelete className="fs-4" />
                                                                                    <div className="data ms-2">
                                                                                    <h6>Delete</h6>
                                                                                    </div>
                                                                                </button>
                                                                                </a>
                                                                                <a
                                                                                className="dropdown-item p-3"
                                                                                href="#">
                                                                                <button
                                                                                    className="d-flex text-start align-items-top border-0 bg-transparent"
                                                                                    id={`editCommentBTN${comment.comment_id}`}
                                                                                    onClick={() => {
                                                                                    editComment(
                                                                                        comment.comment_id
                                                                                    );
                                                                                    }}>
                                                                                    <AiOutlineEdit className="fs-4" />
                                                                                    <div className="data ms-2">
                                                                                    <h6>Edit</h6>
                                                                                    </div>
                                                                                </button>
                                                                                </a>
                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                                        ) : post.user_id ==
                                                                        current_ID ? (
                                                                        <div className="card-post-toolbar">
                                                                            <div className="dropdown">
                                                                            <span
                                                                                className="dropdown-toggle"
                                                                                data-bs-toggle="dropdown"
                                                                                aria-haspopup="true"
                                                                                aria-expanded="false"
                                                                                role="button">
                                                                                <i className="ri-more-fill" />
                                                                            </span>
                                                                            <div className="dropdown-menu m-0 p-0">
                                                                                <a
                                                                                className="dropdown-item p-3"
                                                                                href="#">
                                                                                <button
                                                                                    className="d-flex text-start  border-0 bg-transparent"
                                                                                    onClick={() => {
                                                                                    deleteComment(
                                                                                        comment.comment_id
                                                                                    );
                                                                                    }}>
                                                                                    <AiOutlineDelete className="fs-4" />
                                                                                    <div className="data ms-2">
                                                                                    <h6>Delete</h6>
                                                                                    </div>
                                                                                </button>
                                                                                </a>
                                                                                <a
                                                                                className="dropdown-item p-3"
                                                                                href="#">
                                                                                <button
                                                                                    className="d-flex text-start align-items-top border-0 bg-transparent"
                                                                                    id={`editCommentBTN${comment.comment_id}`}
                                                                                    onClick={() => {
                                                                                    editComment(
                                                                                        comment.comment_id
                                                                                    );
                                                                                    }}>
                                                                                    <AiOutlineEdit className="fs-4" />
                                                                                    <div className="data ms-2">
                                                                                    <h6>Edit</h6>
                                                                                    </div>
                                                                                </button>
                                                                                </a>
                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                                        ) : null}
                                                                    </div>
                                                                    </div>
                                                                    {/* COMMENT CONTENT */}
                                                                </div>
                                                                {/* EDIT COMMENT */}
                                                                <div className="comment-data-block ms-3">
                                                                    <div className="comment-data-block ms-3">
                                                                    <div className="mt-3">
                                                                        <p
                                                                        className="mb-0"
                                                                        id={`comment${comment.comment_id}`}>
                                                                        {comment.comment_content}
                                                                        </p>
                                                                    </div>
                                                                    <div className="d-flex flex-wrap align-items-center comment-activity border-top">
                                                                        <p className="text-primary-emphasis m-1">
                                                                        like
                                                                        </p>
                                                                        <p className="text-primary-emphasis m-1">
                                                                        reply
                                                                        </p>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                                <form
                                                                className="comment-text"
                                                                id={`editCommentForm${comment.comment_id}`}
                                                                action=""
                                                                style={{ display: "none" }}
                                                                onSubmit={handleEditCommentSubmit}>
                                                                {/* COMMENT INPUT */}
                                                                <div className="row">
                                                                    <div className="col-lg-8">
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        defaultValue={
                                                                        comment.comment_content
                                                                        }
                                                                        id={`editCommentInput${comment.comment_id}`}
                                                                        onChange={() =>
                                                                        handleEditComment(
                                                                            comment.comment_id
                                                                        )
                                                                        }
                                                                    />
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                    <div className="d-flex">
                                                                        <button
                                                                        type="submit"
                                                                        className="btn btn-outline-secondary border">
                                                                        Update
                                                                        </button>
                                                                        <button
                                                                        onClick={() => {
                                                                            cancleCommentEdit(
                                                                            comment.comment_id
                                                                            );
                                                                        }}
                                                                        className="btn btn-outline-secondary border"
                                                                        type="button">
                                                                        Comment
                                                                        </button>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                </form>
                                                            </div>
                                                            </div>
                                                        );
                                                        }
                                                    })}
                                                    <form
                                                        className="comment-text d-flex align-items-center mb-3 "
                                                        onSubmit={handleCreateComment}>
                                                        {/* COMMENT INPUT */}
                                                        <div className="col-lg-10">
                                                        <input
                                                            type="text"
                                                            id={post.post_id}
                                                            name={current_ID}
                                                            className="form-control rounded"
                                                            placeholder="Enter Your Comment"
                                                            onChange={handleChange}
                                                        />
                                                        </div>
                                                        <div className="col-lg-2 ms-3">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-outline-secondary border">
                                                            Comment
                                                        </button>
                                                        </div>
                                                    </form>
                                                    </div>
                                                </div>
                                                </div>
                                            );
                                            })}
                                        </div>
                                        
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


