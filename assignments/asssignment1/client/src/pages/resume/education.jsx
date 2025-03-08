import { useState, useEffect } from "react";
import '../../App.css'
function Education (){
    const [education, setEducation] = useState([]);
    const getEducation = async() => {
        try{
            const response = await fetch(`http://localhost:8000/resume/education`);
            const data = await response.json();
            console.log(data)
            setEducation(data);
        }catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getEducation(); // Call the function inside useEffect
    }, []);
    
    // if education is empty show loading     
    if (education.length === 0) return <p>Loading...</p>;

    return(
        <div>
            <h2 className="headers">Education</h2>
            {education.map((edu,index)=>(
                <div key={index} className="container">
                    <h3 id="institution">{edu.institution}</h3>
                    <h4 id="degree" style={{color:'#A7B49E'}}>{edu.degree}</h4>
                    <div className="aNrcOuter">
                    {edu.achievements.map((achievement,i)=>(
                        <p className="aNrc" key={i}>{achievement}</p>
                    ))} 
                    </div>
                    <h4 className="eduSubhead" style={{color:'#A7B49E'}}>Relevant Coursework</h4>
                    <div className="aNrcOuter">
                    {edu.relevant_coursework.map((coursework,i)=>(
                        <p className="aNrc" key={i}>{coursework}</p>
                    ))}  
                    </div>   
                </div>
                )
            )}
        </div>
    )
}
export default Education;