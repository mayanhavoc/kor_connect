import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import {
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';
// This library is required for KORConnect
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [headerInfo, setHeaderInfo] = useState("");
  // This constant is required for ReCaptcha, which is used by KOR Connect 
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSearch = async(event) => {
    if (executeRecaptcha) {
      handleGet();
    }

    //* We'll need this constant to make request */
    const token = await executeRecaptcha('submit');
    const timestamp = new Date().toUTCString();

     // You need to append the path of the endpoint you are calling to the KOR Connect base URI 
     axios.get(`https://chova32n.korconnect.io/GIPHY-API/channels/search?q=${event.target.value}`, { 
       headers: 
       { 
         token, 
         timestamp, 
         'x-api-key': 'PhVDYkWsV11YJXs3BsAAQaVFCUqYNV7J3iIOKRls' 
        } 
      }
      )
     .then(response => {
       setData(response.data.data);
     })
     .catch(error => {
       console.log(error)
     }) 
  };

  // This function is an example of how to call your API through KOR Connect 
  const handleGet =  async() => {
    //* We'll need this constant to make request */
    const token = await executeRecaptcha('submit');
    const timestamp = new Date().toUTCString();
    axios.get(`https://chova32n.korconnect.io/GIPHY-API/gifs/random`,
    {
      headers: 
         { 
           token, 
           timestamp, 
           'x-api-key': 'PhVDYkWsV11YJXs3BsAAQaVFCUqYNV7J3iIOKRls' 
          } 
    })
    .then((response) => {
      setHeaderInfo(response.data.data);
    })
    .catch((error)=> {
      console.log(error);
    });
  };

  // In this example, we are using useEffect to trigger the attestation process as soon as the component is loaded
  useEffect(() => {
    if(executeRecaptcha) {
    handleGet();
  }}, []);


  // This is used to hide your Recaptcha badge (please read Recaptcha’s TOS) 
  useEffect(() => {
    if (document.querySelector('.grecaptcha-badge')) {
      const el = document.querySelector('.grecaptcha-badge');
      el.style.display = 'none';
    }
  }, []);
  // Extend this sample application by modifying this code 
  return (
    <div>
      <h1>Giphy</h1>
      {console.log(data)}
      <input type="text" onChange={(e) => handleSearch(e)}/>
      {data && data.map((gif) => gif.banner_image && (
        <img src={gif.banner_image} alt="image" />
      ))}
    </div>
  );
};

export default App;