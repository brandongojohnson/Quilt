import './App.css';
import About from'./Pages/About.js';
import Form from './Form.js';
import ArticleForm from './ArticleForm.js';
import Article from './Article.js';
import User from './User.js';
import Users from './Users.js';
import Thing from './Thing.js';
import Upload from './Upload.js';
import React, { useState, useEffect } from 'react';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import { ref, set, onValue } from "firebase/database";
import {db} from "./firebase"
import Signin from './Signin.js';


const App = () =>{

 
  const [userListData, setUserListData] = useState([]);
  const [articleListData, setArticleListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userListDataLoading, setUserListDataLoading] = useState(true);
  const [articleListDataLoading, setArticleListDataLoading] = useState(true);

  // Read data of users
  // Store data in userListData variable 

  const readuserListData = () =>{
    const userListData = ref((db), "users/");
    onValue(userListData,(snapshot) => {
      if (snapshot.exists()) {
        setUserListData(snapshot.val())
        setUserListDataLoading(false);

      } else {
        alert("No data found")
      }
      
    })
  } 

  const readarticleListData = () =>{
    const articleListData = ref((db), "articles/");
    onValue(articleListData,(snapshot) => {
      if (snapshot.exists()) {
        setArticleListData(snapshot.val())
        setArticleListDataLoading(false);

      } else {
        alert("No data found")
      }
    })
  } 

  useEffect(() => {

    //Onload -> populate userListData list
    //Call to load variable
    //Wait until data finishes loading -> output to console

    console.log(userListDataLoading)

    {readarticleListData()}
    {readuserListData()}
    {check()}
  }, [])

  useEffect(() => {
    check()
  }, [readuserListData])

  const check = () => {
    if(articleListDataLoading == false && userListDataLoading == false){
      setIsLoading(false);
    }
  }
 
  const showuserListData = () => { 
   console.log(userListData)
  }

  const names = () => Object.keys(userListData)

  return(
    <>

    <Router>
      <Switch>

      <Route path = "/signin"> <Signin/> </Route> 
      <Route path = "/users" exact> <Users data = {userListData} loading = {userListDataLoading}/></Route>
      {/* <Route path = "/articleform"> <ArticleForm/> </Route> */}

      <Route path = "/thing"> <Thing/> </Route>

      <Route path = "/home"> 
        <Form
          userListData = {userListData} 
          articleListData = {articleListData} 
          loading = {isLoading}
        />
      </Route>

      </Switch>
    </Router>
    </>
  )
}


export default App;


