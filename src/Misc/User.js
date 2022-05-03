import{useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function User(props) {
// imports all the userData data 
// displays user data the corresponds to path


    //Store data from users in userData variable
    const userData = props.userListData;
   
    //Get Username from path
    const account = useParams().account;


    return (
      
    <div className="App">
    {props.loading && <p>loading</p>}
     {!props.loading &&

      <div>
        {console.log(userData)}
        <p>Username: {userData[account]['username']}</p> 
        <p>Year Purchased: {userData[account]['yearpurchased']}</p>
        <p>Clothing Type: {userData[account]['clothingtype']}</p>
        {console.log(props.loading)}
     </div> }
    </div>
    )
}
