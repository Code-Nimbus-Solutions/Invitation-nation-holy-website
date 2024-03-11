import React, { useState, useEffect } from 'react';
import '../CSSfiles/Phone.css';
import AgeVerify from './Ageverify';

export default function PhoneNumber({ purchasedData }) {
  const [timer, setTimer] = useState(60);
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    Mailid: '',
    otp: ''
  });
  const [isInputsFilled, setIsInputsFilled] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0 && !isButtonActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setIsButtonActive(true);
      setTimer(60);
    }

    return () => clearInterval(interval);
  }, [timer, isButtonActive]);

  // Function to send OTP
  const handleSendOTP = () => {
    setIsButtonActive(false);
    
    // Prepare data to send to OTP endpoint
    const formDataToSend = {
      email: formData.Mailid,
      name: formData.name
    };

    // Send request to API to send OTP
    fetch('http://192.168.68.102:8080/rest/api/public/user-validation-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataToSend)
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.responceId === 'OSS') {
        alert('OTP sent successfully');
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    });
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle next button click
  const handleNextClick = () => {
    console.log("Next button clicked"); 
    // Check if the name, Mailid, and OTP fields are empty
    if (!formData.name || !formData.Mailid || !formData.otp) {
      alert("Please fill in all fields");
      return;
    }
  
    // Prepare the data to be sent
    const postData = {
      email: formData.Mailid,
      name: formData.name,
      otp: formData.otp
    };
  
    // Send a POST request to verify the OTP
    fetch('http://192.168.68.102:8080/rest/api/public/user-validation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.responceId === 'OVS') {
        console.log('OTP verification successful:', data.responce);
        setIsInputsFilled(true); // Assuming the OTP verification was successful, proceed to the next step
      } else {
        alert('OTP verification failed. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to verify OTP. Please try again.');
    });
  };
  

  return (
    <div className="Phone-main-section">
      <div className="phone-container"> 
        {isInputsFilled ? (
          <AgeVerify purchasedData={purchasedData} />
        ) : (
          <>
            <div className="main-phone-card">
              <div className="ph-card-content">
                <h2 className="phone">Verify your Phone number</h2>
                <p>A copy of the tickets will be sent to the below email</p>
              </div>
              <div className="details-fld">
                <label htmlFor="Name">Name<span>*</span></label>
                <input type="text" name="name" placeholder="Name" className='Name' value={formData.name} onChange={handleInputChange} />
                <label htmlFor="mail-id">Mail id<span>*</span></label>
                <input type="text" name="Mailid" className="mail-id" placeholder='mail id' value={formData.Mailid} onChange={handleInputChange}  />
              </div>
              <div className="otp-section">
                <input type="text" name="otp" className='otpnumber'  value={formData.otp} onChange={handleInputChange} />
                <button className='send-otp' disabled={!isButtonActive} onClick={handleSendOTP}>
                  {isButtonActive ? <p className='otp-active'>Send OTP</p> : <p className='no-otp'>Send OTP</p>}
                </button>
              </div>
              <p className='otp-description'>OTP has been sent to your Phone Number</p>
              <p className='otp-timer'>Resend OTP in {timer}secs</p>
            </div>
            <button className='Next-ph' onClick={handleNextClick}>Next</button>
          </>
        )}
      </div>
    </div>
  );
}
