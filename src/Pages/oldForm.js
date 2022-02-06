import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from "firebase/database";
import {db} from "./firebase"

const Form = ()  =>{

  const [name, setName] = useState('');
  const [clothingType, setClothingType] = useState('');
  const [yearAcquired, setYearAcquired] = useState('');
  const [items, setItems] = useState([]);

  const testing = () =>{
    return "hello"
  }

  const readData2 = () =>{
    const userData = ref((db), "users/");
    onValue(userData,(snapshot) => {
      if (snapshot.exists()) {
        console.log(JSON.stringify(snapshot.val()));
        // setItems(snapshot.val())
        
        
      }
      return snapshot.val()
    })
  } 

  const tester = () => {
   //console.log("uioduio")
   return "uieouou"
  }


  const [items2,setItems2] = useState([]);
  useEffect(() => {
    // setItems2((items2) =>[...items2, "jdk"]);
    console.log(readData2());
  },[])
  
  
  const fakedata = [ 
    {
        "id": 1,
        "title": "Hello World",
        "content": "Try Reactjs is awesome. Can't wait to learn more",
        "date": "12-04-2017",
        "slug": "hello-world"
    },
    {
        "id": 2,
        "title": "Setup React",
        "content": "Setting up react is easy. Learn more about it!",
        "date": "1-28-2018",
        "slug": "setup-react"
    }]

  const writeUserData = () => {

    set(ref(db, 'users/' + name.toLowerCase()), {
      username: name,
      clothingtype: clothingType,
      yearpurchased: yearAcquired,
      test: "uio"
    });
    
    setClothingType("")
    setYearAcquired("")
    setName("")
  }

  const readData = () =>{
    const userData = ref((db), "users/");
    onValue(userData,(snapshot) => {
      if (snapshot.exists()) {
        console.log(JSON.stringify(snapshot.val()));
        
        setItems(snapshot.val());
        console.log(items);
      
      } else {
        alert("No data found")
      }
    })
  } 

  const newUsers = Object.keys(items);
  //const stuff = items;

  const showItems = () =>{
    console.log(items);
    
  }

      
 
  return (
    <div>
    
      {newUsers.map((person, index)=>{
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

      <label> Name:
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} /><br/>
      </label>

      <label> Clothing:
      <input type="text" onChange={(e) => setClothingType(e.target.value)} value={clothingType} /><br/>
      </label>
      
      <label> Year Acquired: 
      <input type="text" onChange={(e) => setYearAcquired(e.target.value)} value={yearAcquired} /><br/>
      </label>

      <button onClick={writeUserData}>Write</button>
      <button onClick={readData}>Read</button>
      <button onClick={showItems}>Show Items</button>
    </div>
  );
};

export default Form;

