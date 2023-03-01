import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


///////////////// body ///////////////

///////////////// main ////////////////
import Profile from "./components/main/Profile";
import Group from "./components/main/Group";
import Chat from "./components/main/Chat";
import EditProfile from "./components/main/EditProfile";
import Email from "./components/main/Email";
import GroupDetails from "./components/main/GroupDetails";
import ProfileForum from "./components/main/ProfileForum";
import Index from "./components/main/Index";
import 'react-toastify/dist/ReactToastify.css';
////////
//import Register from "./components/main/Register";
// import Test from "./components/main/Test";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';



import './assets/css/libs.min.css';
import './assets/css/socialv.css?v=4.0.0';
import './assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import './assets/vendor/remixicon/fonts/remixicon.css';
import './assets/vendor/vanillajs-datepicker/dist/css/datepicker.min.css';
import './assets/vendor/line-awesome/dist/font-awesome-line-awesome/css/all.min.css';
import './assets/vendor/line-awesome/dist/line-awesome/css/line-awesome.min.css';
import Login from "./components/main/Login";
import Register from "./components/main/Register";
import { ToastContainer } from "react-toastify";
import ErrorMessage from "./components/main/messageLogin";
import MyGroups from "./components/main/MyGroups";
//import Login from "./components/main/Login";



const App = () => {
  const isLoggedin = sessionStorage.getItem('isloggedin');
  let isLoggedIn = JSON.parse(isLoggedin);
  // console.log(isLoggedin);
  return (

    <div>
    <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
>
</ToastContainer>

<Router>
        {isLoggedIn ? (
          <Routes>
            <Route exact path="/home" element={<Index />} />

            <Route exact path="/Profile" element={<Profile />} />
            <Route exact path="/EditProfile/:id/edit" element={<EditProfile />} />
            <Route exact path="/ProfileForum" element={<ProfileForum />} />

            <Route exact path="/Group" element={<Group />} />
            <Route exact path="/Mygroups" element={<MyGroups />} />
            <Route exact path="/groups/:id/show" element={<GroupDetails />} />

            <Route exact path="/Chat" element={<Chat />} />
            <Route exact path="/Email" element={<Email />} />
            {/* <Route exact path="*" element={<Login />} /> */}

          </Routes>
        )
          :
          (
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/Register" element={<Register />} />

              <Route exact path="/home" element={<ErrorMessage />} />

              <Route exact path="/Profile" element={<ErrorMessage />} />
              <Route exact path="/EditProfile/:id/edit" element={<ErrorMessage />} />
              <Route exact path="/ProfileForum" element={<ErrorMessage />} />

              <Route exact path="/Group" element={<ErrorMessage />} />
              <Route exact path="/GroupDetails" element={<ErrorMessage />} />

              <Route exact path="/Chat" element={<ErrorMessage />} />
              <Route exact path="/Email" element={<ErrorMessage />} />
            </Routes>
          )
        }
      </Router> 
    </div>
  );
}

export default App

