import { useState, useEffect } from "react";

function WorkExperience (){
    const [workExp, setWorkExp] = useState([]);
    const getWorkExperience = async() => {

        try{
            const response = await fetch(`http://localhost:8000/resume/workExperience`);
            const data = await response.json();
            console.log(data)
            setWorkExp(data);
        }catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getWorkExperience(); // Call the function inside useEffect
    }, []);
    
    // if workExp is empty show loading     
    if (workExp.length === 0) return <p>Loading...</p>;

    return(
        <div>
            <h2 className="headers">Work Experience</h2>
            {workExp.map((exp,index)=>(
                <div key={index} className="container">
                    <p className="role">{exp.role}</p>
                    <div className="resContainer">
                    {exp.responsibilities.map((responsibility,i)=>(
                        <p className="res" key={i}>{responsibility}</p>
                    ))}  
                    </div> 
                </div>
                ))}  
        </div>
    )
}
export default WorkExperience;