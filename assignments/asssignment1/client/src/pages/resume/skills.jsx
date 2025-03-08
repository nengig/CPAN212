import { useState, useEffect } from "react";

function Skills (){
    const [skills, setSkills] = useState([]);
    //call server to provide skills information and save it to skills variable
    const getSkills = async() => {
        try{
            const response = await fetch(`http://localhost:8000/resume/skills`);
            const data = await response.json();
            setSkills(data);
        }catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getSkills(); // Call the function after first render 
    }, []);
    
    // if skills is empty show loading     
    if (skills.length === 0) return <p>Loading...</p>;

    return(
        <div>
            <h2 className="headers">Skills</h2>
            <div id="skillsContain">
            {skills.technical.map((skill,index)=>(
                //map the skills information to screen
                // 3 maps one for technical, soft and other skills 
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