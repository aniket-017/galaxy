// ProjectDetails.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProjectDetails.css'; // Import your CSS file

const ProjectDetails = () => {
    const location = useLocation();
    const { product } = location.state;

    return (
        <div className="project-details-cont
        
        
        ainer"> {/* Apply class to container */}
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
        </div>
    );
}

export default ProjectDetails;
