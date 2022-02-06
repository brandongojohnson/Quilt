import React, { useState, useEffect } from 'react';
import { ref, set, onValue, push } from "firebase/database";
import {db} from "./firebase";
import {aIDGenerator} from './Pages/say.js';
import Upload from './Upload.js';
import UserArticles from './UserArticles.js';
import {monthYear} from './monthYear.js';

const Form = (props)  =>{

  const [articleName, setArticleName] = useState('');
  const [clothingType, setClothingType] = useState('');
  const [yearAcquired, setYearAcquired] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [count, setCount] = useState(0);
  const user = props.user

  const uID = localStorage.getItem("userID")
  const aID = aIDGenerator(); // I generate
  const userName = localStorage.getItem("userName")// get from sign in


  //User Information ///////////////////////////
  const writeUserData = () => {

    // set(ref(db, 'users/' + uID), {
    //   displayname: userName,
    //   userID: uID,
    // });

    set(ref(db, 'users/' + `${uID}/` + 'articles/' +  aID), {
      articleID: aID,
      clothingtype: clothingType,
      yearpurchased: yearAcquired,
      displayname: articleName
    });

   // push(ref(db, 'users/' + `${uID}/` + 'articles/' +  `${aID}/` + "urls/"), 'posts');
     
    setClothingType("")
    setYearAcquired("")
    setArticleName("")
  }
//Article Information ///////////////////////////
  const writeArticleData = () =>{

    set(ref(db, 'articles/' + aID), {
      articleID: aID,
      clothingtype: clothingType,
      displayname: articleName
    });

    push(ref(db, 'articles/' + `${aID}/` + "users/"), uID);

    setCount(() => count + 1)
  }

  const Submit = () =>{
    writeUserData();
    writeArticleData();
    setSubmitted(true);
  }

  const buttonCheck = () =>{
    const date = new Date(yearAcquired).toString();
    const realDate = new Date(date.setMonth(date.getMonth() + 1))
    const nDate = monthYear(realDate)
    console.log(nDate)
    
  }

  return (
    <div class = "homepage">
      
      <h1> Hi {userName}</h1>
 
      <div class = "form">
        <input type="text" onChange={(e) => setArticleName(e.target.value)} value={articleName} placeholder="Nickname"/><br/>

      <select onChange={(e) => setClothingType(e.target.value)} value={clothingType}>
        <option value='' disabled selected hidden> Clothing Type </option>
        <option value="Pants">Pants</option>
        <option value="Skirt">Skirt</option>
        <option value="Shirt">Shirt</option>
        <option value="Jacket">Jacket</option>
        <option value="Belt">Belt</option>
        <option value="Shoes">Shoes</option>
        <option value="Jewelry">Jewelry</option>
      </select>
      <br/>
      
      <label> Date Acquired: 
      {/* <input type="text" onChange={(e) => setYearAcquired(e.target.value)} value={yearAcquired} /><br/> */}
      
      <input type="month" id="start" name="trip-start"
       onChange={(e) => setYearAcquired(e.target.value)}
       value={yearAcquired}
       min="2018-01-01" max="2018-12-31"></input>

       <button onClick = {()=>buttonCheck()}> Button Check </button>

      </label>

      <button onClick={() => Submit()}>Submit</button>
      {/* {submitted && <Upload articleID = {aID}/>} */}

      </div>
      
      <UserArticles 
        currentUser = {uID}
        userListData = {props.userListData} 
        articleListData = {props.articleListData}
        loading = {props.loading}
        // articleID = {aID}
        />
    </div>
  );
};

export default Form;

