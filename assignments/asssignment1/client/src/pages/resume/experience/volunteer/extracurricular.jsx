import { useState, useEffect } from "react";
function Extracurricular (){
    const [extraC, setExtraC] = useState([]);
    const getExtracurricular = async() => {
        try{
            const response = await fetch(`http://localhost:8000/resume/extracurricular`);
            const data = await response.json();
            console.log(data)
            setExtraC(data);
        }catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getExtracurricular(); // Call the function inside useEffect
    }, []);
    
    // if extraC is empty show loading     
    if (extraC.length === 0) return <p>Loading...</p>;

    return(
        <div>
            <h3 className="headers">School Involvement</h3>
            <div id="extracOuter">
            {extraC.map((exC,index)=>(
                <div key={index} className="extraCcontainer">
                    <p className="role" style={{padding:0}}>{exC.role}</p>
                    <p id="clubName">{exC.club}</p>
                </div>
                )
            )}
            </div>
        </div>
    )
}
export default Extracurricular;