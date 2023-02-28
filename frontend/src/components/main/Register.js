import React , { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
 
  const navigate = useNavigate();


    const [first_name, firstnamechange] = useState("");
    const [last_name, lastnamechange] = useState("");
    const [email, emailchange] = useState("");
    const [password, passwordchange] = useState("");
    const [phone, phonechange] = useState("");
    const [error , setError] = useState(false);

    const handleSubmit =(e)=>{

      e.preventDefault(); 
       
      const inputs ={ first_name , last_name , email , password , phone}

     
      if (first_name.length===0 || last_name.length===0 || phone.length===0 || email.length===0 || password.length===0 || !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/.test(email)) )  {

        setError(true)
      }
      
      else{
   
      //console.log(inputs);
     axios.post('http://localhost/React/React_project/backend/log_reg.php', inputs ).then(function(response){
      console.log(response.data); 
      //console.log(response); 
     })

    toast.success('Account Created Successfully 👌');
     navigate('/');
    }}




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
                  <div style={{paddingTop: '5rem'}} className="sign-in-from  ">


                    <h1 className="mb-0">Sign Up</h1>
                    {/* <p>Sign Up To See Photos & Posts From Your Friends.</p> */}


                    <form className="mt-4">

                      <div className="form-group">
                        <input type="text" className="form-control mb-0"  placeholder=" First Name" 
                        name="first_name" value={first_name} onChange={e => firstnamechange(e.target.value)}
                        />
                         {error&&first_name.length===0?
                         <label style ={{color:'red'}}>Firstname is required</label>:""} 
                      </div>

                      <div className="form-group">
                        <input type="text" className="form-control mb-0"  placeholder="Last Name"
                         name="last_name" value={last_name} onChange={e => lastnamechange(e.target.value)}

                        />
                        {error&&last_name.length===0?
                        <label style ={{color:'red'}}>Lastname is required</label>:""}
                      </div>

                      <div className="form-group">
                        <input type="text" className="form-control mb-0"  placeholder="Phone Number" 
                         name="phone"  value={phone} onChange={e => phonechange(e.target.value)} 
                        />
                          {error && phone.length === 0 &&
                          <label style ={{color:'red'}}>Phone is required</label>}
                          {phone.length > 0 && !(/^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)) && (
                          <label style ={{color:'red'}}>Phone Number must be at least 10 numbers</label> 
                            )}
                      </div>

                      <div className="form-group">
                        <input type="email" className="form-control mb-0" placeholder="Email"
                        name="email" value={email} onChange={e => emailchange(e.target.value)}
                        />
                           {error && email.length === 0 &&
                            <label style ={{color:'red'}}>Email is required</label>}
                            {email.length > 0 && !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/.test(email)) && (
                            <label style ={{color:'red'}}>This is not a valid email</label> 
                   )}
                      </div>

                      <div className="form-group">
                        <input type="password" className="form-control mb-0"  placeholder="Password" 
                         name="password" value={password} onChange={e => passwordchange(e.target.value)}  
                        />
                          {error && password.length === 0 &&
                          <label style ={{color:'red'}}>Password is required</label>}
                          {password.length > 0 && !(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)) && (
                            <label style ={{color:'red'}}>This is not a valid password</label> 
                            
                        )}
                      </div>

                      <div className="d-inline-block w-100">
                        <div className="form-check d-inline-block mt-2 pt-1">
                          <input type="checkbox" className="form-check-input" id="customCheck1" />
                          <label className="form-check-label" htmlFor="customCheck1">I accept Terms and Conditions</label>
                        </div>


                        <button type="submit" onClick={handleSubmit}  className="btn btn-primary float-end">Sign Up</button>

                      </div>

                      <div className="sign-info">
                        <span className="dark-color d-inline-block line-height-2">Already Have Account ?<Link to={'/'}> Log in</Link></span>
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

export default Register
