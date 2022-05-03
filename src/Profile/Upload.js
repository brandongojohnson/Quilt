import React from 'react';
import{useParams} from "react-router-dom";
import { getStorage, ref, uploadBytes,getDownloadURL} from "firebase/storage";
import {set, ref as dataRef, update, onValue, push } from "firebase/database";
import {db} from "../firebase"

import { useState } from 'react';

const Upload = (props) => {

    const [fileURL, setFileURL] = useState(null);
    const account = localStorage.getItem("userID");


    const [fileURL2, setFileURL2] = useState(true);

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
      const stuff = () => {
        props.type == "article" ? addPic() : props.type == "profile" ? addProfile() : addBackground();
        // console.log(props.type)
      }
            
      const addPic = () => {
        push(dataRef(db, 'users/' + `${account}/` + 'articles/' + `${props.aID}/` + "urls"), fileURL);
      }

      const addProfile = () => {
        update(dataRef(db, 'users/' + `${account}/`), {
            ProfilePic: fileURL
          });
          console.log("profile")
      }

      const addBackground = () => {
        update(dataRef(db, 'users/' + `${account}/`), {
            BackgroundPic: fileURL
          });
          console.log("BG")
      }

    return (
        <div>
            {/* <p>{fileURL}</p> */}
            {/* <button onClick = {addPic}>Upload</button> */}
            <button onClick = {stuff}>Upload</button>
            {/* <button onClick = {addProfile}>Add Profile</button> */}
            <input type="file" onChange={onFileChange} />
        </div>
    );
}

export default Upload;
