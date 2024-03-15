
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HeroImg from "../assets/hero-section/hero-img.svg";
import HeroLogo from "../assets/hero-section/UCB.svg";
import CountdownSection from "../Components/Countdown-section";
import HighlightsSection from "../Components/Highlights-Section";
import ScheduleSection from "../Components/Schedule-section";
import ControlledAccordions from "../Components/Accordion";
import "./Hero-section.css";
import Footer from "../Components/Footer";
import axios from "axios";

export default function HeroSection() {
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/rest/api/public/ctlanding`);
        if (response.data.responceId === "OS" && response.data.responce === "Operation Successfully") {
          console.log("Success Landing");
        } else {
          console.log("Unexpected response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAPI();
  }, []);

  return (
    <>
      <section id="hero-section">
        <div className="nimbus-container">
          <div className="hero-container">
            <nav>
              <div className="logo">
                <img src={HeroLogo} alt="" />
              </div>
              <ul className="main-nav">
                <a href="#schedule-section" style={{ textDecoration: "none" }}>
                  <li className="nav-link">Schedule</li>
                </a>
                <a href="#highlights-section" style={{ textDecoration: "none" }}>
                  <li className="nav-link">Party highlights</li>
                </a>
              </ul>
            </nav>
            <div className="hero-main-container">
              <div className="hero-img">
                <img src={HeroImg} alt="" />
              </div>
              <div className="extra-div"></div>
              <div className="hero-info-box">
                <h2 className="hero-title">United Colors of</h2>
                <h2 className="hero-title-blue">Bangalore</h2>
                <p className="hero-subtitle">
                  Your Favourite Holi event is coming to Bangalore on
                </p>
                <div className="hero-date-box">
                  {/* <span className="hero-date-day">Sunday </span> */}
                  <div className="date-time">
                     <span className="hero-date-date">Sunday | 24th March, 2024</span>
               
                    </div>  
                 
                </div> <span className="hero-time">11:30 AM TO 4:30 PM</span>
                <Link to="/payment" style={{ textDecoration: "none" }}>
                  <button className="hero-btn">Book Tickets Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CountdownSection></CountdownSection>
      <HighlightsSection></HighlightsSection>
      <ScheduleSection></ScheduleSection>
      <ControlledAccordions />
      <Footer></Footer>
    </>
  );
}
