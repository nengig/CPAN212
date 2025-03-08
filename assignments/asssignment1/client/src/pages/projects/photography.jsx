import { useState, useEffect } from "react";

export default function Photographs (){
    const [photosSrc, setphotosSrc] = useState([])
    const getPhotoSrc = async ()=>{
        //call server to provide array that provides the source for all images and save array into variable
        try{
            const response = await fetch(`http://localhost:8000/portfolio/photographs`);
            const data = await response.json();
            setphotosSrc(data);
        }catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getPhotoSrc(); // Call the function after first render 
    }, []);
    
    // if photosSrc is empty show loading     
    if (photosSrc.length === 0) return <p>Loading...</p>;
    return(
        <div>
            <h2>Photography</h2>
            <div className="imageContainer">
            {photosSrc.map((src,index)=>(
                //map each image using the src derived from server 
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