import{useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function Users(props) {

    const items = props.data;
    const people = Object.keys(items);

    console.log(people)

    return (
    <div className="App">
    {props.loading && <p>loading</p>}
    {!props.loading && <div>

      {people.map((person, index)=>{
        return (
         <div key={index}>
        
          {/* {JSON.stringify(items[person])} */}
          
          <p>Person Name: {items[person]['username']}</p>
          <p>Clothing Type: {items[person]['clothingtype']}</p>
          <p>Year Purchased: {items[person]['yearpurchased']}</p>
          <br/>
          </div>
          )

      }) }
      
      </div>}
    </div>
    )
}

{/* <p>Person Name: {items[person]['username']}</p>
<p>Clothing Type: {items[person]['clothingtype']}</p>
<p>Year Purchased: {items[person]['yearpurchased']}</p> */}