import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import loginImg from './logo-full.png'
import 'react-toastify/dist/ReactToastify.css';
// import {reducer as toastrReducer} from 'react-redux-toastr'

// import toastr from "react-redux-toastr";

const Login = () => {

  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, passwordUpdate] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);



  useEffect(() => {
    getUser()
  }, []);

// console.log(email);
// console.log(password);
// console.log(users);



  const ProceedLogin = (e) => {
    e.preventDefault();
    for (const user of users) {
      if (email.length === 0 || password.length === 0) {
        setError(true)
      } else {
        if (user.email === email && user.password === password && Object.entries(email).length > 0 && Object.entries(password).length > 0) {
          localStorage.setItem('Id', JSON.stringify(user.id));
          localStorage.setItem('Email', JSON.stringify(user.email));
          localStorage.setItem('Password', JSON.stringify(user.password));
          let isloggedin = JSON.stringify(true)
          sessionStorage.setItem('isloggedin', isloggedin);
          toast.success('Welcome User ❤️');
          window.location.assign('/home'); ;
          return;
        }

      }
    }
    let isloggedin = JSON.stringify(false)
    sessionStorage.setItem('isloggedin', isloggedin);

    toast.error('Wrong email or password');
    console.log("Wrong email or password");



  }
  
      const getUser = ()=> {
        axios.get('http://localhost/React/React_Project/backend/log_reg.php').then(function(response){
            setUsers(response.data)
            console.log(response.data);
        })
    }

  return (

    <div className="wrapper">
      <section className="sign-in-page">

        <div className="container p-0">
          <div className="row no-gutters">

           
            <div className="col-md-6 text-center pt-5">
              <div className="sign-in-detail text-white">
                <div className="sign-slider overflow-hidden ">
                  <ul className="swiper-wrapper list-inline m-0 p-0 ">
                    <li className="swiper-slide">
                      <img src="./images/send-text.png" className="img-fluid mb-4" alt="logo" />
                      <h4 className="mb-1 text-white">Find new friends</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6 bg-white pt-5 pt-5 pb-lg-0 pb-5">
              <div className="sign-in-from">
                <h1 className="mb-0">Sign in</h1>

                <form className="mt-4">
                  <div className="form-group">


                    <input type="email" className="form-control mb-0" id="exampleInputEmail1" placeholder="Email"
                      value={email} onChange={e => setEmail(e.target.value)} name="email"
                    />
                    {error && email.length === 0 &&
                      <label style={{ color: 'red' }}>Email is required</label>}
                    {email.length > 0 && !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/.test(email)) && (
                      <label style={{ color: 'red' }}>This is not a valid email</label>
                    )}
                  </div>


                  <div className="form-group">
                    {/* <label className="form-label" htmlFor="exampleInputPassword1">Password</label> */}
                    <input type="password" className="form-control mb-0" id="exampleInputPassword1" placeholder="Password"
                      value={password} onChange={e => passwordUpdate(e.target.value)} name="password"
                    />
                    {error && password.length === 0 ?
                      <label style={{ color: 'red' }}>Password is required</label> : ""}
                  </div>


                  <div className="d-inline-block w-100">
                    <div className="form-check d-inline-block mt-2 pt-1">
                      <input type="checkbox" className="form-check-input" id="customCheck11" />
                      <label className="form-check-label" htmlFor="customCheck11">Remember Me</label>
                    </div>
                    <button onClick={ProceedLogin} type="submit" className="btn btn-primary float-end">Log in</button>
                  </div>
                  <div className="sign-info">
                    <span className="dark-color d-inline-block line-height-2">Don't have an account? <Link to={'/register'}> Sign up</Link></span>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login
