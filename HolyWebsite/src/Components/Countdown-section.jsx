import React from "react";
import "./Countdown-section.css";

const CountdownSection = () => {
  return (
    <>
      <section id="count-down-section">
        <div className="nimbus-container">
          <div className="count-down-container">
            <div className="count-down-timer-box">
              <h3 className="count-down-timer-title">
                Early Bird offer ends in
              </h3>
              <span className="count-down-timer-value">22:12:33</span>
            </div>
            <div className="count-down-price-box">
              <h3 className="count-down-price-title">Sale : 50% Discount</h3>
              <p className="count-down-price-value">
                <s>1799</s> ₹899
              </p>
              <span>Onwards</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CountdownSection;
