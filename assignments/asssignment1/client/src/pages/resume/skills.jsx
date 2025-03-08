import { useState, useEffect } from "react";

function Skills (){
    const [skills, setSkills] = useState([]);
    const getSkills = async() => {
        try{
            const response = await fetch(`http://localhost:8000/resume/skills`);
            const data = await response.json();
            console.log(data)
            setSkills(data);
        }catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getSkills(); // Call the function inside useEffect
    }, []);
    
    // if skills is empty show loading     
    if (skills.length === 0) return <p>Loading...</p>;

    return(
        <div>
            <h2 className="headers">Skills</h2>
            <div id="skillsContain">
            {skills.technical.map((skill,index)=>(
                <div key={index}>
                   <p className="skills">{skill}</p>
                </div>
                )
            )}
      
            {skills.soft.map((skill,index)=>(
                <div key={index}>
                   <p className="skills">{skill}</p>
                </div>
                )
            )}
            {skills.other.map((skill,index)=>(
                <div key={index}>
                   <p className="skills">{skill}</p>
                </div>
                )
            )}
            </div>
        </div>
    )
}
export default Skills;