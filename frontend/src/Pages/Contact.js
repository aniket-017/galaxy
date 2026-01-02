import React, { useEffect, useState } from "react";
import "./Contact.css";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading";

const Contact = () => {
  const [offices, setOffices] = useState([]);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/aak/l1/contact");
      if (response.data.success) {
        setOffices(response.data.offices || []);
        setEmails(response.data.emails || []);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getQueryTypeLabel = (type) => {
    const labels = {
      marketing: "Marketing",
      purchase: "Purchase",
      hr: "HR",
      recruitment: "Recruitment",
    };
    return labels[type] || type;
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function focusFunc() {
      let parent = this.parentNode;
      parent.classList.add("focus");
    }

    function blurFunc() {
      let parent = this.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", focusFunc);
        input.removeEventListener("blur", blurFunc);
      });
    };
  }, []);

  if (loading) {
    return <Loading message="Loading contact information..." />;
  }

  // Split offices into two groups for left and right sections
  const leftOffices = offices.slice(0, Math.ceil(offices.length / 2));
  const rightOffices = offices.slice(Math.ceil(offices.length / 2));

  return (
    <div className="contactus">
      <span className="big-circle"></span>
      <img src="img/shape.png" className="square" alt="" />
      <div className="form">
        <div className="contact-info">
          {/* Left side offices */}
          {leftOffices.map((office) => (
            <div key={office._id} className="office">
              <h3>{office.officeName}</h3>
              <p>
                {office.address.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
                Pin - {office.pinCode}.
              </p>
              {office.telephone && <p>Tele : {office.telephone}</p>}
              {office.phone && !office.telephone && <p>Phone : {office.phone}</p>}
            </div>
          ))}

          {/* Email queries */}
          {emails.map((email) => (
            <div key={email._id} className="info">
              <h5>For any {getQueryTypeLabel(email.queryType)} related queries:</h5>
              <p>
                <a href={`mailto:${email.email}`}>{email.email}</a>
              </p>
            </div>
          ))}
        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form action="index.html" autoComplete="off">
            <h2 className="titleContact">Contact us</h2>
            <div className="input-container">
              {/* Right side offices */}
              {rightOffices.map((office) => (
                <div key={office._id} className="office">
                  <h3>{office.officeName}</h3>
                  <p>
                    {office.address.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                    Pin - {office.pinCode}.
                  </p>
                  {office.contactPerson && <p>Contact : {office.contactPerson}</p>}
                  {office.phone && <p>Phone: {office.phone}</p>}
                  {office.telephone && !office.phone && <p>Tele: {office.telephone}</p>}
                </div>
              ))}
            </div>

            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                <div className="socialContactIcons">
                  <a href="https://www.facebook.com/">
                    <FaFacebook />
                  </a>
                  <a href="https://www.linkedin.com/company/progressive-civil-construction-company-pvt-ltd/?originalSubdomain=in">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
