import React, { useEffect, useState } from "react";
import "./History.css";
import axios from "axios";
// import "../fonts/Grunge.ttf"
// import "../fonts/Hey March.ttf"
import { FaRocket, FaEye } from "react-icons/fa";
import Loading from "../components/Loading";
// import dummy from "../assets/images/team members/profiledummy.png";
// import director from "../assets/images/team members/director 2.jpg";
// import t3 from "../assets/images/team members/Ashlesha Ambade.jpeg";
// import t1 from "../assets/images/team members/uday abhang.png";
// import t4 from "../assets/images/team members/ulhas abhang.jpeg";
// import t5 from "../assets/images/team members/Satish Madhle.jpeg";
// import t6 from "../assets/images/team members/ramdas wanjare.jpeg";
// import t2 from "../assets/images/team members/rajkar sir.jpeg";
// import t9 from "../assets/images/team members/Dnyaneshwar Patil.png";
// import t10 from "../assets/images/team members/Ramesh Yadav.jpeg";
// import t11 from "../assets/images/team members/Shirish Satam.jpeg";
// import first from "../assets/images/project/industrialBuildings.jpg";
// import y1976 from "../assets/images/history/1976.jpg";
// import y1988 from "../assets/images/history/1988.jpg";
// import y1997 from "../assets/images/history/1997.jpg";
// import y1982 from "../assets/images/history/1982.jpg";
// import y2007 from "../assets/images/history/2007.JPG";

// import c8 from "../assets/images/celebration/c8.jpeg";
// import c9 from "../assets/images/celebration/c9.jpeg";
// import c10 from "../assets/images/celebration/c10.jpeg";
// import c11 from "../assets/images/celebration/c11.jpeg";
// import c12 from "../assets/images/celebration/c12.jpeg";
// import c13 from "../assets/images/celebration/c13.jpeg";
// import c14 from "../assets/images/celebration/c14.jpeg";
// import c15 from "../assets/images/celebration/c15.jpeg";
// import c16 from "../assets/images/celebration/c16.jpeg";

