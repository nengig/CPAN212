import { useState, useEffect } from "react";

export default function Programming (){
    const [programs, setPrograms] = useState([])
    const getPrograms = async () =>{
        try{
            const response = await fetch(`http://localhost:8000/portfolio/programming`);
            const data = await response.json();
            console.log(data)
            setPrograms(data);
        }catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getPrograms(); // Call the function inside useEffect
    }, []);
    
    // if programs is empty show loading     
    if (programs.length === 0) return <p>Loading...</p>;
    return(
        <div>
            <h2>Programming Projects</h2>
            <div id='pOuter'>
            {programs.map((program,index)=>(
                <div key={index} className="container" style={{width:'45%'}}>
                    <h4 id="pTitle">{program.title}</h4>
                    <p id="pLang">{program.language}</p>
                    <a href={program.code} target="_blank" >
                        Project Code 
                    </a>
                    <a href={program.link} target="_blank">
                        Project Link 
                    </a>
                    <p id="pDesc">{program.description}</p>
                </div>
            ))}
            </div>
        </div>
    )
}