import React, { useState, useEffect } from "react";
import "./Countdown-section.css";

const CountdownSection = () => {
  const [offerName, setOfferName] = useState("");
  const [offerValidDate, setOfferValidDate] = useState("");
  const [offerPercentage, setOfferPercentage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/rest/api/public`)
      .then((response) => response.json())
      .then((data) => {
        setOfferName(data.offer_name);
        setOfferValidDate(data.offer_valid_date);
        setOfferPercentage(data.offer_persent);
        calculateTimeRemaining(data.offer_valid_date); // Initial calculation
        const intervalId = setInterval(() => calculateTimeRemaining(data.offer_valid_date), 1000); // Update every second
        return () => clearInterval(intervalId); // Clean up interval
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const calculateTimeRemaining = (validDate) => {
    const now = new Date().getTime();
    const validDateTime = new Date(validDate).getTime();
    const timeDifference = validDateTime - now;
  
    if (timeDifference > 0) {
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      setTimeRemaining(` ${hours}h ${minutes}m ${seconds}s`);
    } else {
      // If time difference is negative (offer expired), set time remaining to zero
      setTimeRemaining("00h 00m 00s");
    }
  };
  

  return (
    <section id="count-down-section">
      <div className="nimbus-container">
        <div className="count-down-container">
          <div className="count-down-timer-box">
            <h3 className="count-down-timer-title">{offerName}</h3>
            <span className="count-down-timer-value">{timeRemaining}</span>
          </div>
          <div className="count-down-price-box">
            <h3 className="count-down-price-title">Sale : {offerPercentage}% Discount</h3>
            {/* Assuming the original price is 1799 */}
            <p className="count-down-price-value">
              <s>1799</s> ₹899
            </p>
            <span>Onwards</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
