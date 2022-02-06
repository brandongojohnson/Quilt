import React, { useState, useEffect } from 'react';

export default function About(props) {

  useEffect(() => {
    props.parentFunc("this is a test","yo")
  })

  return (
    <div>
      
    </div>
  );
}
