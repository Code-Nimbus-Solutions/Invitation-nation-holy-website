import React, { useState, useEffect } from 'react';
import '../CSSfiles/Sucess.css';
import Star from '/src/assets/Component 2.svg';

export default function Paymentsuccess({ mailId }) {
  const [timer, setTimer] = useState(300); // 300 seconds = 5 minutes

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      console.log('Timer reached 0. Do something here.');
      // Handle what should happen when timer reaches 0
    }
  }, [timer]);

  if (timer <= 0) {
    return null; // Do not render anything when the timer reaches 0 or less
  }

  // Calculate minutes and seconds
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="payment-section">
      <div className="payment container">
        <div className="image-container">
          <div className="sucess-card-container">
            <div className="image-cont">
              <img src={Star} alt="" className="success" />
            </div>
            <h1>Payment link sent to your email</h1>
            <p>{mailId}</p>
          </div>
          <div className="info-container">
            <p className="nextstep">To claim the offer, complete the payment in </p>
            <p className='timer-sucess'>{minutes}M  {seconds}S</p>
            <div className="link">
              <div className="follow-section">Follow us for regular updates about the event</div>
              <p className="payment">
                <img src="/src/assets/WhatsApp.svg" alt="" className="whatsapp" />
                Join WhatsApp community
              </p>
              <p className="payment">
                <img src="/src/assets/Instagram Circle.svg" alt="" className="instagram" />
                Follow us on Instagram
              </p>
            </div>
          </div>

          <div className="sponsor-section">
            <div className="sponsor">
                <h3>Event Sponsor's</h3>
            </div>
            <div className="img-logo-container">
                <img src="/src/assets/procreate 3.svg" alt="" className="logo" />
                <img src="/src/assets/procreate 3.svg" alt="" className="logo" />
                <img src="/src/assets/procreate 3.svg" alt="" className="logo" />
            </div>
            
          </div>
          <div className="share">
            <button className="Share-content">Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}
