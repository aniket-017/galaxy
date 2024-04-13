import React, { useEffect, useState } from "react";
import "./Home.css";
import Typewriter from "typewriter-effect";
import { FaAward, FaTools, FaUserTie, FaBuilding, FaHammer, FaIndustry, FaRoad, FaTasks } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiBuilding2Fill } from "react-icons/ri";
import { MdWork } from "react-icons/md";
// Import the TypeWriter component

import a3 from "../assets/images/hero/quality.png";
import a4 from "../assets/images/hero/ensuranceCompliance.png";
import a1 from "../assets/images/hero/onTimeDelivery.png";
import a2 from "../assets/images/hero/Saftey.png";
import a5 from "../assets/images/hero/properDocument.png";
import b1 from "../assets/images/hero/profession/Owner.png";
import b2 from "../assets/images/hero/profession/Director.png";
import b3 from "../assets/images/hero/profession/ProjectLeader.png";
import b4 from "../assets/images/hero/profession/EngineeringIncharge.png";
import b5 from "../assets/images/hero/profession/Consultant.png";
import c1 from "../assets/images/hero/construction/residentialTower.png";
import c2 from "../assets/images/hero/construction/commercialBuildings.png";
import c3 from "../assets/images/hero/construction/researchCenter.png";
import c4 from "../assets/images/hero/construction/industries.png";
import c5 from "../assets/images/hero/construction/Warehouse.png";
import c6 from "../assets/images/hero/construction/logisticPark.png";
import c7 from "../assets/images/hero/construction/bridges.png";

import first from "../assets/images/project/industrialBuildings.jpg";
import second from "../assets/images/project/Infrastructures bridges,flyovers and auqaducts.jpg";
import third from "../assets/images/project/interior & fitouts, repair & renovation.jpg";
import fourth from "../assets/images/project/Commercial Buildings,Residential Projects.jpg";


