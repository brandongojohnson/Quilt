import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from "firebase/database";
import {db} from "./firebase"

const Form = ()  =>{

  const [name, setName] = useState('');
  const [clothingType, setClothingType] = useState('');
  const [yearAcquired, setYearAcquired] = useState('');
  const [items, setItems] = useState([]);

  const uID = null;

  const writeUserData = () => {

    set(ref(db, 'users/' + uID), {
      displayname: name,
      id: uID,
    });

    set(ref(db, 'users/' + name.toLowerCase()), {
      username: name,
      clothingtype: clothingType,
      yearpurchased: yearAcquired,
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

      {/* <label> Clothing:
      <input type="text" onChange={(e) => setClothingType(e.target.value)} value={clothingType} /><br/>
      </label> */}

      <label> Clothing Type: 
      <select onChange={(e) => setClothingType(e.target.value)} value={clothingType}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
      </label><br/>
      
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

