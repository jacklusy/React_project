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

const Test = () => {

  const navigate = useNavigate();



  const [users, setUsers] = useState([]);


  const current_ID = JSON.parse(localStorage.getItem('Id'));

  useEffect(() => {
    getUser()
  }, []);



    
      const getUser = ()=> {
        axios.get('http://localhost/React/React_project/backend/new.php', current_ID).then(function(response){
            setUsers(response.data)
        })
    }

  return (

    <div>
        
    </div>

  );
}

export default Test
