import React, { useState, useEffect } from 'react';
import {set,ref, update, onValue } from "firebase/database";

import {db} from "./firebase"

const ArticleForm = ()  =>{

  const [clothingName, setClothingName] = useState('');
  const [clothingType, setClothingType] = useState('');
  const [user, setUser] = useState('');

  const [count, setCount] = useState(0);

  const writeUserData = () => {
    set(ref(db, 'articles/' + clothingName), {
      clothingname: clothingName,
      clothingtype: clothingType,
    });  
    updateUsers();
  }

const updateUsers = () =>{
  update(ref(db, 'articles/' + `${clothingName}/` + 'users'), {
    [count]: user,
  });
  setUser("");
  setCount(() => count + 1 )
}

const combined = () =>{
  updateUsers();
  writeUserData();

}
 
  
 
  return (
    <div>
    
      

      <label> Name:
        <input type="text" onChange={(e) => setClothingName(e.target.value)} value={clothingName} /><br/>
      </label>

      <label> Clothing Type:
        <input type="text" onChange={(e) => setClothingType(e.target.value)} value={clothingType} /><br/>
      </label>

      <label> User:
      <input type="text" onChange={(e) => setUser(e.target.value)} value={user} /><br/>
      </label>
     

      <button onClick={writeUserData}>Create Article</button>
      <button onClick={updateUsers}>Add User</button>
      
      
    </div>
  );
};

export default ArticleForm;

