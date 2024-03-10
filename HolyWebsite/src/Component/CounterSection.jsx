import React, { useState, useEffect } from 'react';
import '../CSSfiles/Counter.css';
import productsData from './Card-Data';

export default function CounterSection() {
  const calculateTimeLeft = () => {
    const eventDate = new Date("2024-03-25T04:00:00").getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;
    const totalSeconds = Math.floor(difference / 1000);
    const totalSecondsInADay = 24 * 60 * 60;
    const progress = Math.min(100, ((totalSecondsInADay - totalSeconds % totalSecondsInADay) / totalSecondsInADay) * 100);
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      progress: progress
    };
  };

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="main-section">
      <div className="main-card">
        <div className="countercard">
          <p>One step away from the best holi party of 2024</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${timeLeft.progress}%` }}></div>
          </div>
          <div className="discount">
            <h1>50% OFF</h1>
            <p>Early bird offer ends in</p>
          </div>
          <div className="timer">
            <span>{formatTime(timeLeft.hours)} <p>Hours</p>  </span>
           
            <span>{formatTime(timeLeft.minutes)} <p> Minutes</p></span>
            
            <span>{formatTime(timeLeft.seconds)}   <p>Seconds</p></span>
          
          </div>
        </div>
      </div>
    </div>
  );
}
