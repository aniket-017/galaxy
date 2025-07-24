import React, { useState } from "react";
import axios from "axios";
import "./JobApplicationForm.css";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    qualification: "",
    experience: "",
    designation: "",
    location: "",
    countryCode: "+91",
    phone: "",
    resume: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [resumePreview, setResumePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload only PDF, DOC, or DOCX files.");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB.");
        return;
      }

      setFormData({ ...formData, resume: file });

      // Create preview object
      const preview = {
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2), // Size in MB
        type: file.type,
        icon: getFileIcon(file.type),
      };
      setResumePreview(preview);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType === "application/pdf") return "📄";
    if (fileType.includes("word")) return "📝";
    return "📋";
  };

  const removeResume = () => {
    setFormData({ ...formData, resume: null });
    setResumePreview(null);
    // Reset file input
    document.getElementById("resume").value = "";
  };

  const uploadToCloudinary = async (file) => {
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", "job_applications"); // You'll need to create this preset
    cloudinaryFormData.append("resource_type", "auto");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dzmn9lnk5/upload", cloudinaryFormData);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error("Failed to upload resume. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Validate phone number
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be a 10-digit number.");
      setIsSubmitting(false);
      return;
    }

    // Validate email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      alert("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Upload resume to Cloudinary
      const resumeUrl = await uploadToCloudinary(formData.resume);

      // Prepare application data
      const applicationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        qualification: formData.qualification,
        experience: formData.experience,
        designation: formData.designation,
        location: formData.location,
        countryCode: formData.countryCode,
        phone: formData.phone,
        resumeUrl: resumeUrl,
        resumeOriginalName: formData.resume.name,
      };

      // Submit to backend
      const response = await axios.post("/aak/l1/job-application", applicationData);

      if (response.data.success) {
        setSubmitMessage("✅ Application submitted successfully! We will contact you soon.");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          qualification: "",
          experience: "",
          designation: "",
          location: "",
          countryCode: "+91",
          phone: "",
          resume: null,
        });
        setResumePreview(null);
        document.getElementById("resume").value = "";
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage("❌ Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="job-form-container">
      <h2 className="job-form-title">Job Application Form</h2>
      <p className="job-form-subtitle">Join our team and build a successful career with Progressive Galaxy</p>

      {submitMessage && (
        <div className={`submit-message ${submitMessage.includes("✅") ? "success" : "error"}`}>{submitMessage}</div>
      )}

      <form className="job-form" onSubmit={handleSubmit}>
        <div className="job-form-name-group">
          <div className="job-form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div className="job-form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="job-form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </div>

        <div className="job-form-name-group">
          <div className="job-form-group">
            <label htmlFor="qualification">Qualification *</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              placeholder="e.g., B.Tech Civil Engineering"
            />
          </div>
          <div className="job-form-group">
            <label htmlFor="experience">Years of Experience *</label>
            <select id="experience" name="experience" value={formData.experience} onChange={handleChange} required>
              <option value="">Select Experience</option>
              <option value="0-1">0-1 year (fresher)</option>
              <option value="1-3">1-3 years</option>
              <option value="3-6">3-6 years</option>
              <option value="6-12">6-12 years</option>
              <option value="12-20">12-20 years</option>
              <option value="20-30">20-30 years</option>
              <option value="30+">30+ years</option>
            </select>
          </div>
        </div>

        <div className="job-form-group">
          <label htmlFor="designation">Applying For Designation *</label>
          <select id="designation" name="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <optgroup label="Project Management">
              <option value="Project Manager">Project Manager</option>
              <option value="Assistant Project Manager">Assistant Project Manager</option>
              <option value="Project Coordinator">Project Coordinator</option>
              <option value="Project Engineer">Project Engineer</option>
              <option value="Site Manager">Site Manager</option>
            </optgroup>
            <optgroup label="Engineering">
              <option value="Senior Civil Engineer">Senior Civil Engineer</option>
              <option value="Civil Engineer">Civil Engineer</option>
              <option value="Structural Engineer">Structural Engineer</option>
              <option value="Design Engineer">Design Engineer</option>
              <option value="Construction Engineer">Construction Engineer</option>
              <option value="Mechanical Engineer (Repair and Maintenance)">
                Mechanical Engineer (Repair and Maintenance)
              </option>
              <option value="Mechanical Engineer (Fabrication)">Mechanical Engineer (Fabrication)</option>
              <option value="Electrical Engineer">Electrical Engineer</option>
              <option value="Quantity Surveyor">Quantity Surveyor</option>
            </optgroup>
            <optgroup label="Site Management and Supervision">
              <option value="Site Supervisor">Site Supervisor</option>
              <option value="Site Foreman">Site Foreman</option>
              <option value="Site Engineer">Site Engineer</option>
            </optgroup>
            <optgroup label="Planning and Estimation">
              <option value="Planning Engineer">Planning Engineer</option>
              <option value="Cost Estimator">Cost Estimator</option>
            </optgroup>
            <optgroup label="Quality Control and Safety">
              <option value="Quality Control Manager">Quality Control Manager</option>
              <option value="Quality Control Engineer">Quality Control Engineer</option>
              <option value="Safety Manager">Safety Manager</option>
              <option value="Safety Officer">Safety Officer</option>
              <option value="Safety Engineer">Safety Engineer</option>
            </optgroup>
            <optgroup label="Procurement and Contracts">
              <option value="Procurement Manager">Procurement Manager</option>
              <option value="Procurement Engineer">Procurement Engineer</option>
              <option value="Contracts Manager">Contracts Manager</option>
              <option value="Purchase Officer">Purchase Officer</option>
              <option value="Legal Advisor">Legal Advisor</option>
            </optgroup>
            <optgroup label="Finance and Administration">
              <option value="Finance Manager">Finance Manager</option>
              <option value="Site Accountant">Site Accountant</option>
              <option value="Accountant">Accountant</option>
              <option value="HR Manager">HR Manager</option>
              <option value="HR Officer">HR Officer</option>
              <option value="Admin Officer">Admin Officer</option>
              <option value="Administrative Manager">Administrative Manager</option>
              <option value="Store Officer">Store Officer</option>
            </optgroup>
            <optgroup label="Other Roles">
              <option value="Marketing Officer">Marketing Officer</option>
              <option value="Business Development Manager">Business Development Manager</option>
              <option value="Surveyor">Surveyor</option>
              <option value="Draftsman">Draftsman</option>
              <option value="BIM Specialist">BIM Specialist</option>
            </optgroup>
            <optgroup label="Support Staff">
              <option value="Office Administrator">Office Administrator</option>
              <option value="Clerk">Clerk</option>
              <option value="Document Controller">Document Controller</option>
              <option value="Receptionist">Receptionist</option>
            </optgroup>
          </select>
        </div>

        <div className="job-form-group">
          <label htmlFor="location">Current Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter your current city/location"
          />
        </div>

        <div className="job-form-group">
          <label htmlFor="phone">Contact Number *</label>
          <div className="job-form-country-code">
            <select id="countryCode" name="countryCode" value={formData.countryCode} onChange={handleChange}>
              <option value="+91">+91</option>
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 10) {
                  handleChange(e);
                }
              }}
              pattern="\d{10}"
              placeholder="10-digit mobile number"
              required
            />
          </div>
        </div>

        <div className="job-form-group">
          <label htmlFor="resume">Upload Resume * (PDF, DOC, DOCX - Max 5MB)</label>
          {!resumePreview ? (
            <label className="job-form-file-upload">
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
              />
              <span className="upload-icon">📁</span>
              Choose File
            </label>
          ) : (
            <div className="resume-preview">
              <div className="file-info">
                <span className="file-icon">{resumePreview.icon}</span>
                <div className="file-details">
                  <span className="file-name">{resumePreview.name}</span>
                  <span className="file-size">{resumePreview.size} MB</span>
                </div>
                <button type="button" className="remove-file" onClick={removeResume}>
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="job-form-submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span>
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
