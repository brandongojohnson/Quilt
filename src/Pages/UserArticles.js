import{useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from "firebase/database";
import {db} from "./firebase";
import Upload from './Upload.js';


export default function UserArticles(props) {
// imports all the userData data 
// displays user data the corresponds to path

    const articleData = props.articleListData;
    const userData = props.userListData;

    const {article} = useParams(null);
    const [newKeys, setNewKeys] = useState(null);
    // const [urls, setUrls] = useState(null);
    var urls = null;

    var keys = null;
    var imageUrls = null;

    const populate = () =>{
      keys = Object.keys(userData[props.currentUser]["articles"]);

      // console.log(userData.hasOwnProperty('brandon'));
      console.log(articleData);
      console.log(keys);
     
    }
    
    !props.loading && populate();

    return (
      
    <div className="App">
    

    {props.loading && <p>Articles Loading</p>}
     {!props.loading &&
      <div>
        {keys.map((articleID,index)=>{
          return(
            
            <div key = {index}>
              {console.log(userData[props.currentUser]["articles"][articleID]["displayname"])}
            <p>Nickname: {userData[props.currentUser]["articles"][articleID]["displayname"]}</p>
            <p>Clothing Type: {userData[props.currentUser]["articles"][articleID]["clothingtype"]}</p>
            <p>Year Purchased: {userData[props.currentUser]["articles"][articleID]["yearpurchased"]}</p>
            <Upload aID = {articleID}/><br/><br/>
            
            {/* {urls = Object.keys(userData[props.currentUser]["articles"][articleID])} */}
        
            
            {/* {urls = Object.keys(userData[props.currentUser]["articles"][articleID]["urls"])} */}

            {/* {urls.map((url,index)=>{
                return(
                  <div key = {index}> 
                  <p>Year Purchased: {userData[props.currentUser]["articles"][articleID]["urls"][url]}</p>
                  </div> 
                )
              })}<br/><br/> */}
            </div> 
          )
        })}

       
     </div> }
    </div>
    )
}
