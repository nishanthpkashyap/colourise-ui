import React, { useState, useEffect } from "react";
import axios from "axios";
// import 

export const DisplayImage = (props) => 
{
    const [image, setImage] = useState(null);
    const filename = 'ragi'
    useEffect(() => {
        axios.get(`http://localhost:4000/dev/getImage?fileName=${filename}`).then((response)=>{
            const data = response.data.result
            console.log("data: ", data)
            const extension = filename.substring(filename.lastIndexOf('.')).substring(1);
            console.log(`extension: ${extension}`);
            const blob = converBase64toBlob(data, `application/${extension}`);
            const blobURL = URL.createObjectURL(blob);
            setImage(blobURL);
        })
    }, [])
    
    
    return (
        <div>
            <h1>Image</h1>
            <img src={image} alt={"oops!!"} />
            
        </div>
    );
};

const converBase64toBlob = (content, contentType) => 
{
    console.log("content", content)
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [
    ];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) 
    {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
        type: contentType
    }); //statement which creates the blob
    return blob;
};
