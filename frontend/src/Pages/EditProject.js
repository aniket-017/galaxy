import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./AddProject.css"; // We'll reuse the same CSS
import Loading from "../components/Loading";

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: [""],
    category: "",
    subcategory: "",
    projectBrief: {},
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [projectBriefFields, setProjectBriefFields] = useState([{ key: "", value: "" }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/aak/l1/project/${id}`);
      if (response.data.success) {
        const project = response.data.project;
        // Ensure description is always an array (project may have no description or a single string)
        const descriptionArray = Array.isArray(project.description)
          ? project.description
          : project.description ? [project.description] : [""];
        setFormData({
          title: project.title || "",
          description: descriptionArray,
          category: project.category || "",
          subcategory: project.subcategory || "",
          projectBrief: project.projectBrief,
          images: project.images || [],
        });

        // Convert project brief object to array of fields (handle missing/undefined projectBrief)
        const briefFields = Object.entries(project.projectBrief || {}).map(([key, value]) => ({
          key,
          value,
        }));
        setProjectBriefFields(briefFields.length > 0 ? briefFields : [{ key: "", value: "" }]);

        // Initialize previews with existing images
        if (project.images) {
          setImagePreviews(project.images);
        }
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
      setError("Failed to load project details");
    } finally {
      setLoading(false);
    }
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);

    const previews = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previews).then((newPreviews) => {
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    });
  };

  const removeImagePreview = (index) => {
    const previewToRemove = imagePreviews[index];
    
    // If it's an existing image URL, remove it from formData.images
    if (typeof previewToRemove === "string" && !previewToRemove.startsWith("data:")) {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter(url => url !== previewToRemove)
      }));
    } else {
      // If it's a new file, remove it from imageFiles
      // We need to find the index in imageFiles. 
      // This is tricky because imagePreviews contains both URLs and fresh file previews.
      // Let's find how many URLs are before this index.
      const urlsBefore = imagePreviews.slice(0, index).filter(p => typeof p === "string" && !p.startsWith("data:")).length;
      const fileIndex = index - urlsBefore;
      setImageFiles(prev => prev.filter((_, i) => i !== fileIndex));
    }

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const myForm = new FormData();

      myForm.set("title", formData.title);
      myForm.set("category", formData.category);
      myForm.set("subcategory", formData.subcategory);
      
      // Append descriptions
      formData.description.forEach((desc) => {
        myForm.append("description", desc);
      });

      // Append project brief
      const formattedProjectBrief = {};
      projectBriefFields.forEach((field) => {
        if (field.key && field.value) {
          formattedProjectBrief[field.key.trim()] = field.value.trim();
        }
      });
      myForm.set("projectBrief", JSON.stringify(formattedProjectBrief));

      // Append remaining existing image URLs
      formData.images.forEach((url) => {
        myForm.append("images", url);
      });

      // Append new image files
      imageFiles.forEach((file) => {
        myForm.append("images", file);
      });

      console.log("Sending update data via FormData");

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.put(`/aak/l1/project/${id}`, myForm, config);

      if (response.data.success) {
        navigate("/admin/dashboard");
      } else {
        setError(response.data.message || "Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      setError(error.response?.data?.message || error.message || "Failed to update project. Please try again.");
    }
  };

  if (loading) {
    return <Loading message="Loading project details..." fullScreen={true} />;
  }

  if (error) {
    return (
      <div className="apex_project_creation_container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate("/admin/dashboard")} className="back-button">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="apex_project_creation_container">
      <div className="aurora_form_wrapper">
        {/* Header Section */}
        <div className="zenith_header_section">
          <h2 className="phoenix_main_title">Edit Project</h2>
          <p className="stellar_subtitle">Update project details</p>
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
              
              <div className="upload_zone_wrapper">
                <div className="file_upload_box">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden_file_input"
                    id="project_images_upload"
                  />
                  <label htmlFor="project_images_upload" className="upload_label">
                    <div className="upload_icon">📤</div>
                    <div className="upload_text">
                      <span className="bold_text">Click to upload</span> or drag and drop
                    </div>
                    <div className="upload_limit">PNG, JPG, WEBP (max. 10MB)</div>
                  </label>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="previews_grid">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="preview_item">
                        <img src={preview} alt={`Preview ${index}`} />
                        <button
                          type="button"
                          className="remove_preview_btn"
                          onClick={() => removeImagePreview(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="fallback_url_section">
                <div className="separator_text"><span>OR</span></div>
                <p className="meridian_images_help_text">Manual URL entry (optional fallback)</p>
                <textarea
                  className="quantum_images_textarea"
                  value={formData.images.join(", ")}
                  onChange={handleImageChange}
                  placeholder="Enter image URLs separated by commas"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="titan_submit_section">
              <button type="submit" className="apex_submit_button">
                Update Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
