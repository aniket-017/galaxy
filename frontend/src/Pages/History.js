import React, { useEffect } from "react";
import "./History.css";
import { FaRocket, FaEye } from 'react-icons/fa';
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
  useEffect(() => {
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
      WE EXIST because it is <span className="highlight">OUR MISSION</span> to be
      <span className="highlight"> A BRAND of REPUTE</span> that
      <span className="highlight"> designs, builds & maintains MONUMENTAL PROJECTS</span> universally by
      <span className="highlight"> INCORPORATING DIVERSE TECHNOLOGIES</span>, delivering
      <span className="highlight"> STELLAR PERFORMANCE</span> delighting our customers with
      <span className="highlight"> HIGH-QUALITY PEOPLE</span> who are
      <span className="highlight"> PROUD TO BE ASSOCIATED</span> with the
      <span className="highlight"> PROGRESSIVE NETWORK</span>.
    </p>
  </div>
  <div className="mission-image">
    <img src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721540669/Progressive/vision_mission/mission_ul3oge.png" alt="Mission Image" />
  </div>
</section>

<section className="vision-section">
  <div className="vision-image">
    <img src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721540668/Progressive/vision_mission/vision_eosdsn.png" alt="Vision Image" />
  </div>
  <div className="vision-content">
    <h2>Our Vision</h2>
    <p className="vision-text">
      Heart to heart, <span className="highlight">our vision</span> is to be
      <span className="highlight"> a global DB company</span> most admired for its
      <span className="highlight"> people, projects, and performance</span>.
    </p>
  </div>
</section>


      
      <section className="director-message-section">
      <h2>Chairman's Message</h2>
      <div className="director-message-content">
        <div className="chairman-info">
          <img  src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721300950/Progressive/team%20members/cma_htazbf.jpg" alt="Director" className="director-photo" />
          <div className="director-text">
            
            <p>
              Dear All,
            </p>
            <p>
            Welcome to our company's website.
            </p>
            <p>
            Reflecting on the journey that my partner and I embarked upon four decades ago, I am filled with immense pride and gratitude. From our humble beginnings, we have grown into a leading company in the field of construction, specializing in industrial structures, buildings, and infrastructure projects. Our portfolio is adorned with the names of leading brands, each a testament to our commitment to quality and excellence.
            </p>
            <p>
            Our success has been built on the timeless principles of sincerity, honesty, and hard work. These values have guided us through challenging times, shaping our reputation and fostering trust with our clients.
            </p>
            <p>
            As we look to the future, I am confident that the new leaders of our company, who have been trained under the same guiding principles, will achieve even greater successes.
            </p>
            <p>
            The future holds exciting possibilities. With a foundation built on strong values and a vision for growth, client satisfaction, and innovation, we are well-positioned to achieve bigger and better accomplishments.
            </p>
            <p>
            I sincerely thank all who have been part of our journey and welcome the new. Together, we will continue to build a legacy of excellence and success.
            </p>
           
            <p>
            With best regards,<br />
            C M Abhang.<br />
            Chairman.
            </p>
          </div>
        </div>
      </div>
    </section>

      <section className="director-message-section">
        <h2>Director's Message</h2>
        <div className="director-message-content">
          <div className="director-info">
            <img
              src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778851/Progressive/team%20members/director_2_adxfuf.jpg"
              alt="Director"
              className="director-photo"
            />
            <div className="director-text">
              <p>Dear All,</p>
              <p>
                As you are aware, Progressive started with humble beginnings and have now grown into a trusted brand in
                the construction industry. But a lot still needs to be done.
              </p>
              <p>
                Heart to heart, our vision is to be a global design-build company most admired for its people, projects,
                and performance.
              </p>
              <p>
                To achieve this vision, we need to recognize the challenges and embracing change will be key to success
                and growth, starting with mindset.
              </p>
              <p>
                We need to continuously learn, adopt new technologies, improve internal processes, focus on client’s
                evolving needs, and forge strong partnerships with like-minded companies, consultants, and professionals
                to enable us to push our boundaries.
              </p>
              <p>
                I extend heartfelt gratitude to our clients, our team members, and our associates. Look forward to your
                continued support and trust to create marvelous experiences for our customers.
              </p>
              <p>
                Warm regards,
                <br />
               U C Abhang
                <br />
                Director.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-info" id="ourteam">
        <div className="hiscontainer">
          <h2>Our Team</h2>
          {/* Team members' information */}
          <ul className="team-list">
            {/* <li>
              <img src={dummy} alt="C M Abhang" />
              <strong>C M Abhang</strong> (Chairman)
            </li> */}
            <li>
              <img
                src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721125911/Progressive/team%20members/uday_abhang_white_hsgol2.png"
                alt="Uday Abhang"
              />
              <strong>Uday Abhang</strong> (Managing Director)
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721126251/Progressive/team%20members/Ashlesha_Ambadewhite_qofqlq.png"
                alt="Ashlesha Ambade"
              />
              <strong>Ashlesha Ambade</strong> (Director)
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721125394/Progressive/team%20members/rajkar_sir_gdi0qx.jpg"
                alt="Eknath Rajkar"
              />
              <strong>Eknath Rajkar</strong> (Director, Operations)
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778855/Progressive/team%20members/ulhas_abhang_e6mroi.jpg"
                alt="Ulhas Abhang"
              />
              <strong>A. Ulhas </strong> (Mgr, Supply Chain)
            </li>

            <li>
              <img
                src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778854/Progressive/team%20members/Shirish_Satam_wws2jw.jpg"
                alt="Jennil Shah"
              />
              <strong>Shirish Satam</strong> (Mgr, BD)
            </li>

            <li>
              <img
                src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778852/Progressive/team%20members/Dnyaneshwar_Patil_dgocqq.png"
                alt="Jennil Shah"
              />
              <strong>Dnyaneshwar Patil</strong> (Mgr, Contracts)
            </li>

            <li>
              <img
                src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778854/Progressive/team%20members/Satish_Madhle_tcszk9.jpg"
                alt="Satish Madhale"
              />
              <strong>Satish Madhale</strong> (Mgr, Acct & Fin)
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778853/Progressive/team%20members/ramdas_wanjare_bnlxmz.jpg"
                alt="Ramdas Wanjare"
              />
              <strong>Ramdas Wanjare</strong> (Mgr, Technical)
            </li>

            <li>
              <img
                src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721300946/Progressive/team%20members/sudhir_cxhu44.jpg"
                alt="Jennil Shah"
              />
              <strong>Sudhir Khatardar</strong> (Mgr, Commercial)
            </li>

            <li>
              <img
                src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721125493/Progressive/team%20members/Ramesh_Yadav_orxzko.jpg"
                alt="Jennil Shah"
              />
              <strong>Ramesh Yadav</strong> (Asst Mgr, Mech)
            </li>
          </ul>
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

      <section class="intro">
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
              {/* <img src={first} alt="2015 project" className="historyphotos" /> */}
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
              {/* <img src={y2007} alt="2015 project" className="historyphotos" /> */}
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
              {/* <img src={y1997} alt="2015 project" className="historyphotos" /> */}
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
              {/* <img src={y1988} alt="2015 project" className="historyphotos" /> */}
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
              {/* <img src={y1982} alt="2015 project" className="historyphotos" /> */}
              <time>1982</time> Starts operations in Navi Mumbai area. Received projects from the ‘Tata’ scientist and
              officers housing project and various projects in CIDCO.
            </div>
          </li>
          <li>
            <div>
              {/* <img src={y1976} alt="2015 project" className="historyphotos" /> */}
              <time>1976</time> Company was established and started its construction operations with its first work
              “Construction of bridge on nalla in RCF” in Trombay, Mumbai.
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default History;
