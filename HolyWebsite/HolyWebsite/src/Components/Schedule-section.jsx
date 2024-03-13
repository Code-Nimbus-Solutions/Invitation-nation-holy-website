import React from "react";
import "./Schedule-section.css";
import { Link } from "react-router-dom";
import DecorationLeft from "../assets/schedule-section/left-colors.svg";
import DecorationRight from "../assets/schedule-section/right-colors.svg";

const ScheduleSection = () => {
  return (
    <>
      <section id="schedule-section">
        <div className="nimbus-container">
          <div className="schedule-container">
            <div className="schedule-decoration-left">
              <img src={DecorationLeft} alt="" />
            </div>
            <div className="schedule-decoration-right">
              <img src={DecorationRight} alt="" />
            </div>
            <h2 className="schedule-title">Party plan</h2>
            <div className="schedule-info-box">
              <div className="schedule-element">
                <span className="schedule-time">11:00 am</span>
                <div className="schedule-line"></div>
                <span className="schedule-element-title">Gates Open</span>
              </div>
              <div className="schedule-element">
                <span className="schedule-time">11:30 am</span>
                <div className="schedule-line"></div>
                <span className="schedule-element-title">
                  Food stalls + Fun activities opens{" "}
                </span>
              </div>
              <div className="schedule-element">
                <span className="schedule-time">11:30 am</span>
                <div className="schedule-line"></div>
                <span className="schedule-element-title">DJ PARTY Starts</span>
              </div>
              <div className="schedule-element">
                <span className="schedule-time">11:30 am</span>
                <div className="schedule-line"></div>
                <span className="schedule-element-title">
                  Complimentary Drink + Bar opens
                </span>
              </div>
              <div className="schedule-element">
                <span className="schedule-time">12:30 pm</span>
                <div className="schedule-line"></div>
                <span className="schedule-element-title">
                  Complimentary Lunch ( Veg & Non-veg )
                </span>
              </div>
              <div className="schedule-element">
                <span className="schedule-time">04:00 pm</span>
                <div className="schedule-line"></div>
                <span className="schedule-element-title">
                  Surprise Activity
                </span>
              </div>
            </div>
            <Link to="/payment" style={{ textDecoration: "none" }}>
              <button className="schedule-btn">Book Tickets Now</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScheduleSection;