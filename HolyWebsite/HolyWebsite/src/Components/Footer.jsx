import React from "react";
import "./Footer.css";
import Logo from "../assets/footer-section/invi-logo.svg";

const Footer = () => {
  return (
    <>
      <section id="footer-section">
        <div className="nimbus-container">
          <div className="footer-container">
            <h3 className="footer-subtitle">
              Invite Website Made by Invitation nation
            </h3>
            <h2 className="footer-title">Invitation nation</h2>
            <div className="footer-img">
              <a target="_blank" href="https://invitationnation.in">
                <img src={Logo} alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;