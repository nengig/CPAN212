import { useState, useEffect } from "react";
import '../../App.css'
function Education (){
    const [education, setEducation] = useState([]);
    const getEducation = async() => {
        //call server to provide education information and save it to education variable
        try{
            const response = await fetch(`http://localhost:8000/resume/education`); //fetch call
            const data = await response.json();//json
            setEducation(data);//save
        }catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getEducation(); // Call the function after first render 
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
                        //map education information 
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