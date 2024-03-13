// Payment.jsx

import React, { useEffect } from "react";
import CartCard from "../Component/Cart-card";
import CounterSection from "../Component/CounterSection";
import "../Routing-component/Dashboard.css";
import axios from "axios";

export default function Payment() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/rest/api/public/ctbook`);
        if (response.data.responceId === "OS" && response.data.responce === "Operation Successfully") {
          console.log("Success Payment");
        } else {
          console.log("Unexpected response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once



  return (
    <div className="nimbus-container">
      <div className="main-payment">
        <CounterSection />
        <CartCard />
      </div>
    </div>
  );
}
