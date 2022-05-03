import{useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Upload from './Upload.js';
import "../index.css";


export default function UserArticles(props) {
// imports all the userData data 
// displays user data the corresponds to path

    const articleData = props.articleListData;
    const userData = props.userListData;

    const {article} = useParams(null);
    const [newKeys, setNewKeys] = useState(null);
    var keys = null;

    const populate = () =>{
      
      if (userData.hasOwnProperty(props.currentUser)){
        keys = Object.keys(userData[props.currentUser]["articles"]);
      }
      else{
        keys = [];
      }
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
            
            <div class = "article-info">
            <p>Nickname: {userData[props.currentUser]["articles"][articleID]["displayname"]}</p>
            <p>Clothing Type: {userData[props.currentUser]["articles"][articleID]["clothingtype"]}</p>
            <p>Year Purchased: {userData[props.currentUser]["articles"][articleID]["yearpurchased"]}</p>
            <Upload aID = {articleID} type = 'article'/>
            
            <br/><br/>
            </div>

            {userData[props.currentUser]["articles"][articleID].hasOwnProperty('urls') && <div class = "joe">
         
            { Object.keys(userData[props.currentUser]["articles"][articleID]["urls"]).map((url,index)=>{
                return(
                    <div key = {index}> 
                    <img src = {userData[props.currentUser]["articles"][articleID]["urls"][url]} width = "200" />
                    </div>
                )
              })}
              <br/><br/> 
              </div>}
            </div> 
          )
        })}
        
     </div> }
    </div>
    )
}