import Policy from "./Policy.js";
const History = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [leadership, setLeadership] = useState({ chairman: null, director: null });
  const [leadershipLoading, setLeadershipLoading] = useState(true);

  useEffect(() => {
    // Fetch team members and leadership
    fetchTeamMembers();
    fetchLeadership();

    // define variables
    const items = document.querySelectorAll(".timeline li");

    // check if an element is in viewport
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }

    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);

    // cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("load", callbackFunc);
      window.removeEventListener("resize", callbackFunc);
      window.removeEventListener("scroll", callbackFunc);
    };
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setTeamLoading(true);
      const response = await axios.get("/aak/l1/team");
      if (response.data.success) {
        setTeamMembers(response.data.members);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      // Fallback to empty array if API fails
      setTeamMembers([]);
    } finally {
      setTeamLoading(false);
    }
  };

  const fetchLeadership = async () => {
    try {
      setLeadershipLoading(true);
      const response = await axios.get("/aak/l1/leadership");
      if (response.data.success) {
        const leaders = response.data.leaders;
        const chairman = leaders.find((leader) => leader.role === "Chairman");
        const director = leaders.find((leader) => leader.role === "Director");
        setLeadership({ chairman, director });
      }
    } catch (error) {
      console.error("Error fetching leadership:", error);
      // Fallback to default if API fails
      setLeadership({
        chairman: {
          name: "C M Abhang",
          photoUrl:
            "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721300950/Progressive/team%20members/cma_htazbf.jpg",
          message: "Default Chairman message...",
          signature: "With best regards,\nC M Abhang.\nChairman.",
        },
        director: {
          name: "U C Abhang",
          photoUrl:
            "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778851/Progressive/team%20members/director_2_adxfuf.jpg",
          message: "Default Director message...",
          signature: "Warm regards,\nU C Abhang\nDirector.",
        },
      });
    } finally {
      setLeadershipLoading(false);
    }
  };

  // const safetyPhotos = [
  //   c8,
  //   c11,
  //   c12,
  //   c13,
  //   c14,
  //   c15,
  //   c16,

  // ];

  return (
    <div>
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p className="mission-text">
            We exist because it is <span className="highlight">our mission</span>
            <br />
            to be <span className="highlight">a brand of repute</span>
            <br />
            that <span className="highlight">designs, builds & maintains</span>
            <br />
            <span className="highlight">monumental projects universally</span>
            <br />
            by <span className="highlight">incorporating diverse technologies</span>,<br />
            delivering <span className="highlight">stellar performance</span>
            <br />
            delighting our customers
            <br />
            with <span className="highlight">high-quality Samruddh people</span>
            <br />
            who are <span className="highlight">proud to be associated</span>
            <br />
            with the <span className="highlight">Progressive Galaxy network </span>.
          </p>
        </div>
        {/* <div className="mission-image">
          <img
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721540669/Progressive/vision_mission/mission_ul3oge.png"
            alt="Mission Image"
          />
        </div> */}
        <div className="vision-content">
          <h2>Our Vision</h2>
          <p className="vision-text">
            Heart to heart, <span className="highlight">our vision</span> is to be
            <br />
            <span className="highlight">a global Design Built company</span>
            <br />
            most admired for
            <br />
            <span className="highlight">its people, projects, and performance</span>.
          </p>
        </div>
      </section>

      {/* <section className="vision-section">
        <div className="vision-image">
          <img
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721540668/Progressive/vision_mission/vision_eosdsn.png"
            alt="Vision Image"
          />
        </div>
        <div className="vision-content">
          <h2>Our Vision</h2>
          <p className="vision-text">
            Heart to heart, <span className="highlight">our vision</span> is to be
            <br />
            <span className="highlight">a global Design Built company</span>
            <br />
            most admired for
            <br />
            <span className="highlight">its people, projects, and performance</span>.
          </p>
        </div>
      </section> */}

      <section className="director-message-section">
        <h2>Chairman's Message</h2>
        {leadershipLoading ? (
          <Loading message="Loading Chairman's message..." fullScreen={false} />
        ) : leadership.chairman ? (
          <div className="director-message-content">
            <div className="chairman-info">
              <img
                src={leadership.chairman.photoUrl}
                alt={leadership.chairman.name}
                className="director-photo"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x300/cccccc/666666?text=Chairman";
                }}
              />
              <div className="director-text">
                {leadership.chairman.message.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {leadership.chairman.signature && (
                  <p className="signature">
                    {leadership.chairman.signature.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < leadership.chairman.signature.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-message">
            <p>Chairman's message not available.</p>
          </div>
        )}
      </section>

      <section className="director-message-section">
        <h2>Director's Message</h2>
        {leadershipLoading ? (
          <Loading message="Loading Director's message..." fullScreen={false} />
        ) : leadership.director ? (
          <div className="director-message-content">
            <div className="director-info">
              <img
                src={leadership.director.photoUrl}
                alt={leadership.director.name}
                className="director-photo"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x300/cccccc/666666?text=Director";
                }}
              />
              <div className="director-text">
                {leadership.director.message.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {leadership.director.signature && (
                  <p className="signature">
                    {leadership.director.signature.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < leadership.director.signature.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-message">
            <p>Director's message not available.</p>
          </div>
        )}
      </section>

      <section className="team-info" id="ourteam">
        <div className="hiscontainer">
          <h2>Our Team</h2>
          {teamLoading ? (
            <Loading message="Loading team members..." fullScreen={false} />
          ) : (
            <ul className="team-list">
              {teamMembers.map((member) => (
                <li key={member._id}>
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150x150/cccccc/666666?text=No+Image";
                    }}
                  />
                  <strong>{member.name}</strong> ({member.position})
                  {(member.socialLinks?.linkedin || member.socialLinks?.twitter || member.socialLinks?.facebook) && (
                    <div className="social-links">
                      {member.socialLinks.linkedin && (
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-linkedin"></i>
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-twitter"></i>
                        </a>
                      )}
                      {member.socialLinks.facebook && (
                        <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-facebook"></i>
                        </a>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="safety-section">
        <h2>Our Policies</h2>
        <p>
          &nbsp; At Progressive, we are dedicated to maintaining high standards across all facets of our operations. Our
          policies reflect our commitment to quality, social responsibility, health, safety, and environmental
          sustainability. Below are the key policies that guide our practices and ensure we adhere to the best standards
          in the industry.
        </p>
        <Policy />
        {/* <div className="safety-introduction">
          <p>
            At Progressive Galaxy, safety is our top priority. We are committed to maintaining a safe and healthy work
            environment for all our employees, contractors, and visitors. Our comprehensive safety policies and measures
            ensure that everyone on our sites is protected and informed.
          </p>
        </div>
        <div className="safety-policies">
          <h3>Our Safety Policies and Measures</h3>
          <ul>
            <li>Regular safety drills and emergency preparedness training</li>
            <li>Use of personal protective equipment (PPE) at all times</li>
            <li>Strict adherence to safety protocols and guidelines</li>
            <li>Continuous monitoring and improvement of safety practices</li>
          </ul>
        </div> */}
        {/* <div className="safety-training">
          <h3>Safety Training Programs</h3>
          <p>
            We provide ongoing safety training programs to ensure our employees are well-versed in the latest safety
            practices and procedures. Our training programs cover a wide range of topics, including hazard recognition,
            emergency response, and safe equipment operation.
          </p>
        </div>
        <div className="safety-certifications">
          <h3>Safety Certifications and Awards</h3>
          <p>
            Progressive Galaxy has been recognized for its commitment to safety with numerous certifications and awards.
            We are proud to be a leader in safety in the construction industry.
          </p>
        </div>
        <div className="photo-gallery">
          {safetyPhotos.map((photo, index) => (
            <img key={index} src={photo} alt={`Safety at Progressive ${index + 1}`} />
          ))}
        </div> */}
      </section>

      {/* <section class="intro">
        <div class="hiscontainer">
          <h1 className="hishead">Our History &darr;</h1>
          <div class="hisinfo">
            <p>
              Progressive Construction Co (PCC) was formed in the year 1976, by two engineers Mr. C. M. Abhang and Mr.V.
              D. Trivedi. Prior to forming the company, both were associate engineers of L&T. Driven by the
              entrepreneurial passion and the combined talents across various domains the company started with humble
              beginnings.
            </p>
            <p>
              With a vision to create a world-class construction and real estate development company with the highest
              standards of professionalism, ethics and customer service, Progressive Civil Construction Company soon
              earned a reputation for its high quality work and speedy construction. The company very soon ventured into
              building constructions, industrial construction and bridges. The versatile and complex nature of these
              projects, though challenging were integral to the part of the overall growth of the company. This
              diversification has helped in evolving Progressive Civil Construction Company into a leading civil
              construction and infrastructure development company in India.
            </p>
            <p>
              The company has completed over 750 major projects within Maharashtra and other states of India. Our
              clients include leading private companies such as Siemens ,Larsen and Toubro, Asian Paints, Johnson and
              Johnson, Hindustan DorrOliver, Godrej, etc. We have also executed projects for various government
              departments such as PWD (Public Works Department, Maharastra), IRCON (Indian Railways Construction), MJP
              (Maharashtra Jeevan Pradhikaran), BARC (Bhabha Atomic Research Centre), MTP, etc. Our client list includes
              some of the biggest names in both the private and public sectors.
            </p>
          </div>
        </div>
      </section>

      <section class="timeline">
        <ul>
          <li>
            <div>
              
              <time>2015</time> Completed two major residential towers G+9 each for Narayan Aura, Vadodara.
            </div>
          </li>
          <li>
            <div>
              <time>2014</time> Executed warehouse facility for Kelloggs India Pvt. Ltd. at Taloja, used lazer tremix
              machines for better finish.
            </div>
          </li>
          <li>
            <div>
              <time>2013</time> Executed major civil, structural & infrastructural facility for L & T, Heavy Engineering
              Division at Pune.
            </div>
          </li>
          <li>
            <div>
              <time>2012</time> Construction of two lane high level bridge at Panvel for PWD.
            </div>
          </li>
          <li>
            <div>
              <time>2011</time>Cobalt 66 Radiation Unit in Vashi. Executed first irradiation plant for Agriculture Dept.
              of Maharashtra, which is at forefront in adopting new technologies.
            </div>
          </li>
          <li>
            <div>
              <time>2010</time> Civil and structural work (ISBL) for Propane / LPG Storage and handling facilities at
              Uran LPG plant. Achieved milestone for single largest continuous concrete pour in BPCL of 750 Cum in
              record of 15 hrs.
            </div>
          </li>
          <li>
            <div>
              <time>2009</time> Construction of major and minor bridges on Aurangabad-Jalna Road spanning 80 KMS and
              total 45 structures.
            </div>
          </li>
          <li>
            <div>
              <time>2008</time>Repeat order from Asian Paints for construction of R & D Centre at Navi Mumbai. This
              project was completed much before completion date and hence, received the bonus award.
            </div>
          </li>
          <li>
            <div>
             
              <time>2007</time> Construction of complete facility for Industrial paints plant for Asian Paints at
              Taloja, Tal. Panvel, Dist. Raigad
            </div>
          </li>
          <li>
            <div>
              <time>2006</time> Completes the 250 project on completion of Asian Paints – Industrial paints
              manufacturing unit from start to finish. The company also completes ‘three decades’ – in the construction
              industry. Construction of factory complex at KIADB Industrial Area, Bangalore for Microtrol Sterilization
              Services Pvt. Ltd. Received award from the Chairman of BARC for execution of India’s first private
              radioactive venture for Cobol 66 Radiation Unit at Bangalore.
            </div>
          </li>
          <li>
            <div>
              <time>2005</time> Company lands in Bangalore – its first out of state project - Godrej factory building
              and Cobalt 66 Radiation unit. Construction of approaches to R.O.B. and service road joining East and West
              of Kulgaon-Badlapur, Tal. Ambernath, Dist. Thane.
            </div>
          </li>
          <li>
            <div>
              <time>2004</time> Carpark gets popular in India. One of the first ‘only cars’ Car Park tower is
              constructed in India by the company with German design for multinational client – Siemens. Construction of
              Bharat Ratna Dr. Babasaheb Ambedkar National Memorial at Mahad, Dist. Raigad. It includes auditorium,
              museum, swimming pool, library etc.
            </div>
          </li>
          <li>
            <div>
              <time>2003</time> Renovation and extension of rural hospital at Georai, Dist. Beed. This is the project of
              Maharashtra Health System Development, Mumbai.
            </div>
          </li>
          <li>
            <div>
              <time>2002</time> Construction of major bridge on Mumbai-Agra Road NH-3 having sandy Kumbheri river with
              stagnant subsoil water.
            </div>
          </li>
          <li>
            <div>
              <time>2001</time> Construction of bridge on Ahmedabad Mumbai Highway NH-8 for Executive Engineer, National
              Highway Division-III, Thane.
            </div>
          </li>
          <li>
            <div>
              <time>2000</time>Company being awarded the fast track project award for construction of Desai Creek Bridge
              completion of the project in record time of 86 days. This is still a record project for creek bridge in
              Maharashtra.
            </div>
          </li>
          <li>
            <div>
              <time>1999</time> The company gets awarded the ‘first’ prize at National level by Indian Institute of
              Bridge engineers for construction of Savitri bridge at Mahad on Mumbai- Goa road.
            </div>
          </li>
          <li>
            <div>
              
              <time>1997</time> The company gets its first projects in the public works department after being
              registered. Thereafter the company has executed more 3 dozen bridges in various districts of Maharashtra
            </div>
          </li>
          <li>
            <div>
              <time>1992</time> Awarded the bridge portion of the 3 km stretch of the Konkan Railway project – the first
              major project initiated by the government in one of the most difficult terrain in Maharashtra.
            </div>
          </li>
          <li>
            <div>
              <time>1989</time>Company gets the project for the construction of the podium work at Prabhadevi, Mumbai.
              The client being happy on the speed and quality awarded the G+23 storied building project. This is the
              highest project constructed by the company till date.
            </div>
          </li>
          <li>
            <div>
            
              <time>1988</time> Company becomes a private limited company.
            </div>
          </li>
          <li>
            <div>
              <time>1986</time> Company initiates its first ever real estate venture at Airoli. The company does huge
              progress in the real estate venture doing various project in the Navi Mumbai region.
            </div>
          </li>
          <li>
            <div>
             
              <time>1982</time> Starts operations in Navi Mumbai area. Received projects from the ‘Tata’ scientist and
              officers housing project and various projects in CIDCO.
            </div>
          </li>
          <li>
            <div>
       
              <time>1976</time> Company was established and started its construction operations with its first work
              “Construction of bridge on nalla in RCF” in Trombay, Mumbai.
            </div>
          </li>
        </ul>
      </section> */}
    </div>
  );
};

export default History;
