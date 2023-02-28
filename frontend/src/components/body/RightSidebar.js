import React from 'react'
import axios from 'axios';
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RightSidebar() {


      const id = JSON.parse(localStorage.getItem('Id'));

      const [users,setUsers] = useState([]);

      useEffect(()=>{
          getUsers();

      },[]);
      // لعرض جميع المستخدمين في الموقع
      const getUsers = () => {

        axios.get("http://localhost/React/React_Project/backend/friends.php/")
        .then((respone)=>{
            setUsers(respone.data)
            console.log(respone.data);
        })
    }
    return (
          <div className="right-sidebar-mini right-sidebar">
              <div className="right-sidebar-panel p-0">
                <div className="card shadow-none">
                  <div className="card-body p-0">
                    <div className="media-height p-3" data-scrollbar="init">
                      {users.filter(function(elem) {
                          // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                          if (elem.user_id === id) {
                            return false; // skip
                          }
                        return true;
                        }).map((ele,index)=>{
                          return(
                              <a href='/Chat' >
                                <div className="d-flex align-items-center mb-4">
                                  <div className="iq-profile-avatar status-online">
                                    {/* <img className="rounded-circle avatar-50" src={require(`../../components/images/${ele.image}`)} alt="" /> */}
                                  </div>
                                  <div className="ms-3">
                                    <h6 className="mb-0">{ele.first_name}</h6>
                                    <p className="mb-0">{ele.email} </p>
                                  </div>
                                </div>
                              </a>
                        )})}
                </div>
              </div>
            </div>
          </div>
        </div> 
 
      )
}

export default RightSidebar

