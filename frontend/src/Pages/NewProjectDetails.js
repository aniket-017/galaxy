import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaArrowRight, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./NewProjectDetails.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/aak/l1/project/${id}`);
      if (response.data.success) {
        setProject(response.data.project);
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
      setError("Failed to load project details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? project.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === project.images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  if (isLoading) {
    return (
      <div className="project-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading project details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-details-error">
        <p>{error}</p>
        <button onClick={fetchProjectDetails} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-details-error">
        <p>Project not found</p>
        <button onClick={() => navigate("/projects")} className="back-button">
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="project-details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Home
        </a>
        <FaChevronRight className="breadcrumb-separator" />
        <a
          href="/projects"
          onClick={(e) => {
            e.preventDefault();
            navigate("/projects");
          }}
        >
          Projects
        </a>
        <FaChevronRight className="breadcrumb-separator" />
        <a
          href={`/projects?category=${project.category}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/projects?category=${project.category}`);
          }}
        >
          {project.category}
        </a>
        <FaChevronRight className="breadcrumb-separator" />
        <a
          href={`/projects?category=${project.category}&subcategory=${project.subcategory}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/projects?category=${project.category}&subcategory=${project.subcategory}`);
          }}
        >
          {project.subcategory}
        </a>
        <FaChevronRight className="breadcrumb-separator" />
        <span>{project.title}</span>
      </div>

      <div className="project-details-content">
        {/* Image Carousel Section */}
        <div className="image-carousel-section">
          <div className="main-image-container">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {project.images.length > 1 && (
              <>
                <button className="carousel-button prev" onClick={handlePreviousImage}>
                  <FaArrowLeft />
                </button>
                <button className="carousel-button next" onClick={handleNextImage}>
                  <FaArrowRight />
                </button>
              </>
            )}
          </div>

          {project.images.length > 1 && (
            <div className="thumbnail-container">
              {project.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${currentImageIndex === index ? "active" : ""}`}
                  onClick={() => handleThumbnailClick(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Project Information Section */}
        <div className="project-info-section">
          <div className="project-header">
            <h1>{project.title}</h1>
          </div>

          <div className="project-description">
            <h2>Project Description</h2>
            {project.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {project.projectBrief && Object.keys(project.projectBrief).length > 0 && (
            <div className="project-brief">
              <h2>Project Brief</h2>
              <div className="brief-grid">
                {Object.entries(project.projectBrief).map(([key, value]) => (
                  <div key={key} className="brief-item">
                    <span className="brief-key">{key}:</span>
                    <span className="brief-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
