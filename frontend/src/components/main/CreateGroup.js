import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useState , useEffect } from 'react';


export default function CreateGroup(props) {

  return (
    <>

{/*  */}
<div className="wrapper">
  <div id="content-page" className="content-page">
      <div className="container">
          <div className="row justify-content-center">
              <form  className='col-lg-8'  onSubmit={props.handleSubmit}>
                  <div className='col-lg-12 text-center'>

                    <div class="m-3 text-center">
                        <h3 className='fw-bolder'> Create Group </h3>
                    </div>
                    <div class="m-3">
                        <input className='form-control'  name="title" placeholder="Group Title" type="text" id="text" value={props.text} onChange={(e) => props.setText(e.target.value)} />
                    </div>
                    {/* <div class="mb-3">
                        <input name="description" required placeholder="Group Description"  type="text" id="text" value={props.group_description} onChange={(e) => props.setGroupDescription(e.target.value)} />
                    </div> */}
                    <div class="m-3">
                        <input className='form-control' type="file"  name="img" id="file" accept="image/*"  onChange={(e) => props.setFile(e.target.files[0])}/>
                    </div>
                    <button className="btn row" style={{backgroundColor : 'rgba(80,181,255,.1)'}}>Add Group</button>

                  </div>
              </form>
          </div>
      </div>
  </div>
</div>


</>
  )
}
////////////////
