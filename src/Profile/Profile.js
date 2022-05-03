import React from 'react';
import UserArticles from './UserArticles.js';
import Form from './Form.js';
import { useState } from 'react';
import Upload from './Upload.js'

function Profile(props) {

    const uID = localStorage.getItem("userID");
    const [show, setShow]= useState(false);
    const userName = localStorage.getItem("userName")

    const hi = props.userListData[uID]["BackgroundPic"]

    return (

        <div>
            {/* <img src = {props.userListData[uID]["BackgroundPic"]} class = "a"/> */}
           

            {/* <img src = {hi} /> */}

            <button onClick={() => setShow(true)}> Add Clothing </button><br/><br/>

            <label>profile</label>
            <Upload type = "profile"/> <br/>

            <label>background</label>
            <Upload type = "background"/>

            <h1> Hi {userName}!</h1>

            {show==true && <Form
            userListData = {props.userListData} 
            articleListData = {props.articleListData} 
            loading = {props.isLoading}
            />}
            
             <UserArticles
             currentUser = {uID}
             userListData = {props.userListData} 
             articleListData = {props.articleListData}
             loading = {props.loading}
            />  
            
        </div>
    );
}

export default Profile;