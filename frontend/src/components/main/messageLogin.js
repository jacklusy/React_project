
import React from 'react'

const ErrorMessage = () => {
    return (

        <div className="wrapper v-100 w-100">
          <section className="sign-in-page container">
    
            <div className="container p-0">
              <div className="row no-gutters">
    
    
                <div className="col-md-6 text-center pt-5">
                  <div className="sign-in-detail text-white">
                    <div className="sign-slider overflow-hidden ">
                      <ul className="swiper-wrapper list-inline m-0 p-0 ">
                        <li className="swiper-slide">
                          <img src="./images/logo4.png" className="img-fluid mb-4" alt="logo" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
    
                <div className="col-md-6 bg-white pt-5 pt-5 pb-lg-0 pb-5" >
                  <div className="sign-in-from" style={{padding:'15rem 0 0'}}>
                    <h><b>To access this feature, it is necessary to log in first.</b> Please enter your credentials to proceed. Without logging in, this feature cannot be accessed for security reasons. We appreciate your cooperation and understanding in ensuring the safety and privacy of our users.</h>
    
                    <form className="mt-4">
                      <div className="row justify-content-center" >
                        <a href='/' type="submit" className="col-lg-2 btn btn-primary me-1">Log in</a>
                        <a href='/Register' type="submit" className="col-lg-2 btn btn-primary">Register</a>
                      </div>
                    </form>
    
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        // hello
        // hello
        // hello
      );
}

export default ErrorMessage