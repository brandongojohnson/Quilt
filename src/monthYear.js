function monthYear(date) {
    
    const dateArray = date.split(" ");
    const month = dateArray[1];
    const year = dateArray[3];
    const newDate = `${month} ${year}`
  
    return(newDate);
  }
  
  export {monthYear}; 
  