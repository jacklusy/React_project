import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useState , useEffect } from 'react';


export default function CreateGroup(props) {

  return (
    <>

{/*  */}
<div id= "form">

    {/*  Button Add to Group */}
      <button className="BtnAdd"> Create Group </button>

      <br />
      <br />
      <br />


      
       {/*  Form Add to Group */}

       <section className="section_form">
       <form id="consultation-form" className="feed-form" onSubmit={props.handleSubmit}>


         <input  name="title" placeholder="Group Title" type="text" id="text" value={props.text} onChange={(e) => props.setText(e.target.value)} />
         <input name="description" required placeholder="Group Description"  type="text" id="text" value={props.group_description} onChange={(e) => props.setGroupDescription(e.target.value)} />
        <input type="file"  name="img" id="file" accept="image/*"  onChange={(e) => props.setFile(e.target.files[0])}/>




         <button className="button_submit">Add Group</button>
       </form>
     </section>
    </div>
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
      <div>
        <label htmlFor="text">group description</label>
        <input
          type="text"
          id="text"
          value={props.group_description}
          onChange={(e) => props.setGroupDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="file">File</label>
        <input
          type="file"
          id="file"
          onChange={(e) => props.setFile(e.target.files[0])}
        />
      </div>
      <button type="submit">Submit</button>
    </form>

    </div> */}
    
    </>
  )
}
////////////////
