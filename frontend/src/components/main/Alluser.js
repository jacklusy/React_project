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

const AllUser = () => {

  const navigate = useNavigate()
  const [inputs, setInputs] = useState({});
  const id = JSON.parse(localStorage.getItem('Id'));
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState([]);
  const [acceptrdFriends, setAcceptedFriends] = useState([]);
  const [pendingFriends, setpendingFriends] = useState([]);
  const [pendingRequest, setpendingRequest] = useState([]);
  const [requestFriends, setRequestFriends] = useState([]);
  const [friends, setfriends] = useState([]);
  const [requestFriend, setrequestFriend] = useState([]);
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
      .then(function (response) { });
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
      .then((respone) => {
        setUsers(respone.data)
        console.log(respone.data);
      })
  }



  //   عرض جميع طلبات الصداقة الذين تمت الموافقة عليهم
  const getFriendsAccepted = () => {

    axios.get(`http://localhost/React/React_Project/backend/friends.php/${id}`)
      .then((respone) => {
        console.log(respone.data);
        let friends = respone.data.map((ele) => {
          return ele.friend_id
        })
        console.log(friends);
        setfriends(friends);
        setAcceptedFriends(respone.data)
      })
  }

  // اللي بعثهم المستخدم pending عرض جميع طلبات الصداقة في حالة 
  const getFriendsPending = () => {

    axios.get(`http://localhost/React/React_Project/backend/acceptFriend.php/${id}`)
      .then((respone) => {
        console.log(respone.data);
        let pendingRequest = respone.data.map((ele) => {
          return ele.friend_id
        })
        setpendingRequest(pendingRequest);
        console.log(pendingRequest);
        setpendingFriends(respone.data)
      })
  }

  // عرض طلبات الصداقة الخاصة بالمستخدم واللي لسا ما وافق عليهم

  const getFriendsRequest = () => {

    axios.get(`http://localhost/React/React_Project/backend/friendRequests.php/${id}`)
      .then((respone) => {
        console.log(respone.data);
        let requestFriend = respone.data.map((ele) => {
          return ele.user_id
        })
        console.log(requestFriend);
        setrequestFriend(requestFriend);
        setRequestFriends(respone.data)
      })
  }

  //  pending وحالته بتكون friends  اضافة صديق جديد في جدول ال 
  const AddFriends = (friendId) => {
    let inputs = { user_id: id, friend_id: friendId };
    axios.post(`http://localhost/React/React_Project/backend/friends.php/save`, inputs)
      .then((respone) => {
        console.log(respone.data);
        getUsers();
        getFriendsPending();
        getFriendsRequest();
      })



  }

  // حذف الصداقة
  const removeFriend = (friendId) => {
    let inputs = { user_id: id, friend_id: friendId };
    axios.put(`http://localhost/React/React_Project/backend/removeFriends.php`, inputs)
      .then((respone) => {
        console.log(respone.data);
        getFriendsPending();
        getFriendsAccepted();

      })



  }


  const photoUrl = inputs.image;
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



                  {/* TOP NAV BAR */}
                  <div className="card">
                    <div className="card-body p-0">
                      <div className="user-tabing">
                        <ul className="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                          <li className="nav-item col-12 col-sm-3 p-0">
                            <a className="nav-link" href="#pills-friends-tab" style={{ colo: '#406b72' }} data-bs-toggle="pill" data-bs-target="#friends" role="button"> Friend Request</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>

                {/* PROFILE CONTENT */}
                <div className="col-sm-12">
                  <div className="card">
                    <h4 className='text-center text-white p-2' style={{ backgroundColor: '#406b72' }}>Add Friends</h4>
                    <div className="card-body">
                      <div className="friend-list-tab mt-2">
                        <div className="tab-content">
                          <div className="tab-pane fade active show" id="all-friends" role="tabpanel">
                            <div className="card-body p-0">
                              {/* Blog-Box1  */}
                              {users.filter(function (ele) {
                                // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                                if (ele.id === id) {
                                  return false; // skip
                                }
                                return true;
                              }).map((ele, index) => {
                                return (
                                  <div className="row justify-content-center">
                                    <div className="col-lg-12 m-1 border-bottom p-1 border-3">
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
                                            {(() => {
                                              if (pendingRequest.includes(ele.id) || friends.includes(ele.id) || requestFriend.includes(ele.id)) {
                                                if (friends.includes(ele.id)) {
                                                  return (
                                                    <Link>
                                                      <button className="dropdown-toggle btn text-white me-2" style={{ backgroundColor: '#406b72' }} onClick={() => removeFriend(ele.id)} id="dropdownMenuButton01" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                        <i className="ri-check-line me-1 text-white" />Remove friends
                                                      </button>
                                                    </Link>
                                                  )

                                                }


                                              } else {
                                                return (
                                                  <Link>
                                                    <button className="dropdown-toggle btn text-white me-2" style={{ backgroundColor: '#406b72' }} onClick={() => AddFriends(ele.id)} id="dropdownMenuButton01" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                      <i className="ri-check-line me-1 text-white" />add friends
                                                    </button>
                                                  </Link>
                                                )
                                              }
                                            })()}
                                          </div>
                                        </div>                                 
                                      </div>
                                    </div>
                                  </div>
                                )})}
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
          </div>
            <Footer />
        </div>
      </div>
    </div>
  );
}

export default AllUser