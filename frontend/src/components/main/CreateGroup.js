import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';


export default function CreateGroup(props) {

  return (
    <>
      <div>

        <div id="content-page" className="content-page">
          <div className="container">
            <div className="d-grid gap-3 d-grid-template-1fr-19">


              <div className="card mb-0">
                <div className="top-bg-image">
                  <img src="/images/page-img/profile-bg1.jpg" className="img-fluid w-100" alt="group-bg" />
                </div>
                <div className="card-body text-center">
                  <div className="group-icon">
                    <img src={require('../images/groupDefault.png')} className="rounded-circle img-fluid avatar-135" alt="group-bg" />
                  </div>

                  <form id="consultation-form" className="feed-form" onSubmit={props.handleSubmit}>


                    <input name="title" placeholder="Group Title" type="text" id="text" value={props.text} onChange={(e) => props.setText(e.target.value)} />
                    <input type="file" name="img" id="file" accept="image/*" onChange={(e) => props.setFile(e.target.files[0])} />




                    <button className="btn btn-primary">Add Group</button>
                  </form>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>


      {/*  */}




      {/*  */}
      {/* <h1>createGroup</h1>
    <div className='form-wrapper mb-5' >
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="text">Text</label>
        <input
          type="text"
          id="text"
          value={props.text}
          onChange={(e) => props.setText(e.target.value)}
        />
      </div>
  </div>
</div>

    </div> */}

    </>
  )
}
////////////////
