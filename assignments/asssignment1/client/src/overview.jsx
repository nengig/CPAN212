import { useState, useEffect } from 'react'

import './App.css'

function Overview() {
  const [overview, setOverview] = useState([])
  const getOverview = async()=>{
    try{
        const response = await fetch(`http://localhost:8000/resume/overview`);
        const data = await response.json();
        console.log(data)
        setOverview(data);
    }catch (error){
        console.log(error)
    } 
  }
  useEffect(() => {
    getOverview(); // Call the function inside useEffect
}, []);

// if overview is empty show loading     
if (overview.length === 0) return <p>Loading...</p>;
  return (
      <div>
       <h1>Hello, Welcome To My Website</h1>
       <p id="overView">{overview.join(' ')}</p>
      </div>
      
  )
}

export default Overview
