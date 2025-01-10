import React from "react";
import "./Footer.css"; // Make sure to create and import a CSS file for the styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>Home</h3>
          <ul>
            <li>
              <a href="/">Core Areas of Expertise</a>
            </li>
            <li>
              <a href="/">Turnkey Projects: Your One-Stop Solution</a>
            </li>
            <li>
              <a href="/">Our Achievements</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>About Us</h3>
          <ul>
            <li>
              <a href="/aboutus">Our Mission</a>
            </li>
            <li>
              <a href="/aboutus">Our Vision</a>
            </li>
            <li>
              <a href="/aboutus">Our Team</a>
            </li>
            <li>
              <a href="/aboutus">Our History</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Projects</h3>
          <ul>
            <li>
              <a href="/projects">Industrial Buildings</a>
            </li>
            <li>
              <a href="/projects">Multistored Buildings</a>
            </li>
            <li>
              <a href="/projects">Infrastructure</a>
            </li>
            <li>
              <a href="/projects">Special Assignment</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Career</h3>
          <ul>
            <li>
              <a href="/careerPage">Our Initiatives</a>
            </li>
            <li>
              <a href="/careerPage">Life at Progressive Galaxy</a>
            </li>
            <li>
              <a href="/careerPage">Why Work With Us?</a>
            </li>
            <li>
              <a href="/careerPage">Join Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>428, Vardhaman Market,</p>
          <p>Plot No. 75, Sector-17,</p>
          <p>Opp. Andhra Bank, Vashi,</p>
          <p>Navi Mumbai, Maharashtra, India.</p>
          <p>Pin - 400703.</p>
          <p>Tele: +91- (022) 27882021</p>
          <p>marketing@progressivegalaxy.com</p>
        </div>
      </div>
      <div className="footer-rights">
        <p>All rights reserved © 2025 Progressive Galaxy</p>
      </div>
    </footer>
  );
};

export default Footer;
