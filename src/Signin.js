import React from 'react';
import { app } from "./firebase";
import { getAuth, getRedirectResult, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import { useState, useEffect } from 'react';
import {Route, BrowserRouter as Router, Switch, Link, Redirect, useHistory} from "react-router-dom";
import DelayLink from 'react-delay-link';
// import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker } from 'rsuite';


export default function Signin(props){

    const [user, setUser] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();
    const provider = new GoogleAuthProvider();

    
    provider.setCustomParameters({prompt: "select_account"});

    const auth = getAuth();

    const googleSignIn = () =>{

        signInWithPopup(auth, provider)
        .then((result) => {
            
            setUser(result.user);
            // props.parentFunc(result.user);
            localStorage.setItem("userID", result.user.uid)
            localStorage.setItem("userName", result.user.displayName)
            
            console.log(user);
            setLoggedIn(true);
          
        }).catch((error) => {
         
        const errorCode = error.code;
        console.log(errorCode);
        }); 
    }

    useEffect(() => {
        
        console.log(user)
        localStorage.setItem("user", "valued")

    },[user])

    const googleSignOut = () =>{
        signOut(auth).then(() => {
            // Sign-out successful.
            setUser(auth.currentUser);
            localStorage.setItem("userName", auth.currentUser);
            localStorage.setItem("userID",  auth.currentUser);

            console.log("logged out");

          }).catch((error) => {
            // An error happened.
          });
    }

    const localcheck = () =>{
        // console.log(localStorage.getItem("userName"));
        console.log(auth.currentUser);
    }
    
    return (
        <div>
            {/* <DateRangePicker 
            placeholder = "Default" 
            style={{ width: 230 }}/>
            <br/> */}

            {/* {googleSignIn} */}

            {loggedIn && history.push("/home")}
          
            <button onClick = {() => googleSignIn()}>Login</button>
            <button onClick = {() => googleSignOut()}>Log Out</button>
            <button onClick = {() => localcheck()}>Local Check</button>
        </div>
    )
}
