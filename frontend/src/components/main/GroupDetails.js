import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../body/Footer';
import LeftSidebar from '../body/LeftSidebar';
import Navbar from '../body/Navbar';
import RightSidebar from '../body/RightSidebar';
import {
    AiOutlineLike,
    AiOutlineComment,
    AiOutlineDelete,
    AiOutlineEdit,
    AiFillLike,
} from "react-icons/ai";

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


    const [inputs, setInputs] = useState("")
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        getDataGroups();
        getUsersGroup();
        getPendingRequest();
        getMyAcceptrdGroups();
        getGroups();
        getPendingMempers();
        getAcceptedMempers();

        getPosts();
        getComments();

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

    //////////////////////// post /////////////////////////

    useEffect(() => {
        getPosts();
        getComments();
    }, [])


    // Posts


    function getPosts() {


        axios.get(`http://localhost/React/React_project/backend/posts.php`)

            .then(response => {
                setPosts(response.data);
                getComments();
                getLikes();
            })
    }

    const handleImagePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("post", inputs);
        formData.append("user_id", current_ID);
        formData.append("file", file);
        try {
            const response = await axios.post(
                "http://localhost/React/React_Project/backend/posts.php/", formData
            );
            console.log(response.data,'test jack');
        } catch (error) {
            console.error(error);
        }
    };

    const handlePost = (e) => {
        const value = e.target.value;
        setInputs(value)
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const post_id = e.target.id;
        const user_id = e.target.name;
        setInputs({ 'comment_content': value, 'post_id': post_id, 'user_id': user_id })
    }



    const editPost = (id) => {
        document.getElementById(`post${id}`).style.display = 'none';
        document.getElementById(`editPostForm${id}`).style.display = 'block';
        document.getElementById(`editPostBTN${id}`).style.display = 'none';
    }

    const handleEditPost = (id) => {
        const post_id = id;
        const value = document.getElementById(`editPostInput${id}`).value;
        setInputs({ 'post_content': value, 'post_id': post_id })
    }

    const handleEditPostSubmit = async (e) => {
        e.preventDefault();

        const formEditData = new FormData();

        formEditData.append("post_content", inputs['post_content']);
        formEditData.append("post_id", inputs['post_id']);
        formEditData.append("file", file);

        console.log(formEditData);

        try {
            const response = await axios.post(
                "http://localhost/React/React_Project/backend/postEdit.php/", formEditData
            );
            console.log(response.data);
            window.location.assign('/home');
        } catch (error) {
            console.error(error);
        }
    };



    const deletePost = (id) => {
        axios.delete(`http://localhost/React/React_Project/backend/posts.php/${id}`).then(function (response) {
        })
        window.location.assign('/home');
    }


    // Comments


    function getComments() {
        axios.get(`http://localhost/React/React_Project/backend/comments.php/`)
            .then(response => {
                setComments(response.data);
            })
    }

    const handleCreateComment = (e) => {
        e.preventDefault();
        console.log(inputs)
        axios.post('http://localhost/React/React_Project/backend/comments.php/', inputs).then(
            // window.location.assign('/home')
        )
    }

    const deleteComment = (id) => {
        axios.delete(`http://localhost/React/React_Project/backend/comments.php/${id}`).then(function (response) {
            getComments();
        })

    }

    const editComment = (id) => {
        document.getElementById(`comment${id}`).style.display = 'none';
        document.getElementById(`editCommentForm${id}`).style.display = 'block';
        document.getElementById(`editCommentBTN${id}`).style.display = 'none';
    }

    const handleEditComment = (id) => {
        const comment_id = id;
        const value = document.getElementById(`editCommentInput${id}`).value;
        setInputs({ 'comment_content': value, 'comment_id': comment_id })
    }

    const handleEditCommentSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost/React/React_Project/backend/comments.php/', inputs).then(
            // window.location.assign('/')
        )
    }

    const foucsOnComment = (id) => {
        document.getElementById(id).focus();
    }

    const canclePostEdit = (id) => {
        document.getElementById(`post${id}`).style.display = 'block';
        document.getElementById(`editPostForm${id}`).style.display = 'none';
        document.getElementById(`editPostBTN${id}`).style.display = 'inline-block';
        document.getElementById(`imgPost${id}`).style.display = 'block';
    }

    const cancleCommentEdit = (id) => {
        document.getElementById(`comment${id}`).style.display = 'block';
        document.getElementById(`editCommentForm${id}`).style.display = 'none';
        document.getElementById(`editCommentBTN${id}`).style.display = 'inline-block';
        window.location.assign('/home');


    }

    // Likes


    const getLikes = () => {

        axios.get(`http://localhost/React/React_project/backend/likes.php/`)
            .then(response => {
                setLikes(response.data);
            })
    }

    const handleLikePost = (id) => {
        const post_id = id;
        const user_id = current_ID;
        setInputs({ 'user_id': user_id, 'post_id': post_id })
    }

    const likePost = (e) => {
        e.preventDefault();
        console.log(inputs)

        axios.post('http://localhost/React/React_project/backend/likes.php/', inputs).then(

            getPosts()
        )
    }
    const removeLikePost = (e) => {
        e.preventDefault();
        console.log(inputs)
        axios.post('http://localhost/React/React_Project/backend/likeDelete.php/', inputs).then(
            getPosts()
        )
    }


    const photoUrl = inputs.image;
    // console.log(inputs);


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
                                            {/* POST FORM */}
                                            <form
                                                id="post-modal-data"
                                                onSubmit={handleImagePost}
                                                className="card card-block card-stretch ">
                                                <div className="card-header d-flex justify-content-between">
                                                    <div className="header-title">
                                                        <h4 className="card-title">Create Post</h4>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="user-img">
                                                            <img
                                                                src="/images/user/1.jpg"
                                                                alt="userimg"
                                                                className="avatar-60 rounded-circle"
                                                            />
                                                        </div>
                                                        <div
                                                            className="post-text ms-3 w-100 "
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#post-modal">
                                                            <input
                                                                type="text"
                                                                className="form-control rounded"
                                                                id={current_ID}
                                                                placeholder="Write jack here..."
                                                                style={{ border: "none" }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                                <div
                                                    className="modal fade"
                                                    id="post-modal"
                                                    tabIndex={-1}
                                                    aria-labelledby="post-modalLabel"
                                                    aria-hidden="true">
                                                    <div className="modal-dialog   modal-fullscreen-sm-down">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="post-modalLabel">
                                                                    Create Post
                                                                </h5>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-secondary"
                                                                    data-bs-dismiss="modal">
                                                                    <i className="ri-close-fill" />
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="user-img">
                                                                        <img
                                                                            src="/images/user/1.jpg"
                                                                            alt="userimg"
                                                                            className="avatar-60 rounded-circle img-fluid"
                                                                        />
                                                                    </div>
                                                                    <div className="post-text ms-3 w-100">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control rounded"
                                                                            id={current_ID}
                                                                            placeholder="Write something here..."
                                                                            style={{ border: "none" }}
                                                                            onChange={handlePost}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                                                    <li className="me-3 mb-md-0 mb-2">
                                                                        <input
                                                                            type="file"
                                                                            id="file"
                                                                            accept="image/*"
                                                                            onChange={(e) => setFile(e.target.files[0])}
                                                                        />
                                                                    </li>
                                                                </ul>
                                                                <hr />
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-primary d-block w-100 mt-3">
                                                                    Post
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            {/* //// END map post////// */}
                                            {/* //// END map post////// */}
                                            {/* //// END map post////// */}
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
                                                                        {!post.image ? (
                                                                            <img className="rounded-circle avatar-60" src={require('../images/default_user.jpeg')} alt="" />
                                                                        ) : (

                                                                            <img className="rounded-circle avatar-60" src={require(`../images/${post.image}`)} alt="" />

                                                                        )}

                                                                    </div>
                                                                    <div className="w-100">
                                                                        <div className="d-flex justify-content-between">
                                                                            <div>
                                                                                <h5 className="mb-0 d-inline-block">
                                                                                    {post.first_name}
                                                                                </h5>
                                                                                <p className="mb-0 text-primary">
                                                                                    {post.created_at}
                                                                                </p>
                                                                            </div>
                                                                            {post.user_id == current_ID ? (
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
                                                            {post.post_image !== "a" ? (
                                                                <>
                                                                    {/* CONTENT POST */}
                                                                    <div className="mt-3">
                                                                        <p id={`post${post.post_id}`} className="mt-3 mb-4 pb-2">{post.content}</p>
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
                                                                    <div className="row-span-2 row-span-md-1 justify-content-center">
                                                                        <hr />

                                                                        <img
                                                                            id={`imgPost${post.post_id}`}
                                                                            className="img-thumnail rounded w-100"
                                                                            src={require(`../images/${post.post_image}`)}
                                                                            alt=""
                                                                        />
                                                                    </div>
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

                                                            <div className="comment-area mt-3">
                                                                <>
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
                                                                </>

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
                                                                                        className="comment-text mb-3"
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
                                                                    <div className="col-lg-2">
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
                                            {/* //// END map post////// */}
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
