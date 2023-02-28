import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LeftSidebar = () => {
  const navigate = useNavigate();
  const handleClick=()=>{
    localStorage.clear();
    toast.success('successfully logout 🙁')
    navigate('/')
}
  return (
    <div className="iq-sidebar  sidebar-default ">
          <div id="sidebar-scrollbar">
            <nav className="iq-sidebar-menu">
              <ul id="iq-sidebar-toggle" className="iq-menu">

                <li className="active">
                  <a href="/EditProfile/:id/edit" className=" ">
                    <i className="las la-user" /><span>Edit Profile</span>
                  </a>
                </li>
               
                <li className="=">
                  <a href="/Group" className=" ">
                    <i className="las la-users" /><span>Group</span>
                  </a>
                </li>
                
                <li className=" ">
                  <a href="/ProfileForum" ><i className="ri-focus-2-line" /><span>Profile Forum</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
                </li>

                <li className="">
                  <a href="/Chat" ><i className="ri-pages-line" /><span>Friends</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
                </li>

                <li className=" " onClick={handleClick}>
                  <a  className>
                    <i className="ri-login-box-line"  /><span>Logout</span>
                  </a>
                </li>
                
              </ul>
            </nav>
            <div className="p-5" />
          </div>
        </div>
  )
}

export default LeftSidebar