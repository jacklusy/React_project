import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../body/Footer';
import LeftSidebar from '../body/LeftSidebar';
import RightSidebar from '../body/RightSidebar';
import Navbar from '../body/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';



const Group = () => {

  const current_ID = JSON.parse(localStorage.getItem('Id'));

  const [groups, setGroups] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [acceptedMembers, setAcceptedMembers] = useState([]);


  useEffect(() => {
    getGroups();
    getPendingMempers();
    getAcceptedMempers();

  }, [])


  // لعرض كل الجروبات في الموقع

  function getGroups() {
    axios.get(`http://localhost/React/React_project/backend/groups.php/`)
      .then(response => {
        console.log(response.data)
        setGroups(response.data);

      })
  }


// To add a member to a group

  const AddToGroup = (groupId) => {
    let inputs = { user_id: current_ID, group_id: groupId };
    axios.post(`http://localhost/React/React_project/backend/membersGroup.php/save`, inputs)
      .then((respone) => {
        console.log(respone.data);
        getGroups();
        getPendingMempers();

        // getFriendsRequest();
      })
  }
  //للجروبات pending لعرض كل طلبات المستخدم اللي حالتهم 
  const getPendingMempers = () => {

    axios.get(`http://localhost/React/React_project/backend/getPendingMember.php/${current_ID}`)
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

  //للجروبات accepted لعرض كل طلبات المستخدم اللي حالتهم 
  const getAcceptedMempers = () => {

    axios.get(`http://localhost/React/React_project/backend/getAcceptedMember.php/${current_ID}`)
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

  // لحذب طلب الاضافة 
  const removeRequest = (GroupId) => {
    let inputs = { user_id: current_ID, group_id: GroupId };
    axios.put(`http://localhost/React/React_project/backend/getPendingMember.php/edit`, inputs)
      .then((respone) => {
        console.log(respone.data);
        getGroups();
        getPendingMempers();
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

          <div className="header-for-bg">
            <div className="background-header position-relative">
              <img src="/images/page-img/profile-bg7.jpg" classname="img-fluid w-100" style={{ width: '100%' }} alt="header-bg" />
              <div className="title-on- header">
                <div className="data-block">
                  <h2>Groups</h2>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary d-block w-100"><i className="ri-add-line pe-2" />Create New Group</button>

          <div id="content-page" className="content-page">
            <div className="container">
              <div className="d-grid gap-3 d-grid-template-1fr-19">



                {groups.filter(function (ele) {
                  if (ele.user_id === current_ID) {
                    return false;
                  } // skip

                  return true;
                }).map((element, index) => (



                  <div className="card mb-0">
                    <div className="top-bg-image">
                      <img src="/images/page-img/profile-bg1.jpg" className="img-fluid w-100" alt="group-bg" />
                    </div>
                    <div className="card-body text-center">
                      <div className="group-icon">
                        <img src={require(`../images/${element.group_image}`)} alt="profile-img" className="rounded-circle img-fluid avatar-120" />
                      </div>
                      <div className="group-info pt-3 pb-3">
                        <h4>{element.group_name}<a href="../app/group-detail.html"></a></h4>
                        <p>Lorem Ipsum datcccccccccccca</p>
                      </div>
                      <div className="group-details d-inline-block pb-3">
                        <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                          <li className="pe-3 ps-3">
                            <p className="mb-0">Post</p>
                            <h6>14</h6>
                          </li>
                          <li className="pe-3 ps-3">
                            <p className="mb-0">Member</p>
                            <h6>320</h6>
                          </li>
                          <li className="pe-3 ps-3">
                            <p className="mb-0">Visit</p>
                            <h6>157.4k</h6>
                          </li>
                        </ul>
                      </div>
                      {/* <div className="group-member mb-3">
                      <div className="iq-media-group">
                        <a href="#" className="iq-media">
                          <img className="img-fluid avatar-40 rounded-circle" src="/images/user/05.jpg" alt="" />
                        </a>
                        <a href="#" className="iq-media">
                          <img className="img-fluid avatar-40 rounded-circle" src="/images/user/06.jpg" alt="" />
                        </a>
                        <a href="#" className="iq-media">
                          <img className="img-fluid avatar-40 rounded-circle" src="/images/user/07.jpg" alt="" />
                        </a>
                        <a href="#" className="iq-media">
                          <img className="img-fluid avatar-40 rounded-circle" src="/images/user/08.jpg" alt="" />
                        </a>
                        <a href="#" className="iq-media">
                          <img className="img-fluid avatar-40 rounded-circle" src="/images/user/09.jpg" alt="" />
                        </a>
                        <a href="#" className="iq-media">
                          <img className="img-fluid avatar-40 rounded-circle" src="/images/user/10.jpg" alt="" />
                        </a>
                      </div>
                    </div> */}
                      {(() => {
                        if (pendingMembers.includes(element.group_id) || acceptedMembers.includes(element.group_id)) {
                          if (pendingMembers.includes(element.group_id)) {
                            return (
                              <td>
                                <Link>
                                  <Button variant="primary" onClick={() => removeRequest(element.group_id)}>remove request</Button>
                                </Link>
                              </td>
                            )
                          }
                          if (acceptedMembers.includes(element.group_id)) {
                            return (
                              <td>

                                <Link to={`/groups/${element.group_id}/show`}>
                                  <Button variant="primary">show</Button>
                                </Link>

                              </td>
                            )
                          }
                        } else {
                          return (

                            
                            <td>
                              <Link>
                                <Button variant="primary" className="btn btn-primary d-block w-100" onClick={() => AddToGroup(element.group_id)}>Join</Button>
                                
                              </Link>
                            </td>
                            
                          )
                        }
                      })()}
                    </div>
                    {/* <a href='/GroupDetails'>
                      <button type="submit" className="btn btn-primary d-block w-100">Join</button>
                    </a> */}

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


      </div>

      <Footer />

    </>
  );
}

export default Group



