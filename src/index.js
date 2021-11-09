import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';


ReactDOM.render(
  <GoogleReCaptchaProvider reCaptchaKey="6Le0tvYcAAAAAEQaEryIvZtf9xs4R_0hs67yUppI">
    <App />
  </GoogleReCaptchaProvider>,
  document.getElementById('root')
);
