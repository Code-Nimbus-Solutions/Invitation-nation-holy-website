import { Link } from "react-router-dom";
import React from "react";
import HeroImg from "../assets/hero-section/hero-img.svg";
import HeroLogo from "../assets/hero-section/UCB.svg";
import CountdownSection from "../Components/Countdown-section";
import HighlightsSection from "../Components/Highlights-Section";
import ScheduleSection from "../Components/Schedule-section";
import "./Hero-section.css";

export default function HeroSection() {
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
                <li className="nav-link">Schedule</li>
                <li className="nav-link">Party highlights</li>
              </ul>
            </nav>
            <div className="hero-main-container">
              <div className="hero-img">
                <img src={HeroImg} alt="" />
              </div>
              <div className="extra-div"></div>
              <div className="hero-info-box">
                <h2 className="hero-title">United Colors of</h2>
                <h2 className="hero-title-blue">Bangalore.</h2>
                <p className="hero-subtitle">
                  Your Favourite Holi event is coming to Bangalore on
                </p>
                <div className="hero-date-box">
                  <span className="hero-date-day">Sunday </span>
                  <span className="hero-date-date">25th March, 2024</span>
                </div>
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
    </>
  );
}
