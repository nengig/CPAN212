import { useState, useEffect } from "react";

export default function Photographs (){
    const [photosSrc, setphotosSrc] = useState([])
    const getPhotoSrc = async ()=>{
        try{
            const response = await fetch(`http://localhost:8000/portfolio/photographs`);
            const data = await response.json();
            console.log(data)
            setphotosSrc(data);
        }catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getPhotoSrc(); // Call the function inside useEffect
    }, []);
    
    // if photosSrc is empty show loading     
    if (photosSrc.length === 0) return <p>Loading...</p>;
    return(
        <div>
            <h2>Photography</h2>
            <div className="imageContainer">
            {photosSrc.map((src,index)=>(
                <div  key={index}>
                    <img
                        src={src}
                        alt={`Picture ${index}`}
                        className="images"
                    />
                </div>
            ))}
            </div>
        </div>
    )
}