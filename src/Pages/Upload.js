import React from 'react';
import { getStorage, ref, uploadBytes,getDownloadURL} from "firebase/storage";
import {set, ref as dataRef, update, onValue } from "firebase/database";
import {db} from "./firebase"

import { useState } from 'react';

const Upload = () => {

    const [fileURL, setFileURL] = useState(null);
    const [count, setCount] = useState(0);


    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storage = getStorage();
        const fileRef = ref(storage, file.name);

        // await uploadBytes(fileRef, file);
        // setFileURL(await getDownloadURL(fileRef));

        // upload to storage
       uploadBytes(fileRef, file)
        .then((snapshot) => {
            console.log("good job");
            (getDownloadURL(fileRef)
            .then(data => {
                console.log(data)
                setFileURL(data)
            })
            )
          })
      };

      const name = "brandon"
      
      const addPic = () => {
        update(dataRef(db, 'users/' + `${name}/` + 'urls'), {
          // identifier: title,
          [count]: fileURL,
        });
        setCount(() => count + 1)
        console.log(count);


      }

      const addCount = () =>{
          setCount(count + 1)
          console.log(count)
      }

      const showURL = () =>{
          console.log("jodi");
      }
  
    return (
        
        <div>
            <p>{fileURL}</p>
            <button onClick = {addPic}>Add Pic</button>
            <button onClick = {addCount}>Add Count</button>
            <input type="file" onChange={onFileChange} />
        </div>
    );
}

export default Upload;