import certificate1 from "../assets/images/certificate1.png"
import certificate2 from "../assets/images/certificate 2.png"
import award1 from "../assets/images/award1.png"
import award2 from "../assets/images/award2.png"
const Home = () => {
  const beliefs = [
    { text: "On time deliver", image: a1 },
    { text: "With safety", image: a2 },
    { text: "Within quality parameters", image: a3 },
    { text: "Ensure compliance", image: a4 },
    { text: "Proper documents", image: a5 },
  ];

  const professions = [
    { text: "Owner", image: b1 },
    { text: "Director", image: b2 },
    { text: "Project Leader", image: b3 },
    { text: "Engineering incharge", image: b4 },
    { text: "Consultant", image: b5 },
  ];

  const constructions = [
    { text: "Residential tower", image: c1 },
    { text: "Commercial Buildings", image: c2 },
    { text: "R&D center", image: c3 },
    { text: "Industrial Buildings", image: c4 },
    { text: "Warehouse", image: c5 },
    { text: "Logistic park", image: c6 },
    { text: "Bridges", image: c7 },
  ];

  const [currentBeliefIndex, setCurrentBeliefIndex] = useState(0);
  const [currentProfessionIndex, setCurrentProfessionIndex] = useState(0);
  const [firstLoopFinished, setFirstLoopFinished] = useState(false);
  const [secondLoopFinished, setSecondLoopFinished] = useState(false);
  const [currentConstructionIndex, setCurrentConstructionIndex] = useState(0);
  const [constructionFinished, setConstructionFinished] = useState(false);

  const [animationClasses, setAnimationClasses] = useState(["", "", "", ""]);

  useEffect(() => {
    // Trigger animation for each image with a delay
    setTimeout(() => setAnimationClasses((classes) => [...classes.slice(0, 1), "animate", "", ""]), 18100);
    setTimeout(() => setAnimationClasses((classes) => [...classes.slice(0, 2), "animate", ""]), 18600);
    setTimeout(() => setAnimationClasses((classes) => [...classes.slice(0, 3), "animate"]), 19100);
  }, []);

  useEffect(() => {
    const beliefInterval = setInterval(() => {
      setCurrentBeliefIndex((prevIndex) => (prevIndex === beliefs.length - 1 ? 0 : prevIndex + 1));
      if (currentBeliefIndex === beliefs.length - 1) {
        setFirstLoopFinished(true);
      }
    }, 1000);

    const professionInterval = setInterval(() => {
      if (firstLoopFinished && !secondLoopFinished) {
        setCurrentProfessionIndex((prevIndex) => (prevIndex === professions.length - 1 ? 0 : prevIndex + 1));
        if (currentProfessionIndex === professions.length - 1) {
          setSecondLoopFinished(true);
        }
      }
    }, 1000);

    const constructionInterval = setInterval(() => {
      if (secondLoopFinished && !constructionFinished) {
        setCurrentConstructionIndex((prevIndex) => (prevIndex === constructions.length - 1 ? 0 : prevIndex + 1));
        if (currentConstructionIndex === constructions.length - 1) {
          setConstructionFinished(true);
        }
      }
    }, 1000);

    return () => {
      clearInterval(beliefInterval);
      clearInterval(professionInterval);
      clearInterval(constructionInterval);
    };
  }, [
    currentBeliefIndex,
    firstLoopFinished,
    currentProfessionIndex,
    secondLoopFinished,
    currentConstructionIndex,
    constructionFinished,
  ]);

  return (
    <div>
      <section className="container2 dynamic-content">
        {/* Loop 1 */}
        {!firstLoopFinished ? (
          <div className="row">
            <div className="column">
              <span className="bold">At Progressive, we believe in </span>
              <span className="bold2">{beliefs[currentBeliefIndex].text}</span>
            </div>
            <div className="column">
              <div className="animation-container">
                <div className="visible">
                  <img
                    className="himg"
                    src={beliefs[currentBeliefIndex].image}
                    alt={beliefs[currentBeliefIndex].text}
                  />
                  {/* <p className="htext">{beliefs[currentBeliefIndex].text}</p> */}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Loop 2 */}
        {firstLoopFinished && !secondLoopFinished ? (
          <div className="row">
            <div className="column">
              <span className="bold">So whether you are </span>
              <span className="bold2">{professions[currentProfessionIndex].text}</span>
            </div>
            <div className="column">
              <div className="animation-container">
                <div className="visible">
                  <img
                    className="himg"
                    src={professions[currentProfessionIndex].image}
                    alt={professions[currentProfessionIndex].text}
                  />
                  {/* <p className="htext">{professions[currentProfessionIndex].text}</p> */}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Loop 3 */}
        {secondLoopFinished && !constructionFinished ? (
          <div className="row">
            <div className="column">
              <span className="bold">And you want to construct </span>
              <span className="bold2">{constructions[currentConstructionIndex].text}</span>
            </div>
            <div className="column">
              <div className="animation-container">
                <div className="visible">
                  <img
                    className="himg"
                    src={constructions[currentConstructionIndex].image}
                    alt={constructions[currentConstructionIndex].text}
                  />
                  {/* <p className="htext">{constructions[currentConstructionIndex].text}</p> */}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Typing Effect */}
        {constructionFinished && (
          <div>
            <div className="achyut">
              <img src={c1} alt="Image 1" className={`achyutimagination ${animationClasses[0]}`} />
              <img src={c2} alt="Image 2" className={`achyutimagination ${animationClasses[1]}`} />
              <img src={c3} alt="Image 3" className={`achyutimagination ${animationClasses[2]}`} />
              <img src={c4} alt="Image 4" className={`achyutimagination ${animationClasses[3]}`} />
            </div>
            <div className="achyuttext">
              {/* <h3 className="achyuttext">Or just any Construction, Our team will do the same </h3> */}

              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(3000)
                    .typeString("Or just any Construction,")
                    .pauseFor(500)
                    .typeString(" Our team will do the same.")
                    .pauseFor(500)
                    // .deleteAll()
                    // .typeString(" And provide you with a seamless experience By taking care of your end customer.")
                    // .pauseFor(500)
                    // .typeString("<br>")
                    // .typeString(" Helping you to focus on other things that matter most.")
                    .start();
                }}
                typingSpeed={20}
                options={{
                  wrapperClassName: "custom-typewriter", // Add a custom class to the typewriter wrapper
                  cursorClassName: "custom-cursor", // Optional: Add a custom class to the typewriter cursor
                }}
              />
            </div>
          </div>
        )}
      </section>

      {/* About Us section */}
      <section className="about-section">
        <div className="about-container">
          <h2>About Us</h2>
          <p>
            Welcome to Progressive Galaxy! Progressive Civil Construction Company is a leading civil construction and
            infrastructure development company based in India. With over 40 years of experience, we have been delivering
            effective and high-quality project solutions to our clients.
          </p>
          <p>
            Our versatile capabilities include constructing multistoried buildings, industrial structures, factory
            buildings, residential and commercial complexes, bridges, and flyovers of any size and scale. We are
            dedicated to providing high-quality construction that is on time and within budget, earning us a reputation
            as one of the most reliable and dependable civil engineering construction companies in the entire western
            India region.
          </p>
          <p>
            Our team comprises highly skilled engineers with vast experience in various domains, having handled projects
            for both private and government organizations. Our clientele includes leading multinational companies and
            various government departments.
          </p>
        </div>
      </section>

      {/* Key Features section */}
      <section className="features-section">
        <div className="features-container">
          <h2>Key Features</h2>
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-item">
              <FaAward className="feature-icon" />
              <h3>4 Decades of Excellence</h3>
              <p>In delivering effective & high-quality solutions.</p>
            </div>
            {/* Feature 2 */}
            <div className="feature-item">
              <FaTools className="feature-icon" />
              <h3>Complexity Unwinded</h3>
              <p>Practical Approach towards Complex Projects.</p>
            </div>
            {/* Feature 3 */}
            <div className="feature-item">
              <MdWork className="feature-icon" />
              <h3>Award Winning</h3>
              <p>Infra Projects.</p>
            </div>
            {/* Feature 4 */}
            <div className="feature-item">
              <FaUserTie className="feature-icon" />
              <h3>Highly Dedicated Team</h3>
              <p>We strive to achieve nothing but the best.</p>
            </div>
            {/* Feature 5 */}
            <div className="feature-item">
              <FaBuilding className="feature-icon" />
              <h3>Turnkey Solutions</h3>
              <p>For Industrial Projects.</p>
            </div>
            {/* Feature 6 */}
            <div className="feature-item">
              <FaHammer className="feature-icon" />
              <h3>In-house Equipment</h3>
              <p>For Optimum Speed and Delivery.</p>
            </div>
            {/* Feature 7 */}
            <div className="feature-item">
              <FaIndustry className="feature-icon" />
              <h3>Customized Solutions</h3>
              <p>For Unique Project Needs.</p>
            </div>
            {/* Feature 8 */}
            <div className="feature-item">
              <GiHamburgerMenu className="feature-icon" />
              <h3>Customer Satisfaction</h3>
              <p>Ensuring Happy Clients.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="expertise-section">
        <div className="expertise-container">
          <h2>Core Areas of Expertise</h2>
          <div className="expertise-grid">
  {/* Area 1 */}
  <div className="expertise-item">
    <div className="iconcol">
      <FaBuilding color="#333" className="expertise-icon" /> {/* Add the icon */}
    </div>
    <div className="infocol">
      <h3>Industrial Buildings</h3>
      <p>Progressive takes pride in our engineering work done for industrial buildings...</p>
    </div>
  </div>
  {/* Area 2 */}
  <div className="expertise-item">
    <div className="iconcol">
      <RiBuilding2Fill color="#333" className="expertise-icon" /> {/* Add the icon */}
    </div>
    <div className="infocol">
      <h3>Infrastructure Projects</h3>
      <p>We have received accolades for our work in infrastructure projects...</p>
    </div>
  </div>
  {/* Area 3 */}
  <div className="expertise-item">
    <div className="iconcol">
      <FaRoad color="#333" className="expertise-icon" /> {/* Add the icon */}
    </div>
    <div className="infocol">
      <h3>Road Construction</h3>
      <p>Our team has extensive experience in road construction projects...</p>
    </div>
  </div>
  {/* Area 4 */}
  <div className="expertise-item">
    <div className="iconcol">
      <FaTasks color="#333" className="expertise-icon" /> {/* Add the icon */}
    </div>
    <div className="infocol">
      <h3>Special Assignments</h3>
      <p>
        No task is too big or too difficult at Progressive. Our team has actively completed a variety of special
        assignments...
      </p>
    </div>
  </div>
</div>

        </div>
      </section>

      {/* Statistics and Awards section */}
      <section className="stats-awards-section">
  <div className="stats-awards-container">
    <h2>Statistics and Awards</h2>
    <div className="stats-awards-grid">
      {/* Stats */}
      <div className="stats-item">
        <img className="certificate"src={certificate1} alt="Certificate 1" />
        <img className="certificate"src={certificate2} alt="Certificate 2" />
        <img className="awards"src={award1} alt="Award 1" />
        <img className="awards"src={award2} alt="Award 2" />
      </div>
      {/* Awards */}
   
    </div>
  </div>
</section>

      {/* Contact Us section */}
      <section className="contact-section">
        <div className="contact-container">
          <h2>Contact Us</h2>
          <p>Get in touch with us for inquiries or projects.</p>
          {/* Contact form or contact details can be added here */}
        </div>
      </section>

      {/* Footer section */}
      <footer className="footer">
        <div className="footer-container">{/* Footer content */}</div>
      </footer>

      {/* ADD REMAINING CONTENT HERE */}
    </div>
  );
};

export default Home;
