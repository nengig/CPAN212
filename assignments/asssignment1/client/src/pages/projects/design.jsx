import { useState, useEffect } from "react";

export default function Designs (){
    const [designsSrc, setDesignsSrc] = useState([])
    const getDesignsSrc = async ()=>{
        try{
            const response = await fetch(`http://localhost:8000/portfolio/designs`);
            const data = await response.json();
            console.log(data)
            setDesignsSrc(data);
        }catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getDesignsSrc(); // Call the function inside useEffect
    }, []);
    
    // if designSrc is empty show loading     
    if (designsSrc.length === 0) return <p>Loading...</p>;
    return(
        <div>
            <h2>Graphic Design</h2>
            <div className="imageContainer">
            {designsSrc.map((src,index)=>(
                <div key={index}>
                    <img
                        src={src}
                        alt={`Design ${index}`}
                        className="images"
                    />
                </div>
            ))}
            </div>
        </div>
    )
}