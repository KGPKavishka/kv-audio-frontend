import { useState } from "react";
import MediaUpload from "../utils/mediaUpload";

export default function Testing(){

    const [file, setFile] = useState(null);

    function uploadFile(){
        console.log(file)
        MediaUpload(file).then((url)=>{
            console.log(url)
        })
    }
    
    return (
        <div className="w-full bg-green-200 flex flex-col justify-center items-center h-screen">

            <input type="file" multiple onChange={(e) => {setFile(e.target.files[0])}}/>

            <button onClick={uploadFile} className="w-[200px] h-[50px] bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 mt-4">
                Upload
            </button>
        </div>
    );
}