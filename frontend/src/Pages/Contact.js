import React, { useEffect } from 'react';
import './Contact.css';
import { FaLinkedin, FaFacebook } from "react-icons/fa";

const Contact = () => {
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

  return (
    <div className="contactus">
      <span className="big-circle"></span>
      <img src="img/shape.png" className="square" alt="" />
      <div className="form">
        <div className="contact-info">
          {/* <h3 className="titleContact">Let's get in touch</h3> */}
          <div className="office">
            <h3>HEAD OFFICE</h3>
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
            <h3>VADODARA OFFICE</h3>
            <p>
              B 403, Narayan Aura, <br />
              SunPharma road, <br />
              Atladara, Vadodara,
              <br />
              Gujarat, India <br />
              Pin - 390012.
            </p>
            <p>Contact : Dharmesh Mistry </p>
            <p>Phone: +91 95123 07668</p>
          </div>

          <div class="info">
                  <h5>For any Marketing related queries:</h5>
                   <p>marketing@progressivegalaxy.com</p>
          </div>
              
              <div class="info">
                  <h5>For any Purchase related queries:</h5>
                   <p>purchase@progressivegalaxy.com</p>
          </div>
              
              <div class="info">
                  <h5>For any HR related queries:</h5>
                   <p>hr@progressivegalaxy.com</p>
          </div>

        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form action="index.html" autocomplete="off">
            <h2 className="titleContact">Contact us</h2>
            <div className="input-container">
               
            <div className="office">
            <h3>PUNE OFFICE</h3>
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
            <h3>AURANGABAD OFFICE</h3>
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


            <div class="social-media">
            <p>Connect with us :</p>
            <div class="social-icons">
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
}

export default Contact;
