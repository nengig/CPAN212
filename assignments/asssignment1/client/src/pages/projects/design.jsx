import { useState, useEffect } from "react";

export default function Designs (){
    const [designsSrc, setDesignsSrc] = useState([])
    const getDesignsSrc = async ()=>{
        //call server to provide array that provides the source for all design images and save array into variable

        try{
            const response = await fetch(`http://localhost:8000/portfolio/designs`);
            const data = await response.json();
            setDesignsSrc(data);
        }catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getDesignsSrc(); // Call the function on first render 
    }, []);
    
    // if designSrc is empty show loading     
    if (designsSrc.length === 0) return <p>Loading...</p>;
    return(
        <div>
            <h2>Graphic Design</h2>
            <div className="imageContainer">
            {designsSrc.map((src,index)=>(
                //map each image using the src derived from server 
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