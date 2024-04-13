import React from "react";
import "./ContactUs.css"; // Import your CSS file for styling
// import Map from './Map';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contactFirstColumn">
        <h1>Contact Us</h1>
        <div className="office">
          <h2>HEAD OFFICE</h2>
          <p>
            428, Vardhaman Market, Plot No. 75, Sector-17, Opp. Andhra Bank, Vashi, Navi Mumbai, Maharashtra. India. Pin
            - 400703.
          </p>
          <p>Telefax : +91- (022) 27882021 / 22</p>
          <p>
            Email: <a href="mailto:info@progressivegalaxy.com">info@progressivegalaxy.com</a>
          </p>
        </div>
        <div className="office">
          <h2>GURGAON OFFICE</h2>
          <p>Address: [Gurgaon Address]</p>
          <p>Phone: [Phone Number]</p>
          <p>
            Email: <a href="mailto:info@progressivegalaxy.com">info@progressivegalaxy.com</a>
          </p>
        </div>
        <div className="office">
          <h2>BARODA OFFICE</h2>
          <p>Address: [Baroda Address]</p>
          <p>Phone: [Phone Number]</p>
          <p>
            Email: <a href="mailto:info@progressivegalaxy.com">info@progressivegalaxy.com</a>
          </p>
        </div>
        <div className="queries">
          <h2>For any Marketing related queries:</h2>
          <p>
            Email: <a href="mailto:marketing@progressivegalaxy.com">marketing@progressivegalaxy.com</a>
          </p>
        </div>
        <div className="queries">
          <h2>For any Purchase related queries:</h2>
          <p>
            Email: <a href="mailto:purchase@progressivegalaxy.com">purchase@progressivegalaxy.com</a>
          </p>
        </div>
        <div className="queries">
          <h2>For any Recruitment related queries:</h2>
          <p>
            Email: <a href="mailto:hr@progressivegalaxy.com">hr@progressivegalaxy.com</a>
          </p>
        </div>
      </div>

      <div className="contactSecondColumn">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8163.671773021426!2d72.9952666971376!3d19.073042745524273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1361d0ca039%3A0x3ec38c6a67e95f69!2sVardhaman%20Market!5e0!3m2!1sen!2sin!4v1713013003498!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
