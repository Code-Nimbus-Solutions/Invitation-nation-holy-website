import React, { useState, useEffect } from 'react';
import '../CSSfiles/Counter.css';

export default function CounterSection() {
  const calculateTimeLeft = () => {
    if (!offerData || !offerData.offer_valid_date) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        progress: 0
      };
    }

    const eventDate = new Date(offerData.offer_valid_date).getTime();
    const now = new Date().getTime();
    let difference = eventDate - now;
    if (difference < 0) {
      difference = 0; // Set difference to zero if offer has expired
    }
    const totalSeconds = Math.floor(difference / 1000);
    const totalSecondsInADay = 24 * 60 * 60;
    const progress = Math.min(
      100,
      ((totalSecondsInADay - (totalSeconds % totalSecondsInADay)) /
        totalSecondsInADay) *
        100
    );
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
      minutes: Math.max(Math.floor((difference / 1000 / 60) % 60), 0),
      seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
      progress: progress
    };
  };

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  const [offerData, setOfferData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Fetch offer data from the API endpoint
    fetch(`${import.meta.env.VITE_SERVER_URL}/rest/api/public`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Set offer data fetched from the API
        setOfferData(data);
      })
      .catch(error => {
        console.error('Error fetching offer data:', error);
        // Handle error
      });
  }, []); // Run once when component mounts

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        const newTimeLeft = calculateTimeLeft();
        if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
          clearInterval(timer);
          return { ...prevTimeLeft, ...newTimeLeft };
        } else {
          return newTimeLeft;
        }
      });
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(timer);
  }, [offerData]); // Run when offerData changes

  return (
    <div className="main-section">
      <div className="main-card">
        <div className="countercard">
          {offerData && (
            <>
              <p className='counter-heading'>One step away from the best holi party of 2024</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${timeLeft.progress}%` }}></div>
              </div>
              <div className="discount">
                <h1>{offerData.offer_persent}% OFF</h1>
                <p>{offerData.offer_name} in</p>
              </div>
              <div className="timer">
                <span>{formatTime(timeLeft.hours)} <p>Hours</p></span>
                <span>{formatTime(timeLeft.minutes)} <p>Minutes</p></span>
                <span>{formatTime(timeLeft.seconds)} <p>Seconds</p></span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
