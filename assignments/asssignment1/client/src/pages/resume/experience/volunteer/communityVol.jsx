import { useState, useEffect } from "react";

function CommunityVolunteer (){
    const [volunteerExp, setVolunteerExp] = useState([]);
    const getVolunteerExperience = async() => {
    //call server to provide community volunteer experience information and save it to  variable
        try{
            const response = await fetch(`http://localhost:8000/resume/volunteer`);
            const data = await response.json();
            console.log(data)
            setVolunteerExp(data);
        }catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getVolunteerExperience(); // Call the function at the 1st render 
    }, []);
    
    // if volunteerExp is empty show loading     
    if (volunteerExp.length === 0) return <p>Loading...</p>;

    return(
        <div>
            <h3 className="headers">Community Involvement</h3>
            <div id="volunContainer">
            {volunteerExp.map((vol,index)=>(
                //display information
                <div key={index} className="container" style={{width:'40%', textAlign:'center', padding:'20px 0'}}>
                    <p className="role">{vol.role}</p>
                    <div className="resContainer" style={{justifyContent:'center'}}>
                    {vol.responsibilities.map((responsibility,i)=>(
                        <p className="res" key={i}>{responsibility}</p>
                    ))}  
                    </div> 
                </div>
                )
            )}
            </div>
        </div>
    )
}
export default CommunityVolunteer;