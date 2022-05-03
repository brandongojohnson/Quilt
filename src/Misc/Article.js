import{useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from "firebase/database";
import {db} from "./firebase";

export default function Article(props) {
// imports all the userData data 
// displays user data the corresponds to path

    const articleData = props.articleListData;
    const userData = props.userListData;

    const {article} = useParams(null);
    const [newKeys, setNewKeys] = useState(null);

    var keys = null;

    const populate = () =>{
      keys = Object.keys(articleData[article]['users'])
      console.log(userData)
      console.log(articleData)
    }

    !props.loading && populate();

    return (
      
    <div className="App">

    {props.articleloading && <p>articleloading</p>}
     {!props.loading &&
      <div>
        {keys.map((userid,index)=>{
          return(
            
            <div key = {index}>
            <p>Username: {userData[articleData[article]['users'][userid]]['username']}</p>
            <p>Year Purchased: {userData[articleData[article]['users'][userid]]['yearpurchased']}</p> <br/>
            </div> 
          )
        })}

       
     </div> }
    </div>
    )
}
