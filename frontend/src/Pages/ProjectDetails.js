import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "./ProjectDetails.css"; // Import your CSS file

const ProjectDetails = () => {
  const location = useLocation();
  const { product, activeSection, segment, subsegment } =
    location.state || JSON.parse(localStorage.getItem("productDetailsState")) || {};

  console.log(location.state);
  // console.log(activeSection);
  console.log(product.project_brief);
  useEffect(() => {
    // Save state to local storage when component mounts
    if (location.state) {
      localStorage.setItem("productDetailsState", JSON.stringify(location.state));
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Clean up: Remove local storage when component unmounts or page is refreshed
    return () => {
      localStorage.removeItem("productDetailsState");
    };
  }, [location.state]);

  if (!product?.image) {
    return <div>No images found for this project.</div>;
  }

  return (
    <div>
      {/* <div className="breadcrumb">
        <Link to="/projects">projects</Link> &gt;
        <Link to="/projects">{activeSection}</Link>
        &gt;
      
        &gt; <span>{product.title}</span>
      </div> */}

      <div className="project-details-container">
        {/* Breadcrumb Navigation */}

        {/* Project Details */}
        <div className="productdetailimag">
          <Carousel>
            {product.image.map((image, idx) => (
              <Carousel.Item key={idx}>
                <img className="d-block productdetailimag" src={image} alt={`Slide ${idx + 1}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>

          {/* i want to show below part if product.project_brief is present */}
          {product.project_brief && Object.keys(product.project_brief).length > 0 && (
            <div className="project-brief">
              <h4>Project Brief:</h4>
              <ul>
                {Object.entries(product.project_brief).map(([key, value], idx) => (
                  <li key={idx}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;