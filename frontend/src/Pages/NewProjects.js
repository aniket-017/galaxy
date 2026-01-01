import React, { useState, useEffect } from "react";
import "./NewProjects.css";
import { FaIndustry, FaRoad, FaTasks, FaBuildingUser, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const categoryIcons = {
  industrial: FaIndustry,
  infrastructure: FaRoad,
  specialAssignments: FaTasks,
  multistoredBuildings: FaTasks,
};

const categoryBackgrounds = {
  industrial:
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721568757/Progressive/Project/industrialBuillding_e2adcj.jpg",
  infrastructure:
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721568767/Progressive/Project/Infrastructures_ujhigk.jpg",
  specialAssignments:
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721568771/Progressive/Project/interior_fitouts_repair_bxfxmt.jpg",
  multistoredBuildings:
    "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1721568769/Progressive/Project/Commercial_Buildings_Residential_a0gwvp.jpg",
};

const NewProjects = () => {
  const [activeCategory, setActiveCategory] = useState("industrial");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categories = {
    industrial: {
      label: "Industrial Buildings",
      subcategories: {
        engineeringStructures: "Engineering Structures",
        foodAndPharma: "Food & Pharma",
        heavyEngineering: "Heavy Engineering",
        logistics: "Logistics",
      },
    },
    infrastructure: {
      label: "Infrastructure",
      subcategories: {
        bridgesFlyoversAquaducts: "Bridges, Flyovers and Aquaducts",
        nuclearStructures: "Nuclear Structures",
        massExcavationGeotechnical: "Mass Excavation & Geotechnical",
      },
    },
    specialAssignments: {
      label: "Special Assignments",
      subcategories: {
        customizedHousing: "Customized Housing",
        interiorAndFitouts: "Interior and Fitouts",
      },
    },
    multistoredBuildings: {
      label: "Multistored Buildings",
      subcategories: {
        commercialBuilding: "Commercial Building",
        publicHeritageBuilding: "Public Heritage Building",
        residentialBuilding: "Residential Building",
      },
    },
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/aak/l1/projects");
      if (response.data.success) {
        setProjects(response.data.projects);
        // Set initial subcategory based on available projects
        const firstSubcategory = Object.keys(categories[activeCategory].subcategories)[0];
        setActiveSubcategory(firstSubcategory);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    const firstSubcategory = Object.keys(categories[category].subcategories)[0];
    setActiveSubcategory(firstSubcategory);
    setSelectedProject(null);
  };

  const handleSubcategoryChange = (subcategory) => {
    setActiveSubcategory(subcategory);
    setSelectedProject(null);
  };

  const handleProjectClick = (project) => {
    navigate(`/newproject/${project._id}`);
  };

  // Filter projects based on category and subcategory
  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory && project.subcategory === activeSubcategory
  );

  return (
    <div className="new-projects-container">
      {/* Header Section */}
      <motion.header
        className="projects-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Our Projects</h1>
        <p>Explore our diverse portfolio of successful projects</p>
      </motion.header>

      {/* Category Cards */}
      <motion.div
        className="category-cards"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {Object.entries(categories).map(([key, category]) => {
          const Icon = categoryIcons[key];
          return (
            <motion.div
              key={key}
              className={`category-card ${activeCategory === key ? "active" : ""}`}
              onClick={() => handleCategoryChange(key)}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="category-card-bg" style={{ backgroundImage: `url(${categoryBackgrounds[key]})` }}>
                <div className="category-overlay">
                  <Icon className="category-icon" />
                  <h3>{category.label}</h3>
                  <span className="category-description">View Projects</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Subcategory Pills */}
      {Object.entries(categories[activeCategory].subcategories).length > 0 && (
        <motion.div
          className="subcategory-pills"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {Object.entries(categories[activeCategory].subcategories).map(([subKey, subLabel]) => (
            <motion.button
              key={subKey}
              className={`subcategory-pill ${activeSubcategory === subKey ? "active" : ""}`}
              onClick={() => handleSubcategoryChange(subKey)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {subLabel}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Projects Grid */}
      <motion.div
        className="projects-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {isLoading ? (
          <Loading message="Loading projects..." fullScreen={false} />
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={fetchProjects} className="retry-button">
              Retry
            </button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="no-projects">
            <p>No projects found in this category.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                className="project-card"
                onClick={() => handleProjectClick(project)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="project-image">
                  <img src={project.images[0]} alt={project.title} />
                  <div className="project-overlay">
                    <span className="view-project">View Project</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description[0]}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

export default NewProjects;
