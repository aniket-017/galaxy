import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "./ProjectDetails.css"; // Import your CSS file

const ProjectDetails = () => {
  const location = useLocation();
  const { product, activeSection } = location.state;
  console.log(activeSection);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  });
  

  if (!product.image) {
    return <div>No images found for this project.</div>;
  }

  return (
    <div className="project-details-container">
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
      </div>
    </div>
  );
};

export default ProjectDetails;
