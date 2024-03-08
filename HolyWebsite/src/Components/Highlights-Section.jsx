import React from "react";
import { Link } from "react-router-dom";
import Safety from "../assets/highlights-section/Safety.svg";
import Location from "../assets/highlights-section/Location.svg";
import Theme from "../assets/highlights-section/Theme.svg";
import Drinks from "../assets/highlights-section/drinks.svg";
import Food from "../assets/highlights-section/food.svg";
import Activity from "../assets/highlights-section/activity.svg";
import Music from "../assets/highlights-section/music.svg";
import "./Highlights-Section.css";

const HighlightsSection = () => {
  return (
    <>
      <section id="highlights-section">
        <div className="nimbus-container">
          <div className="hightlights-container">
            <h2 className="highlights-title">
              Join us For a Unforgettable Holi Experience
            </h2>
            <div className="highlights-box">
              <div className="highlights-element">
                <div className="highlights-element-title">Safety</div>
                <div className="highlights-element-img">
                  <img src={Safety} alt="" />
                  <div className="highlights-element-text-box">
                    <p>
                      Organic Skin safe colors + Watched by Trained Celebrity
                      bodyguards
                    </p>
                    <span>Enjoy a Safe and happy holi party</span>
                  </div>
                </div>
              </div>
              <div className="highlights-element">
                <div className="highlights-element-title">Location</div>
                <div className="highlights-element-img">
                  <img src={Location} alt="" />
                  <div className="highlights-element-text-box">
                    <p>Enjoy Lake View party at the Dejavoo Resorts</p>
                    <span>5 mins Drive from Presidency College</span>
                  </div>
                </div>
              </div>
              <div className="highlights-element">
                <div className="highlights-element-title">Theme</div>
                <div className="highlights-element-img">
                  <img src={Theme} alt="" />
                  <div className="highlights-element-text-box">
                    <p>
                      Enjoy PAN India Mix - On demand DJ Concert + Rain Dance
                    </p>
                    <span>Join the fun Dj Manoj</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="highlights-details-box">
              <div className="highlights-details-element">
                <div className="highlights-details-info-box">
                  <p>Free Drink</p>
                  <span>+ Access to in-house bar</span>
                </div>
                <div className="highlights-details-img">
                  <img src={Drinks} alt="" />
                </div>
              </div>
              <div className="highlights-details-element">
                <div className="highlights-details-info-box">
                  <p>Free Lunch</p>
                  <span>+ Access to Food stalls</span>
                </div>
                <div className="highlights-details-img">
                  <img src={Food} alt="" />
                </div>
              </div>
              <div className="highlights-details-element">
                <div className="highlights-details-info-box">
                  <p>Rain Dance</p>
                  <span>+ 5+ paid Activities</span>
                </div>
                <div className="highlights-details-img">
                  <img src={Activity} alt="" />
                </div>
              </div>
              <div className="highlights-details-element">
                <div className="highlights-details-info-box">
                  <p>DJ Concert </p>
                  <span>Non stop party!</span>
                </div>
                <div className="highlights-details-img">
                  <img src={Music} alt="" />
                </div>
              </div>
            </div>
            <Link to="/payment" style={{ textDecoration: "none" }}>
              <button className="highlights-btn">Book Tickets Now</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HighlightsSection;
