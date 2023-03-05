import React from 'react'
import axios from 'axios';
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

function RightSidebar() {

  const id = JSON.parse(localStorage.getItem('Id'));

  const [users,setUsers] = useState([]);
  const [acceptrdFriends,setAcceptedFriends] = useState([]);  
  const [pendingRequest,setpendingRequest] = useState([]);
  const [friends,setfriends] = useState([]);
  const [requestFriend,setrequestFriend] = useState([]);

  useEffect(()=>{
      getUsers();
      getFriendsAccepted();

  },[]);

      // لعرض جميع المستخدمين في الموقع
      const getUsers = () => {

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

    return ( 
          <div className="right-sidebar-mini right-sidebar">
              <div className="right-sidebar-panel p-0">
                <div className="card shadow-none">
                  <div className="card-body p-0">
                    <div className="media-height" data-scrollbar="init">
                    <p className='row border-bottom border-dark py-2 px-3' style={{backgroundColor : 'rgba(80,181,255,.1)'}}>Frinds</p> 
                        {/* Blog-Box1  */}
                        {users.filter(function(ele) {
                                // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                                if (ele.id === id) {
                                    return false; // skip
                                }
                                return true;
                            }).map((ele,index)=>{
                                return(
                                    
                                    <div className="blogBtn ms-2 me-2">
                                    {(() => {
                                    if (pendingRequest.includes(ele.id) || friends.includes(ele.id) || requestFriend.includes(ele.id)){
                                        if(friends.includes(ele.id)){
                                            return (
                                                <a href='/Profile' >
                                                    <div className="d-flex align-items-center">
                                                        <div className="iq-profile-avatar status-online">
                                                            <img className="rounded-circle avatar-50" src={require(`../../components/images/${ele.image}`)} alt="" />
                                                        </div>
                                                        <div className="ms-3 me-3">
                                                        <h6 className="mb-0">{ele.first_name}</h6>
                                                        <p className="mb-0">{ele.email} </p>
                                                        </div>
                                                    </div>
                                                </a>

                                            )}}})()}
                                </div>
                        )})}
                    </div>
                </div>
              </div>
            </div>
          </div>
            
  );
}
 
   

export default RightSidebar

