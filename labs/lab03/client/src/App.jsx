import { useState } from "react";
const App = () => {
  // what do we need to track
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [displayImages, setDisplayImages] = useState([])
  const [dogImage, setDogImage] = useState("")
  const [message, setMessage] = useState("");

  // Handlers
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };
  const handleMultipleFileChange = (e) => {
    const filesArray = Array.from(e.target.files); // Convert FileList to Array
    setMultipleFiles(filesArray); 
  };

  // fetch functions -> fetch a random single image
  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);

      const blob = await response.blob(); // we made a blob - Binary Large Object
      // but thats not an image, so we need to make an image element

      // using createObjectURL
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  // fetch functions -> save single
  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("files", singleFile);
      
      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // fetch functions -> save multiple [TODO]
  const handleSubmitMultipleFiles = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    multipleFiles.forEach(file =>{
      formData.append("files", file)
    });
    try{
      const response = await fetch(`http://localhost:8000/save/multiple`, {
        method: "POST",
        body: formData,
      });
      const data = response.json();
      setMessage("Files has been uploaded")
    }catch (error){
      console.log(error)
    }
  }
  // fetch functions -> fetch multiple [TODO]
  const fetchMultipleFiles = async () => {
   // try {
      //setDisplayImages([])
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const data = await response.json();
      console.log(data)

      const filePromises = data.map(async (filename) =>{
        const fileResponse = await fetch (`http://localhost:8000/fetch/file/${filename}`)
        const fileBlob = await fileResponse.blob(); 
        const imageUrl = URL.createObjectURL(fileBlob);
        return imageUrl;

      })

      const imageUrls = await Promise.all(filePromises)
      setDisplayImages(imageUrls)
        //const fetchFile = async (filename) => {
        //  try {
        //    const image =  await fetch (`http://localhost:8000/fetch/file/${filename}`)
        //    const blob = await image.blob(); // we made a blob - Binary Large Object
        //    // but thats not an image, so we need to make an image element
        //  
        //    // using createObjectURL
        //    const imageUrl = URL.createObjectURL(blob);
        //    setDisplayImages((prevImages) => [...prevImages, imageUrl]);        
        //  }catch(error){
        //    console.error("Error fetching file:", error);
        //  }
        //}

      //filenames.map((filename) =>  fetchFile(filename));
      
   // } catch (error) {
      //console.error("Error fetching multiple files:", error);
    //}
  }
  // fetch functions -> fetch dog image [TODO]
  const fetchDogImage = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json(); 
      const imageUrl = data.message;
      setDogImage(imageUrl);
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };
  // fetch functions -> save dog image [TODO]
  const saveDogImage = async () => {
    try {
      const img = await fetch(dogImage);  // dogImage should be a URL (string)
      const blob = await img.blob();      // Convert image to a Blob

      // Create a File object from the Blob (you can specify the filename and mime type)
      //const file = new File([blob], `${dogImage}dog-image.jpg`, { type: blob.type });
      const formData = new FormData();
      formData.append("file", blob, `${dogImage}dog-image.jpg`);
      
      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      console.log(data)
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  return (
    <div>
      <p>{message}</p>
      
      <button onClick={fetchSingleFile}>Fetch Single File</button>
      {displayImage && (
        <div>
          <img
            src={displayImage}
            alt="Display Image"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}

      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit">Upload Single File</button>
      </form>

      <form onSubmit={handleSubmitMultipleFiles}>
        <h2>Upload Multiple File</h2>
        <input type="file" multiple onChange={handleMultipleFileChange} />
        <button type="submit">Upload Multiple Files</button>
      </form>

      <button onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
      {displayImages.length > 0 ? (
        <div>
          {displayImages.map((imageUrl,index) =>(
            <div key={index}>
              <img
                src={imageUrl}
                style={{width:"200px"}}
              />
            </div>
          ))}
        </div>
       // <div>
       //   <h3>Multiple Files</h3>
       //   {displayImages.map((image) => (
       //     <img  
       //     src={image}
       //     alt={`${image}`} 
       //     style={{ width: "200px", marginTop: "10px" }}/>
       //   ))}
       // </div>
      ):(
        <div>No Image to display</div>
      )}

        <button onClick={fetchDogImage}>Fetch Dog Image</button>
        {dogImage && (
          <div>
            <h3>Dog Image</h3>
            <img
              src={dogImage}
              alt="Dog Image"
              style={{ width: "200px", marginTop: "10px" }}
            />
            <form onSubmit={saveDogImage}>
              <button type="submit">Upload Image</button>
            </form>
          </div>
        )}
      
      
    </div>
  );
};

export default App;
