import React, { useEffect, useState } from "react";
import "./Imager.css";
import Carousel from "react-bootstrap/Carousel";

// import img1 from "../assets/images/carosel/Interior.png";
// import img2 from "../assets/images/carosel/IndustrialBuildings.png";
// import img3 from "../assets/images/carosel/SpecialAssignments.png";
// import img4 from "../assets/images/carosel/Logistics.png";
// import img5 from "../assets/images/carosel/Bridges.png";
// import img6 from "../assets/images/carosel/Heritage.png";

const Imager = () => {
  return (
    <div>
      <Carousel interval={2600} pause={false}>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713270/Progressive/carousel/0_fhxtqk.jpg"
            alt="First slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Design Build Project</h3>
              <h5>Shiv Samarth Smarak, Uran</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721542177/Progressive/carousel/1_vdlqso.jpg"
            alt="Second slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Pharma Project</h3>
              <h5>Smith & Nephew, Nashik</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713274/Progressive/carousel/2_cxb6ug.png"
            alt="Third slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Food Industry</h3>
              <h5>Godrej Agrovet, Bangalore</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713276/Progressive/carousel/3_mp4nqt.jpg"
            alt="Fourth slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Engineering Project</h3>
              <h5>TGW Knives, Indore</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713273/Progressive/carousel/4_b42mwh.jpg"
            alt="Fifth slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>API Plant</h3>
              <h5>Indoco Remedies, Rasayani</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713273/Progressive/carousel/6_bbllwi.png"
            alt="Sixth slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Heavy Engineering Project</h3>
              <h5>BPCL, Uran</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713272/Progressive/carousel/7_glu0qb.jpg"
            alt="Seventh slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Pharma Project</h3>
              <h5>Sandoz, Thane</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713933/Progressive/1.Industrial-20240705T132840Z-001/1.Industrial/3.%20Heavy%20Engineering%20Projects/4.Asian%20Paints%2C%20Taloja/GOOD_1_001_2_1_tk4nek.jpg"
            alt="Eighth slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>R&D Center</h3>
              <h5>Asian Paints Ltd, Navi Mumbai</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713276/Progressive/carousel/9_vbnfjj.png"
            alt="Ninth slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Residential Tower</h3>
              <h5>Rekab Towers, Mumbai</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713274/Progressive/carousel/10_slnmzw.jpg"
            alt="Tenth slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Helical CarPark Tower</h3>
              <h5>Siemens Ltd, Mumbai</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713272/Progressive/carousel/11_lous1k.png"
            alt="Eleventh slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Public Building</h3>
              <h5>Maharaja Agarsen Bhavan, Jalna</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713271/Progressive/carousel/12_elsui1.jpg"
            alt="Twelfth slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Auditorium & Museum</h3>
              <h5>Dr. B.R. Ambedkar National Memorial, Mahad</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713271/Progressive/carousel/13_diyzh0.jpg"
            alt="Thirteenth slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Corporate Building</h3>
              <h5>Godrej Appliances, Pune</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720436501/Progressive/3.Infrastructure/1.Bridge/20.Badlapur%20Flyover%20%28K.B.M.C%29/WhatsApp_Image_2024-07-04_at_6.07.37_PM_n7gofs.jpg"
            alt="Thirteenth slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Infra Project</h3>
              <h5>Badlapur Flyover, Badlapur</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720436491/Progressive/3.Infrastructure/1.Bridge/22.Jalna/ROB_12_ao3bvf.jpg"
            alt="Thirteenth slide"
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-content">
              <h3>Infra Project</h3>
              <h5>ROB at Jalna DryPort</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Imager;
