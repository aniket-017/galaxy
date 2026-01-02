import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contactpage">
      <h1>Contact Us</h1>
      <div className="contact-container">
        <div className="contactFirstColumn">
          <div className="office">
            <h2>HEAD OFFICE</h2>
            <p>
              428, Vardhaman Market, <br />
              Plot No. 75, Sector-17, <br />
              Opp. Andhra Bank, Vashi, <br />
              Navi Mumbai, Maharashtra, India. <br />
              Pin - 400703.
            </p>

            <p>Tele : +91- (022) 27882021 </p>
          </div>
          <div className="office">
            <h2>PUNE OFFICE</h2>
            <p>
              A 15, K J Towers, <br />
              Above Mira Hundai showroom, <br />
              Warje, Pune, <br />
              Maharashtra, India.
              <br />
              Pin - 411058.
            </p>
            <p>Contact : Babasaheb More </p>
            <p>Phone: +91 93730 09191</p>
          </div>
          <div className="office">
            <h2>VADODARA OFFICE</h2>
            <p>
              B 403, Narayan Aura, <br />
              SunPharma road, <br />
              Atladara, Vadodara,
              <br />
              Gujarat, India <br />
              Pin - 390012.
            </p>
          </div>
          <div className="office">
            <h2>AURANGABAD OFFICE</h2>
            <p>
              78, Darshan Vihar Colony, <br />
              Satara Parisar, <br />
              Beed Bypass, Aurangabad.
              <br />
              Maharashtra, India <br />
              Pin - 431005
            </p>
            <p>Contact : Datta Padulkar </p>
            <p>Phone: +91 9822826719</p>
          </div>
        </div>

        <div className="queries">
          <h3>For any Marketing related queries:</h3>
          <p>
            Email: <a href="mailto:marketing@progressivegalaxy.com">marketing@progressivegalaxy.com</a>
          </p>
        </div>
        <div className="queries">
          <h3>For any Purchase related queries:</h3>
          <p>
            Email: <a href="mailto:purchase@progressivegalaxy.com">purchase@progressivegalaxy.com</a>
          </p>
        </div>
        <div className="queries">
          <h3>For any Recruitment related queries:</h3>
          <p>
            Email: <a href="mailto:hr@progressivegalaxy.com">hr@progressivegalaxy.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

// import Map from './Map';
{
  /* <div className="contactSecondColumn">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8163.671773021426!2d72.9952666971376!3d19.073042745524273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1361d0ca039%3A0x3ec38c6a67e95f69!2sVardhaman%20Market!5e0!3m2!1sen!2sin!4v1713013003498!5m2!1sen!2sin"
            width="100%"
            height="450px"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div> */
}

// .contact-container {
//   padding: 10px 100px;
//   margin: 0 auto;
// }

// .office,
// .queries {
//   margin-bottom: 20px;
// }

// .contactFirstColumn h1 {
//   text-align: center;
// }
// .office h2,
// .queries h2 {
//   color: #333;
// }

// .office p,
// .queries p {
//   margin-bottom: 5px;
// }

// a {
//   color: #007bff;
//   text-decoration: none;
// }

// a:hover {
//   text-decoration: underline;
// }

// .contact-container {
//   display: flex;
//   justify-content: space-between;
// }

// .contactFirstColumn {
//   flex: 1;
//   margin-right: 20px;
// }

// .contactSecondColumn {
//   flex: 1;
// }

// .contactSecondColumn {
//   width: 100%;
//   height: auto;
//   margin-top: 20px;
// }

// .contactSecondColumn iframe {
//   width: 100%;
//   height: 450px;
//   border: 0;
// }

// @media (max-width: 768px) {
//   .contact-container {
//     padding: 70px 20px;
//   }
// }

// .contactpage > h1 {
//   text-align: center;
//   padding-top: 100px;
// }
