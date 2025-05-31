import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProject.css";

const AddProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: [""],
    category: "",
    subcategory: "",
    projectBrief: {},
    images: [],
  });

  const [projectBriefFields, setProjectBriefFields] = useState([{ key: "", value: "" }]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...formData.description];
    newDescriptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      description: newDescriptions,
    }));
  };

  const addDescriptionField = () => {
    setFormData((prev) => ({
      ...prev,
      description: [...prev.description, ""],
    }));
  };

  const removeDescriptionField = (index) => {
    setFormData((prev) => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index),
    }));
  };

  const handleProjectBriefChange = (index, field, value) => {
    const newFields = [...projectBriefFields];
    newFields[index] = { ...newFields[index], [field]: value };
    setProjectBriefFields(newFields);

    // Update formData.projectBrief
    const newProjectBrief = {};
    newFields.forEach((field) => {
      if (field.key && field.value) {
        newProjectBrief[field.key.trim()] = field.value.trim();
      }
    });
    setFormData((prev) => ({
      ...prev,
      projectBrief: newProjectBrief,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new object for project brief to ensure all fields are included
      const formattedProjectBrief = {};
      projectBriefFields.forEach((field) => {
        if (field.key && field.value) {
          formattedProjectBrief[field.key.trim()] = field.value.trim();
        }
      });

      // Create the final data object
      const formattedData = {
        ...formData,
        projectBrief: formattedProjectBrief,
      };

      console.log("Sending project data:", formattedData);
      console.log("Project brief fields:", projectBriefFields);
      console.log("Formatted project brief:", formattedProjectBrief);

      const response = await axios.post("/aak/l1/project/new", formattedData);
      console.log("Server response:", response.data);

      if (response.data.success) {
        navigate("/projects");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project. Please try again.");
    }
  };

  const addProjectBriefField = () => {
    setProjectBriefFields([...projectBriefFields, { key: "", value: "" }]);
  };

  const removeProjectBriefField = (index) => {
    const newFields = projectBriefFields.filter((_, i) => i !== index);
    setProjectBriefFields(newFields);

    // Update formData.projectBrief after removing a field
    const newProjectBrief = {};
    newFields.forEach((field) => {
      if (field.key && field.value) {
        newProjectBrief[field.key.trim()] = field.value.trim();
      }
    });
    setFormData((prev) => ({
      ...prev,
      projectBrief: newProjectBrief,
    }));
  };

  const handleImageChange = (e) => {
    const urls = e.target.value.split(",").map((url) => url.trim());
    setFormData((prev) => ({
      ...prev,
      images: urls,
    }));
  };

  return (
    <div className="apex_project_creation_container">
      <div className="aurora_form_wrapper">
        {/* Header Section */}
        <div className="zenith_header_section">
          <h2 className="phoenix_main_title">Create New Project</h2>
          <p className="stellar_subtitle">Add comprehensive details for your construction project</p>
        </div>

        {/* Form Content */}
        <div className="cosmos_form_content">
          <form onSubmit={handleSubmit} className="quantum_project_form">
            {/* Title Field */}
            <div className="nexus_title_field_group">
              <label className="prism_field_label">Project Title</label>
              <input
                type="text"
                className="velocity_title_input"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter project title"
                required
              />
            </div>

            {/* Description Section */}
            <div className="meridian_description_section">
              <label className="prism_field_label">Project Description</label>
              <div className="eclipse_description_container">
                {formData.description.map((desc, index) => (
                  <div key={index} className="orbit_description_row">
                    <textarea
                      className="nova_description_textarea"
                      value={desc}
                      onChange={(e) => handleDescriptionChange(index, e.target.value)}
                      placeholder={`Description paragraph ${index + 1}`}
                      required
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="crimson_remove_desc_btn"
                        onClick={() => removeDescriptionField(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="azure_add_desc_btn" onClick={addDescriptionField}>
                  + Add Description Paragraph
                </button>
              </div>
            </div>

            {/* Category Selection */}
            <div className="spectrum_category_section">
              <div className="titan_category_field">
                <label className="prism_field_label">Project Category</label>
                <select
                  className="magnus_category_select"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {Object.entries(categories).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              {formData.category && (
                <div className="vortex_subcategory_field">
                  <label className="prism_field_label">Subcategory</label>
                  <select
                    className="nexus_subcategory_select"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {Object.entries(categories[formData.category].subcategories).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Project Brief Section */}
            <div className="cosmos_project_brief_section">
              <label className="prism_field_label">Project Brief Details</label>
              <div className="galaxy_brief_container">
                {projectBriefFields.map((field, index) => (
                  <div key={index} className="stellar_brief_row">
                    <input
                      type="text"
                      className="aurora_brief_key_input"
                      placeholder="Property name (e.g., Location, Budget)"
                      value={field.key}
                      onChange={(e) => handleProjectBriefChange(index, "key", e.target.value)}
                    />
                    <input
                      type="text"
                      className="zenith_brief_value_input"
                      placeholder="Property value"
                      value={field.value}
                      onChange={(e) => handleProjectBriefChange(index, "value", e.target.value)}
                    />
                    <button
                      type="button"
                      className="crimson_remove_brief_btn"
                      onClick={() => removeProjectBriefField(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" className="azure_add_brief_btn" onClick={addProjectBriefField}>
                  + Add Project Detail
                </button>
              </div>
            </div>

            {/* Images Section */}
            <div className="phoenix_images_section">
              <label className="prism_field_label">Project Images</label>
              <textarea
                className="quantum_images_textarea"
                value={formData.images.join(", ")}
                onChange={handleImageChange}
                placeholder="Enter image URLs separated by commas (e.g., https://example.com/image1.jpg, https://example.com/image2.jpg)"
              />
              <p className="meridian_images_help_text">Separate multiple image URLs with commas</p>
            </div>

            {/* Submit Button */}
            <div className="titan_submit_section">
              <button type="submit" className="apex_submit_button">
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
