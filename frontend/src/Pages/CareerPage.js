import React, { useRef, useEffect, useState } from "react";
import {
  FaBuilding,
  FaProjectDiagram,
  FaRulerCombined,
  FaSmile,
  FaChartLine,
  FaHandsHelping,
  FaLaptopCode,
  FaGraduationCap,
  FaTools,
  FaUserTie,
  FaAward,
  FaHeadset,
  FaCheckCircle,
  FaUsers,
  FaChevronDown,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import "./CareerPage.css";
import JobApplicationForm from "./JobApplicationForm";

// import c1 from "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778808/Progressive/celebration/c1_znpljk.jpg";
// import c2 from "../assets/images/celebration/c2.jpeg";
// import c3 from "../assets/images/celebration/c3.jpeg";
// import c4 from "../assets/images/celebration/c4.jpeg";
// import c5 from "../assets/images/celebration/c5.jpeg";
// import c6 from "../assets/images/celebration/c6.jpeg";
// import c7 from "../assets/images/celebration/c7.jpeg";
// import c8 from "../assets/images/celebration/c8.jpeg";
// import c9 from "../assets/images/celebration/c9.jpeg";
// import c10 from "../assets/images/celebration/c10.jpeg";
// import c11 from "../assets/images/celebration/c11.jpeg";
// import c12 from "../assets/images/celebration/c12.jpeg";
// import c13 from "../assets/images/celebration/c13.jpeg";
// import c14 from "../assets/images/celebration/c14.jpeg";
// import c15 from "../assets/images/celebration/c15.jpeg";
// import c16 from "../assets/images/celebration/c16.jpeg";

// import Carousel from "react-bootstrap/Carousel";
// import carrerVideo from "../assets/video/hero.mp4";

const CareerPage = () => {
  const photos = [
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778808/Progressive/celebration/c1_znpljk.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778809/Progressive/celebration/c3_vts12o.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778809/Progressive/celebration/c2_kmmglc.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778809/Progressive/celebration/c4_bjtxvm.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778810/Progressive/celebration/c5_r0cf5n.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778810/Progressive/celebration/c6_j3b93p.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778810/Progressive/celebration/c7_cmlole.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778810/Progressive/celebration/c8_e7uhpg.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778811/Progressive/celebration/c9_sbpe9t.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778807/Progressive/celebration/c10_duvbdc.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778808/Progressive/celebration/c11_ay19tc.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778808/Progressive/celebration/c12_fgfsia.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778808/Progressive/celebration/c13_nor984.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778808/Progressive/celebration/c14_z6ye0c.jpg",
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720778808/Progressive/celebration/c15_givarj.jpg",
  ];

  const form = useRef();

  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    qualification: "",
    experience: "",
    designation: "",
    currentLocation: "",
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };
  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs.sendForm("service_8eemr38", "template_qcrc2mm", form.current, "YpoxBk7FCyOu5qiel").then(
      (result) => {
        console.log("Email successfully sent!", result.text);
      },
      (error) => {
        console.log("Failed to send email.", error.text);
      }
    );

    // Optionally clear the form after submission
    setFormData({
      fullName: "",
      contactNumber: "",
      qualification: "",
      experience: "",
      designation: "",
      currentLocation: "",
    });
  };

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Autoplay started
        })
        .catch((error) => {
          // Autoplay was prevented
          // You can handle this scenario or show a play button to allow user interaction
        });
    }

    return () => {
      // Clean up
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, []);
  return (
    <section className="career-page">
      <section>
        <div className="hero-section">
          <video ref={videoRef} className="hero-video" loop muted>
            <source
              src="https://res.cloudinary.com/dzmn9lnk5/video/upload/v1720781979/Progressive/hero_spo8vf.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="hero-text">
            <h1>Building the Future, Today.</h1>
            <p>Join our team and build a successful career with Progressive Galaxy.</p>
          </div>
        </div>
      </section>

      <section className="initiatives">
        <h2>Our Initiatives</h2>
        <div className="initiative-list">
          <div className="initiative">
            <FaTools size={50} />
            <h3>Employee Flexibility Programs</h3>
            <p>
              We provide employees the flexibility of location and position, depending on the availability of vacancies,
              to mitigate stress and promote productivity.
            </p>
          </div>
          <div className="initiative">
            <FaUserTie size={50} />
            <h3>Flexible Work Arrangements</h3>
            <p>
              We support work-life balance by offering flexible work arrangements, work from home options, and long
              leave to manage personal and professional lives effectively.
            </p>
          </div>
          <div className="initiative">
            <FaGraduationCap size={50} />
            <h3>Training and Development</h3>
            <p>
              Through ongoing training programs, mentorship opportunities, and on-the-job training, we enhance
              employees' skills and advance their careers within the company.
            </p>
          </div>
          <div className="initiative">
            <FaUsers size={50} />
            <h3>Diversity and Inclusion Initiatives</h3>
            <p>
              We promote diversity and inclusivity with unconscious bias training, diversity recruitment programs, and
              employee resource groups.
            </p>
          </div>
          <div className="initiative">
            <FaAward size={50} />
            <h3>Employee Recognition Programs</h3>
            <p>
              We celebrate contributions and achievements with monthly awards and annual recognition events to ensure
              our employees feel valued.
            </p>
          </div>
          <div className="initiative">
            <FaHeadset size={50} />
            <h3>Employee Assistance Program (EAP)</h3>
            <p>
              Our EAP offers confidential counseling, financial assistance, and legal advice to employees and their
              families facing personal or professional difficulties.
            </p>
          </div>
        </div>
      </section>

      {/* <section>
        <Carousel>
          <Carousel.Item>
            <img style={{ height: "100vh" }} className="d-block w-100" src={c1} alt="First slide" />
            <Carousel.Caption>
              <h3>Interiors</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img style={{ height: "100vh" }} className="d-block w-100" src={c2} alt="First slide" />
            <Carousel.Caption>
              <h3>Interiors</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img style={{ height: "100vh" }} className="d-block w-100" src={c3} alt="First slide" />
            <Carousel.Caption>
              <h3>Interiors</h3>
            </Carousel.Caption>
          </Carousel.Item>

        </Carousel>
      </section> */}

      <section className="life-at-progressive">
        <h2>Life at Progressive Galaxy</h2>

        <div className="life-content">
          <h4>Work Environment</h4>
          <p>
            At Progressive Galaxy, we believe in creating a vibrant and inclusive work environment that fosters
            creativity and collaboration. Our office spaces are designed to encourage teamwork while also providing
            quiet areas for focused work.
          </p>
          <h4>Celebrations and Events</h4>
          <p>
            We understand the importance of work-life balance and regularly organize various events and celebrations.
            Whether it's festivals, company milestones, or team-building activities, there's always something happening
            at Progressive Galaxy that brings our employees together and creates a sense of community.
          </p>

          <h4>Training and Development</h4>
          <p>
            We are committed to the continuous growth and development of our employees. Our comprehensive training
            programs include technical training, leadership development, and personal growth workshops. We believe that
            by investing in our people, we can achieve greater heights together.
          </p>
        </div>
        <div>
          <div className="photo-gallery">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Life at Progressive ${index + 1}`}
                onClick={() => handlePhotoClick(photo)}
              />
            ))}
          </div>
          {selectedPhoto && (
            <div className="modal" onClick={closeModal}>
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <img src={selectedPhoto} alt="Enlarged view" />
              </div>
            </div>
          )}
        </div>
        <div className="life-content">
          <h4>Employee Wellness</h4>
          <p>
            The well-being of our employees is a top priority. We offer various wellness programs, including fitness
            challenges, yoga sessions, and mental health support. Our goal is to ensure that every employee feels their
            best, both physically and mentally.
          </p>
          <h4>Innovation and Technology</h4>
          <p>
            As a forward-thinking company, we embrace the latest technologies and encourage innovative thinking. Our
            teams are equipped with state-of-the-art tools and resources to deliver exceptional results on every
            project.
          </p>
          <h4>Community Involvement</h4>
          <p>
            We believe in giving back to the community. Our CSR initiatives focus on education, environmental
            sustainability, and supporting local communities. Our employees actively participate in various volunteer
            activities, making a positive impact on society.
          </p>
        </div>
      </section>

      {/* <section className="job-openings">
        <h2>Current Job Openings</h2>
        <div className="job-list">
          <div className="job">
            <FaBuilding size={50} />
            <h3>Project Manager</h3>
            <p>Navi Mumbai</p>
            <p>
              BE +15 yrs / Dip +20 yr work experience. Led team in the high rise sector from footing till completion.
            </p>
            <a href="/job-details">View Details</a>
          </div>
          <div className="job">
            <FaProjectDiagram size={50} />
            <h3>Supervisor</h3>
            <p>Pune</p>
            <p>ITI +10 yrs/ 10 pass +20 yrs. Experience in executing 2000 cum of concrete in last 3 yrs.</p>
            <a href="/job-details">View Details</a>
          </div>
          <div className="job">
            <FaRulerCombined size={50} />
            <h3>PE (Estimation)</h3>
            <p>Navi Mumbai</p>
            <p>BE +8 yrs. Worked in billing, quantity estimation. Knowledge of AutoCad is mandatory.</p>
            <a href="/job-details">View Details</a>
          </div>
        </div>
      </section> */}

      <section className="why-work-with-us">
        <h2>Why Work With Us?</h2>
        <div className="reasons">
          <div className="reason">
            <FaChartLine size={50} />
            <h3>Career Growth</h3>
            <p>We offer numerous opportunities for career advancement and professional development.</p>
          </div>
          <div className="reason">
            <FaHandsHelping size={50} />
            <h3>Supportive Environment</h3>
            <p>Our team supports each other to achieve collective and individual goals.</p>
          </div>
          <div className="reason">
            <FaLaptopCode size={50} />
            <h3>Innovative Projects</h3>
            <p>Work on cutting-edge projects that shape the future of the construction industry.</p>
          </div>
          <div className="reason">
            <FaGraduationCap size={50} />
            <h3>Learning Opportunities</h3>
            <p>Benefit from continuous learning and training programs to enhance your skills.</p>
          </div>
        </div>
      </section>

      {/* <section className="growth-and-development">
        <h2>Growth and Development</h2>
        <div className="growth-content">
          <div className="growth-text">
            <p>
              Our training programs and career progression opportunities help you achieve your professional goals. We
              invest in our employees' development to ensure they have the skills needed to succeed.
            </p>
          </div>
          <img src={c5} alt="Growth" className="growth-image" />
        </div>
      </section> */}

      {/* <section className="application-process">
        <h2>Application Process</h2>
        <div className="process-steps">
          <div className="step">
            <h3>Step 1</h3>
            <p>Submit your application online.</p>
          </div>
          <div className="step">
            <h3>Step 2</h3>
            <p>Attend an initial interview.</p>
          </div>
          <div className="step">
            <h3>Step 3</h3>
            <p>Complete a technical assessment.</p>
          </div>
          <div className="step">
            <h3>Step 4</h3>
            <p>Final interview and offer.</p>
          </div>
        </div>
      </section> */}

      {/* <section className="company-culture">
        <h2>Company Culture and Values</h2>
        <div className="culture-content">
          <p>
            We believe in fostering a collaborative and inclusive environment where everyone can thrive. Our values
            include integrity, innovation, and excellence.
          </p>
          <img src={c4} alt="Company Culture" className="culture-image" />
        </div>
      </section> */}

      <section className="join-us">

      <JobApplicationForm/>
        {/* <h2>Join Us</h2>
        <form ref={form} className="join-form" onSubmit={sendEmail}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              className="form-control"
              placeholder="Enter your qualification"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience">Year of Experience</label>
            <select id="experience" name="experience" className="form-control" required>
              <option value="0-1">0-1 year (fresher)</option>
              <option value="1-3">1-3 years</option>
              <option value="3-6">3-6 years</option>
              <option value="6-12">6-12 years</option>
              <option value="12-20">12-20 years</option>
              <option value="20-30">20-30 years</option>
              <option value="30+">30+ years</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="designation">Applying For Designation</label>
            <select id="designation" name="designation" className="form-control" required>
              <option value="">Select Designation</option>
    
              
            </select>
            <span>
              <FaChevronDown />
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="currentLocation">Current Location</label>
            <input
              type="text"
              id="currentLocation"
              name="currentLocation"
              className="form-control"
              placeholder="Enter your current location"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <select
                id="countryCode"
                name="countryCode"
                className="form-control"
                style={{ width: "30%", marginRight: "10px" }}
                required
              >
                <option value="+91">+91 (India)</option>

              </select>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                className="form-control"
                placeholder="Enter your contact number"
                style={{ flex: "1" }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="resume">Upload Resume</label>
            <input type="file" id="resume" name="resume" className="form-control-file" />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form> */}
      </section>

      {/* <section className="contact-info">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <p>
            If you have any questions about careers at Progressive Galaxy, feel free to reach out to our HR department
            at <a href="mailto:hr@progressivegalaxy.com">hr@progressivegalaxy.com</a>.
          </p>
          <img src="path-to-contact-image.jpg" alt="Contact" className="contact-image" />
        </div>
      </section> */}
    </section>
  );
};

export default CareerPage;
