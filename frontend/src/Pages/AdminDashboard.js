import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

  // Carousel state
  const [carouselSlides, setCarouselSlides] = useState([]);
  const [carouselLoading, setCarouselLoading] = useState(false);
  const [showCarouselModal, setShowCarouselModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [slideForm, setSlideForm] = useState({
    imageUrl: "",
    title: "",
    subtitle: "",
    order: 1,
  });
  const [deleteSlideId, setDeleteSlideId] = useState(null);

  // Team state
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberForm, setMemberForm] = useState({
    name: "",
    position: "",
    photoUrl: "",
    description: "",
    email: "",
    phone: "",
    department: "Other",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
    order: 1,
  });
  const [deleteMemberId, setDeleteMemberId] = useState(null);

  // Career Photos state
  const [careerPhotos, setCareerPhotos] = useState([]);
  const [careerPhotosLoading, setCareerPhotosLoading] = useState(false);
  const [showCareerPhotosModal, setShowCareerPhotosModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [photoForm, setPhotoForm] = useState({
    imageUrl: "",
    title: "",
    description: "",
    order: 1,
  });
  const [deletePhotoId, setDeletePhotoId] = useState(null);

  // Leadership state
  const [leadership, setLeadership] = useState([]);
  const [leadershipLoading, setLeadershipLoading] = useState(false);
  const [showLeadershipModal, setShowLeadershipModal] = useState(false);
  const [editingLeader, setEditingLeader] = useState(null);
  const [leaderForm, setLeaderForm] = useState({
    role: "Chairman",
    name: "",
    photoUrl: "",
    title: "",
    message: "",
    signature: "",
  });
  const [deleteLeaderId, setDeleteLeaderId] = useState(null);

  // Job Applications state
  const [jobApplications, setJobApplications] = useState([]);
  const [jobApplicationsLoading, setJobApplicationsLoading] = useState(false);
  const [showJobApplicationModal, setShowJobApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationFilters, setApplicationFilters] = useState({
    status: "all",
    designation: "all",
  });
  const [applicationStats, setApplicationStats] = useState(null);
  const [deleteApplicationId, setDeleteApplicationId] = useState(null);

  const [stats, setStats] = useState({
    totalProjects: 0,
    industrialProjects: 0,
    infrastructureProjects: 0,
    specialAssignments: 0,
    multistoredBuildings: 0,
  });

  useEffect(() => {
    fetchProjects();
    fetchCarouselSlides();
    fetchTeamMembers();
    fetchCareerPhotos();
    fetchLeadership();
    fetchJobApplications();
    fetchApplicationStats();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/aak/l1/projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        const projectsData = response.data.projects;
        setProjects(projectsData);

        // Calculate statistics
        const stats = {
          totalProjects: projectsData.length,
          industrialProjects: projectsData.filter((p) => p.category === "industrial").length,
          infrastructureProjects: projectsData.filter((p) => p.category === "infrastructure").length,
          specialAssignments: projectsData.filter((p) => p.category === "specialAssignments").length,
          multistoredBuildings: projectsData.filter((p) => p.category === "multistoredBuildings").length,
        };
        setStats(stats);
      }
    } catch (error) {
      setError("Failed to fetch projects");
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCarouselSlides = async () => {
    try {
      setCarouselLoading(true);
      const response = await axios.get("/aak/l1/admin/carousel", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setCarouselSlides(response.data.slides);
      }
    } catch (error) {
      setError("Failed to fetch carousel slides");
      console.error("Error fetching carousel slides:", error);
    } finally {
      setCarouselLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      setTeamLoading(true);
      const response = await axios.get("/aak/l1/admin/team", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setTeamMembers(response.data.members);
      }
    } catch (error) {
      setError("Failed to fetch team members");
      console.error("Error fetching team members:", error);
    } finally {
      setTeamLoading(false);
    }
  };

  const fetchCareerPhotos = async () => {
    try {
      setCareerPhotosLoading(true);
      const response = await axios.get("/aak/l1/admin/career-photos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setCareerPhotos(response.data.photos);
      }
    } catch (error) {
      setError("Failed to fetch career photos");
      console.error("Error fetching career photos:", error);
    } finally {
      setCareerPhotosLoading(false);
    }
  };

  const fetchLeadership = async () => {
    try {
      setLeadershipLoading(true);
      const response = await axios.get("/aak/l1/admin/leadership", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setLeadership(response.data.leaders);
      }
    } catch (error) {
      setError("Failed to fetch leadership messages");
      console.error("Error fetching leadership:", error);
    } finally {
      setLeadershipLoading(false);
    }
  };

  const fetchJobApplications = async () => {
    try {
      setJobApplicationsLoading(true);
      const { status, designation } = applicationFilters;
      const params = new URLSearchParams();
      if (status !== "all") params.append("status", status);
      if (designation !== "all") params.append("designation", designation);

      const response = await axios.get(`/aak/l1/admin/job-applications?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setJobApplications(response.data.applications);
      }
    } catch (error) {
      setError("Failed to fetch job applications");
      console.error("Error fetching job applications:", error);
    } finally {
      setJobApplicationsLoading(false);
    }
  };

  const fetchApplicationStats = async () => {
    try {
      const response = await axios.get("/aak/l1/admin/job-applications/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setApplicationStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching application stats:", error);
    }
  };

  const handleEdit = (project) => {
    navigate(`/projects/edit/${project._id}`);
  };

  const handleDelete = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`/aak/l1/project/${selectedProject._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setProjects(projects.filter((p) => p._id !== selectedProject._id));
        setShowDeleteModal(false);
        setSelectedProject(null);
        fetchProjects(); // Refresh stats
      }
    } catch (error) {
      setError("Failed to delete project");
      console.error("Error deleting project:", error);
    }
  };

  // Carousel Management Functions
  const handleAddSlide = () => {
    setEditingSlide(null);
    setSlideForm({
      imageUrl: "",
      title: "",
      subtitle: "",
      order: carouselSlides.length + 1,
    });
    setShowCarouselModal(true);
  };

  const handleEditSlide = (slide) => {
    setEditingSlide(slide);
    setSlideForm({
      imageUrl: slide.imageUrl,
      title: slide.title,
      subtitle: slide.subtitle,
      order: slide.order,
    });
    setShowCarouselModal(true);
  };

  const handleSlideFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };

      if (editingSlide) {
        // Update existing slide
        await axios.put(`/aak/l1/admin/carousel/${editingSlide._id}`, slideForm, config);
      } else {
        // Create new slide
        await axios.post("/aak/l1/admin/carousel", slideForm, config);
      }

      setShowCarouselModal(false);
      fetchCarouselSlides();
      setError("");
    } catch (error) {
      setError(`Failed to ${editingSlide ? "update" : "create"} carousel slide`);
      console.error("Error saving carousel slide:", error);
    }
  };

  const handleDeleteSlide = async (slideId) => {
    try {
      await axios.delete(`/aak/l1/admin/carousel/${slideId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCarouselSlides();
      setDeleteSlideId(null);
      setError("");
    } catch (error) {
      setError("Failed to delete carousel slide");
      console.error("Error deleting carousel slide:", error);
    }
  };

  const handleMoveSlide = async (slideId, direction) => {
    const slide = carouselSlides.find((s) => s._id === slideId);
    if (!slide) return;

    const newOrder = direction === "up" ? slide.order - 1 : slide.order + 1;

    if (newOrder < 1 || newOrder > carouselSlides.length) return;

    try {
      await axios.put(
        `/aak/l1/admin/carousel/${slideId}`,
        { ...slide, order: newOrder },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchCarouselSlides();
    } catch (error) {
      setError("Failed to reorder carousel slide");
      console.error("Error reordering carousel slide:", error);
    }
  };

  // Team Management Functions
  const handleAddMember = () => {
    setEditingMember(null);
    setMemberForm({
      name: "",
      position: "",
      photoUrl: "",
      description: "",
      email: "",
      phone: "",
      department: "Other",
      socialLinks: {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: "",
      },
      order: teamMembers.length + 1,
    });
    setShowTeamModal(true);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setMemberForm({
      name: member.name,
      position: member.position,
      photoUrl: member.photoUrl,
      description: member.description || "",
      email: member.email || "",
      phone: member.phone || "",
      department: member.department || "Other",
      socialLinks: member.socialLinks || {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: "",
      },
      order: member.order,
    });
    setShowTeamModal(true);
  };

  const handleMemberFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };

      if (editingMember) {
        // Update existing member
        await axios.put(`/aak/l1/admin/team/${editingMember._id}`, memberForm, config);
      } else {
        // Create new member
        await axios.post("/aak/l1/admin/team", memberForm, config);
      }

      setShowTeamModal(false);
      fetchTeamMembers();
      setError("");
    } catch (error) {
      setError(`Failed to ${editingMember ? "update" : "create"} team member`);
      console.error("Error saving team member:", error);
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await axios.delete(`/aak/l1/admin/team/${memberId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchTeamMembers();
      setDeleteMemberId(null);
      setError("");
    } catch (error) {
      setError("Failed to delete team member");
      console.error("Error deleting team member:", error);
    }
  };

  const handleMoveMember = async (memberId, direction) => {
    const member = teamMembers.find((m) => m._id === memberId);
    if (!member) return;

    const newOrder = direction === "up" ? member.order - 1 : member.order + 1;

    if (newOrder < 1 || newOrder > teamMembers.length) return;

    try {
      await axios.put(
        `/aak/l1/admin/team/${memberId}`,
        { ...member, order: newOrder },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchTeamMembers();
    } catch (error) {
      setError("Failed to reorder team member");
      console.error("Error reordering team member:", error);
    }
  };

  // Career Photos Management Functions
  const handleAddPhoto = () => {
    setEditingPhoto(null);
    setPhotoForm({
      imageUrl: "",
      title: "",
      description: "",
      order: careerPhotos.length + 1,
    });
    setShowCareerPhotosModal(true);
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
    setPhotoForm({
      imageUrl: photo.imageUrl,
      title: photo.title,
      description: photo.description || "",
      order: photo.order,
    });
    setShowCareerPhotosModal(true);
  };

  const handlePhotoFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };

      if (editingPhoto) {
        // Update existing photo
        await axios.put(`/aak/l1/admin/career-photos/${editingPhoto._id}`, photoForm, config);
      } else {
        // Create new photo
        await axios.post("/aak/l1/admin/career-photos", photoForm, config);
      }

      setShowCareerPhotosModal(false);
      fetchCareerPhotos();
      setError("");
    } catch (error) {
      setError(`Failed to ${editingPhoto ? "update" : "create"} career photo`);
      console.error("Error saving career photo:", error);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await axios.delete(`/aak/l1/admin/career-photos/${photoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCareerPhotos();
      setDeletePhotoId(null);
      setError("");
    } catch (error) {
      setError("Failed to delete career photo");
      console.error("Error deleting career photo:", error);
    }
  };

  const handleMovePhoto = async (photoId, direction) => {
    const photo = careerPhotos.find((p) => p._id === photoId);
    if (!photo) return;

    const newOrder = direction === "up" ? photo.order - 1 : photo.order + 1;

    if (newOrder < 1 || newOrder > careerPhotos.length) return;

    try {
      await axios.put(
        `/aak/l1/admin/career-photos/${photoId}`,
        { ...photo, order: newOrder },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchCareerPhotos();
    } catch (error) {
      setError("Failed to reorder career photo");
      console.error("Error reordering career photo:", error);
    }
  };

  // Leadership Management Functions
  const handleAddLeader = () => {
    setEditingLeader(null);
    setLeaderForm({
      role: "Chairman",
      name: "",
      photoUrl: "",
      title: "",
      message: "",
      signature: "",
    });
    setShowLeadershipModal(true);
  };

  const handleEditLeader = (leader) => {
    setEditingLeader(leader);
    setLeaderForm({
      role: leader.role,
      name: leader.name,
      photoUrl: leader.photoUrl,
      title: leader.title || "",
      message: leader.message,
      signature: leader.signature || "",
    });
    setShowLeadershipModal(true);
  };

  const handleLeaderFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };

      if (editingLeader) {
        // Update existing leader
        await axios.put(`/aak/l1/admin/leadership/${editingLeader._id}`, leaderForm, config);
      } else {
        // Create new leader
        await axios.post("/aak/l1/admin/leadership", leaderForm, config);
      }

      setShowLeadershipModal(false);
      fetchLeadership();
      setError("");
    } catch (error) {
      setError(`Failed to ${editingLeader ? "update" : "create"} leadership message`);
      console.error("Error saving leadership:", error);
    }
  };

  const handleDeleteLeader = async (leaderId) => {
    try {
      await axios.delete(`/aak/l1/admin/leadership/${leaderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchLeadership();
      setDeleteLeaderId(null);
      setError("");
    } catch (error) {
      setError("Failed to delete leadership message");
      console.error("Error deleting leadership:", error);
    }
  };

  // Job Applications Management Functions
  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowJobApplicationModal(true);
  };

  const handleUpdateApplicationStatus = async (applicationId, status, notes = "") => {
    try {
      const response = await axios.put(
        `/aak/l1/admin/job-applications/${applicationId}`,
        {
          status,
          notes,
          reviewedBy: "Admin", // You can get actual admin name from auth context
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        fetchJobApplications();
        fetchApplicationStats();
        setShowJobApplicationModal(false);
        setError("");
      }
    } catch (error) {
      setError("Failed to update application status");
      console.error("Error updating application:", error);
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    try {
      await axios.delete(`/aak/l1/admin/job-applications/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchJobApplications();
      fetchApplicationStats();
      setDeleteApplicationId(null);
      setError("");
    } catch (error) {
      setError("Failed to delete job application");
      console.error("Error deleting application:", error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "under_review":
        return "status-under-review";
      case "shortlisted":
        return "status-shortlisted";
      case "rejected":
        return "status-rejected";
      case "hired":
        return "status-hired";
      default:
        return "status-pending";
    }
  };

  const formatStatus = (status) => {
    return status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const handleAddNew = () => {
    navigate("/projects/add");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
          <p className="welcome-text">Welcome back, {JSON.parse(localStorage.getItem("user"))?.name || "Admin"}</p>
        </div>
        <div className="header-right">
          <button className="add-project-btn" onClick={handleAddNew}>
            <i className="fas fa-plus"></i> Add New Project
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          <i className="fas fa-project-diagram"></i> Projects
        </button>
        <button
          className={`tab-btn ${activeTab === "carousel" ? "active" : ""}`}
          onClick={() => setActiveTab("carousel")}
        >
          <i className="fas fa-images"></i> Carousel Management
        </button>
        <button className={`tab-btn ${activeTab === "team" ? "active" : ""}`} onClick={() => setActiveTab("team")}>
          <i className="fas fa-users"></i> Team Management
        </button>
        <button
          className={`tab-btn ${activeTab === "career-photos" ? "active" : ""}`}
          onClick={() => setActiveTab("career-photos")}
        >
          <i className="fas fa-camera"></i> Career Photos
        </button>
        <button
          className={`tab-btn ${activeTab === "leadership" ? "active" : ""}`}
          onClick={() => setActiveTab("leadership")}
        >
          <i className="fas fa-user-tie"></i> Leadership
        </button>
        <button
          className={`tab-btn ${activeTab === "job-applications" ? "active" : ""}`}
          onClick={() => setActiveTab("job-applications")}
        >
          <i className="fas fa-file-alt"></i> Job Applications
        </button>
      </div>

      {activeTab === "projects" && (
        <>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p className="stat-number">{stats.totalProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Industrial</h3>
          <p className="stat-number">{stats.industrialProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Infrastructure</h3>
          <p className="stat-number">{stats.infrastructureProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Special Assignments</h3>
          <p className="stat-number">{stats.specialAssignments}</p>
        </div>
        <div className="stat-card">
          <h3>Multistored Buildings</h3>
          <p className="stat-number">{stats.multistoredBuildings}</p>
        </div>
      </div>

      <div className="projects-section">
        <div className="section-header">
          <h2>All Projects</h2>
          <div className="search-box">
            <input type="text" placeholder="Search projects..." />
            <i className="fas fa-search"></i>
          </div>
        </div>

        <div className="projects-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <div className="project-title">
                      {project.images[0] && (
                        <img src={project.images[0]} alt={project.title} className="project-thumbnail" />
                      )}
                      <span>{project.title}</span>
                    </div>
                  </td>
                  <td>{project.category}</td>
                  <td>{project.subcategory}</td>
                  <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => handleEdit(project)}>
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(project)}>
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}

      {activeTab === "carousel" && (
        <div className="carousel-section">
          <div className="section-header">
            <h2>Carousel Management</h2>
            <button className="add-slide-btn" onClick={handleAddSlide}>
              <i className="fas fa-plus"></i> Add New Slide
            </button>
          </div>

          {carouselLoading ? (
            <div className="loading">Loading carousel slides...</div>
          ) : (
            <div className="carousel-table">
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {carouselSlides.map((slide) => (
                    <tr key={slide._id}>
                      <td>
                        <div className="order-controls">
                          <span className="order-number">{slide.order}</span>
                          <div className="order-buttons">
                            <button
                              className="order-btn"
                              onClick={() => handleMoveSlide(slide._id, "up")}
                              disabled={slide.order === 1}
                            >
                              <i className="fas fa-arrow-up"></i>
                            </button>
                            <button
                              className="order-btn"
                              onClick={() => handleMoveSlide(slide._id, "down")}
                              disabled={slide.order === carouselSlides.length}
                            >
                              <i className="fas fa-arrow-down"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <img src={slide.imageUrl} alt={slide.title} className="slide-thumbnail" />
                      </td>
                      <td>{slide.title}</td>
                      <td>{slide.subtitle}</td>
                      <td className="actions">
                        <button className="edit-btn" onClick={() => handleEditSlide(slide)}>
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button className="delete-btn" onClick={() => setDeleteSlideId(slide._id)}>
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "team" && (
        <div className="team-section">
          <div className="section-header">
            <h2>Team Management</h2>
            <button className="add-member-btn" onClick={handleAddMember}>
              <i className="fas fa-plus"></i> Add New Member
            </button>
          </div>

          {teamLoading ? (
            <div className="loading">Loading team members...</div>
          ) : (
            <div className="team-table">
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member._id}>
                      <td>
                        <div className="order-controls">
                          <span className="order-number">{member.order}</span>
                          <div className="order-buttons">
                            <button
                              className="order-btn"
                              onClick={() => handleMoveMember(member._id, "up")}
                              disabled={member.order === 1}
                            >
                              <i className="fas fa-arrow-up"></i>
                            </button>
                            <button
                              className="order-btn"
                              onClick={() => handleMoveMember(member._id, "down")}
                              disabled={member.order === teamMembers.length}
                            >
                              <i className="fas fa-arrow-down"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <img src={member.photoUrl} alt={member.name} className="member-thumbnail" />
                      </td>
                      <td>{member.name}</td>
                      <td>{member.position}</td>
                      <td>{member.department}</td>
                      <td className="actions">
                        <button className="edit-btn" onClick={() => handleEditMember(member)}>
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button className="delete-btn" onClick={() => setDeleteMemberId(member._id)}>
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "career-photos" && (
        <div className="career-photos-section">
          <div className="section-header">
            <h2>Career Photos Management</h2>
            <button className="add-photo-btn" onClick={handleAddPhoto}>
              <i className="fas fa-plus"></i> Add New Photo
            </button>
          </div>

          {careerPhotosLoading ? (
            <div className="loading">Loading career photos...</div>
          ) : (
            <div className="career-photos-table">
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {careerPhotos.map((photo) => (
                    <tr key={photo._id}>
                      <td>
                        <div className="order-controls">
                          <span className="order-number">{photo.order}</span>
                          <div className="order-buttons">
                            <button
                              className="order-btn"
                              onClick={() => handleMovePhoto(photo._id, "up")}
                              disabled={photo.order === 1}
                            >
                              <i className="fas fa-arrow-up"></i>
                            </button>
                            <button
                              className="order-btn"
                              onClick={() => handleMovePhoto(photo._id, "down")}
                              disabled={photo.order === careerPhotos.length}
                            >
                              <i className="fas fa-arrow-down"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <img src={photo.imageUrl} alt={photo.title} className="photo-thumbnail" />
                      </td>
                      <td>{photo.title}</td>
                      <td>{photo.description || "No description"}</td>
                      <td className="actions">
                        <button className="edit-btn" onClick={() => handleEditPhoto(photo)}>
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button className="delete-btn" onClick={() => setDeletePhotoId(photo._id)}>
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "leadership" && (
        <div className="leadership-section">
          <div className="section-header">
            <h2>Leadership Management</h2>
            <button className="add-leader-btn" onClick={handleAddLeader}>
              <i className="fas fa-plus"></i> Add Leadership Message
            </button>
          </div>

          {leadershipLoading ? (
            <div className="loading">Loading leadership messages...</div>
          ) : (
            <div className="leadership-table">
              <table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Message Preview</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leadership.map((leader) => (
                    <tr key={leader._id}>
                      <td>
                        <span className={`role-badge ${leader.role.toLowerCase()}`}>{leader.role}</span>
                      </td>
                      <td>
                        <img src={leader.photoUrl} alt={leader.name} className="leader-thumbnail" />
                      </td>
                      <td>{leader.name}</td>
                      <td>{leader.title || "N/A"}</td>
                      <td className="message-preview">{leader.message.substring(0, 100)}...</td>
                      <td className="actions">
                        <button className="edit-btn" onClick={() => handleEditLeader(leader)}>
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button className="delete-btn" onClick={() => setDeleteLeaderId(leader._id)}>
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {leadership.length === 0 && (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No leadership messages found. Add Chairman and Director messages.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Career Photos Modal */}
      {showCareerPhotosModal && (
        <div className="modal-overlay">
          <div className="modal-content career-photos-modal">
            <h3>{editingPhoto ? "Edit Career Photo" : "Add New Career Photo"}</h3>
            <form onSubmit={handlePhotoFormSubmit}>
              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="url"
                  value={photoForm.imageUrl}
                  onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                  required
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  required
                  maxLength="100"
                />
              </div>
              <div className="form-group">
                <label>Description (Optional):</label>
                <textarea
                  value={photoForm.description}
                  onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                  maxLength="200"
                  rows="3"
                  placeholder="Brief description of the photo..."
                />
              </div>
              <div className="form-group">
                <label>Order:</label>
                <input
                  type="number"
                  value={photoForm.order}
                  onChange={(e) => setPhotoForm({ ...photoForm, order: parseInt(e.target.value) })}
                  min="1"
                  required
                />
              </div>
              {photoForm.imageUrl && (
                <div className="image-preview">
                  <img src={photoForm.imageUrl} alt="Preview" />
                </div>
              )}
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowCareerPhotosModal(false)}>
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button type="submit" className="save-btn">
                  <i className="fas fa-save"></i> {editingPhoto ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === "job-applications" && (
        <div className="job-applications-section">
          <div className="section-header">
            <h2>Job Applications Management</h2>
            <div className="application-filters">
              <select
                value={applicationFilters.status}
                onChange={(e) => {
                  setApplicationFilters({ ...applicationFilters, status: e.target.value });
                  fetchJobApplications();
                }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
              <select
                value={applicationFilters.designation}
                onChange={(e) => {
                  setApplicationFilters({ ...applicationFilters, designation: e.target.value });
                  fetchJobApplications();
                }}
              >
                <option value="all">All Positions</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Civil Engineer">Civil Engineer</option>
                <option value="Site Engineer">Site Engineer</option>
                {/* Add more as needed */}
              </select>
            </div>
          </div>

          {applicationStats && (
            <div className="application-stats">
              <div className="stat-card">
                <h3>{applicationStats.total}</h3>
                <p>Total Applications</p>
              </div>
              <div className="stat-card">
                <h3>{applicationStats.thisMonth}</h3>
                <p>This Month</p>
              </div>
              <div className="stat-card">
                <h3>{applicationStats.byStatus?.find((s) => s._id === "pending")?.count || 0}</h3>
                <p>Pending Review</p>
              </div>
              <div className="stat-card">
                <h3>{applicationStats.byStatus?.find((s) => s._id === "shortlisted")?.count || 0}</h3>
                <p>Shortlisted</p>
              </div>
            </div>
          )}

          {jobApplicationsLoading ? (
            <div className="loading">Loading job applications...</div>
          ) : (
            <div className="job-applications-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Experience</th>
                    <th>Status</th>
                    <th>Applied Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobApplications.map((application) => (
                    <tr key={application._id}>
                      <td>
                        <div className="applicant-info">
                          <strong>
                            {application.firstName} {application.lastName}
                          </strong>
                          <span className="email">{application.email}</span>
                        </div>
                      </td>
                      <td>{application.designation}</td>
                      <td>{application.experience}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                          {formatStatus(application.status)}
                        </span>
                      </td>
                      <td>{new Date(application.appliedDate).toLocaleDateString()}</td>
                      <td className="actions">
                        <button className="view-btn" onClick={() => handleViewApplication(application)}>
                          <i className="fas fa-eye"></i> View
                        </button>
                        <button className="delete-btn" onClick={() => setDeleteApplicationId(application._id)}>
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {jobApplications.length === 0 && (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No job applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Job Application Modal */}
      {showJobApplicationModal && selectedApplication && (
        <div className="modal-overlay">
          <div className="modal-content job-application-modal">
            <h3>Job Application Details</h3>
            <div className="application-details">
              <div className="applicant-header">
                <h4>
                  {selectedApplication.firstName} {selectedApplication.lastName}
                </h4>
                <span className={`status-badge ${getStatusBadgeClass(selectedApplication.status)}`}>
                  {formatStatus(selectedApplication.status)}
                </span>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{selectedApplication.email}</span>
                </div>
                <div className="detail-item">
                  <label>Phone:</label>
                  <span>
                    {selectedApplication.countryCode} {selectedApplication.phone}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Position Applied:</label>
                  <span>{selectedApplication.designation}</span>
                </div>
                <div className="detail-item">
                  <label>Experience:</label>
                  <span>{selectedApplication.experience} years</span>
                </div>
                <div className="detail-item">
                  <label>Qualification:</label>
                  <span>{selectedApplication.qualification}</span>
                </div>
                <div className="detail-item">
                  <label>Location:</label>
                  <span>{selectedApplication.location}</span>
                </div>
                <div className="detail-item">
                  <label>Applied Date:</label>
                  <span>{new Date(selectedApplication.appliedDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <label>Resume:</label>
                  <a
                    href={selectedApplication.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-link"
                  >
                    📄 Download Resume
                  </a>
                </div>
              </div>

              {selectedApplication.notes && (
                <div className="notes-section">
                  <label>Notes:</label>
                  <p>{selectedApplication.notes}</p>
                </div>
              )}

              <div className="status-update">
                <h4>Update Status</h4>
                <div className="status-buttons">
                  <button
                    className="status-btn pending"
                    onClick={() => handleUpdateApplicationStatus(selectedApplication._id, "pending")}
                  >
                    Pending
                  </button>
                  <button
                    className="status-btn under-review"
                    onClick={() => handleUpdateApplicationStatus(selectedApplication._id, "under_review")}
                  >
                    Under Review
                  </button>
                  <button
                    className="status-btn shortlisted"
                    onClick={() => handleUpdateApplicationStatus(selectedApplication._id, "shortlisted")}
                  >
                    Shortlisted
                  </button>
                  <button
                    className="status-btn rejected"
                    onClick={() => handleUpdateApplicationStatus(selectedApplication._id, "rejected")}
                  >
                    Rejected
                  </button>
                  <button
                    className="status-btn hired"
                    onClick={() => handleUpdateApplicationStatus(selectedApplication._id, "hired")}
                  >
                    Hired
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowJobApplicationModal(false)}>
                <i className="fas fa-times"></i> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leadership Modal */}
      {showLeadershipModal && (
        <div className="modal-overlay">
          <div className="modal-content leadership-modal">
            <h3>{editingLeader ? "Edit Leadership Message" : "Add Leadership Message"}</h3>
            <form onSubmit={handleLeaderFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Role:</label>
                  <select
                    value={leaderForm.role}
                    onChange={(e) => setLeaderForm({ ...leaderForm, role: e.target.value })}
                    required
                    disabled={editingLeader} // Prevent changing role when editing
                  >
                    <option value="Chairman">Chairman</option>
                    <option value="Director">Director</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={leaderForm.name}
                    onChange={(e) => setLeaderForm({ ...leaderForm, name: e.target.value })}
                    required
                    maxLength="100"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Photo URL:</label>
                <input
                  type="url"
                  value={leaderForm.photoUrl}
                  onChange={(e) => setLeaderForm({ ...leaderForm, photoUrl: e.target.value })}
                  required
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              <div className="form-group">
                <label>Title (Optional):</label>
                <input
                  type="text"
                  value={leaderForm.title}
                  onChange={(e) => setLeaderForm({ ...leaderForm, title: e.target.value })}
                  maxLength="200"
                  placeholder="e.g., Founder & Chairman"
                />
              </div>
              <div className="form-group">
                <label>Message:</label>
                <textarea
                  value={leaderForm.message}
                  onChange={(e) => setLeaderForm({ ...leaderForm, message: e.target.value })}
                  required
                  rows="8"
                  placeholder="Enter the complete message content..."
                />
              </div>
              <div className="form-group">
                <label>Signature (Optional):</label>
                <textarea
                  value={leaderForm.signature}
                  onChange={(e) => setLeaderForm({ ...leaderForm, signature: e.target.value })}
                  rows="3"
                  maxLength="500"
                  placeholder="e.g., With best regards, [Name]"
                />
              </div>
              {leaderForm.photoUrl && (
                <div className="image-preview">
                  <img src={leaderForm.photoUrl} alt="Preview" />
                </div>
              )}
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowLeadershipModal(false)}>
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button type="submit" className="save-btn">
                  <i className="fas fa-save"></i> {editingLeader ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Team Modal */}
      {showTeamModal && (
        <div className="modal-overlay">
          <div className="modal-content team-modal">
            <h3>{editingMember ? "Edit Team Member" : "Add New Team Member"}</h3>
            <form onSubmit={handleMemberFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    required
                    maxLength="100"
                  />
                </div>
                <div className="form-group">
                  <label>Position:</label>
                  <input
                    type="text"
                    value={memberForm.position}
                    onChange={(e) => setMemberForm({ ...memberForm, position: e.target.value })}
                    required
                    maxLength="150"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Photo URL:</label>
                <input
                  type="url"
                  value={memberForm.photoUrl}
                  onChange={(e) => setMemberForm({ ...memberForm, photoUrl: e.target.value })}
                  required
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department:</label>
                  <select
                    value={memberForm.department}
                    onChange={(e) => setMemberForm({ ...memberForm, department: e.target.value })}
                  >
                    <option value="Management">Management</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Order:</label>
                  <input
                    type="number"
                    value={memberForm.order}
                    onChange={(e) => setMemberForm({ ...memberForm, order: parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={memberForm.description}
                  onChange={(e) => setMemberForm({ ...memberForm, description: e.target.value })}
                  maxLength="500"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={memberForm.phone}
                    onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                    maxLength="20"
                  />
                </div>
              </div>

              <div className="social-links">
                <h4>Social Links (Optional):</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>LinkedIn:</label>
                    <input
                      type="url"
                      value={memberForm.socialLinks.linkedin}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          socialLinks: { ...memberForm.socialLinks, linkedin: e.target.value },
                        })
                      }
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="form-group">
                    <label>Twitter:</label>
                    <input
                      type="url"
                      value={memberForm.socialLinks.twitter}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          socialLinks: { ...memberForm.socialLinks, twitter: e.target.value },
                        })
                      }
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </div>
              </div>

              {memberForm.photoUrl && (
                <div className="image-preview">
                  <img src={memberForm.photoUrl} alt="Preview" />
                </div>
              )}

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowTeamModal(false)}>
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button type="submit" className="save-btn">
                  <i className="fas fa-save"></i> {editingMember ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Carousel Modal */}
      {showCarouselModal && (
        <div className="modal-overlay">
          <div className="modal-content carousel-modal">
            <h3>{editingSlide ? "Edit Slide" : "Add New Slide"}</h3>
            <form onSubmit={handleSlideFormSubmit}>
              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="url"
                  value={slideForm.imageUrl}
                  onChange={(e) => setSlideForm({ ...slideForm, imageUrl: e.target.value })}
                  required
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={slideForm.title}
                  onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                  required
                  maxLength="100"
                />
              </div>
              <div className="form-group">
                <label>Subtitle:</label>
                <input
                  type="text"
                  value={slideForm.subtitle}
                  onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                  required
                  maxLength="150"
                />
              </div>
              <div className="form-group">
                <label>Order:</label>
                <input
                  type="number"
                  value={slideForm.order}
                  onChange={(e) => setSlideForm({ ...slideForm, order: parseInt(e.target.value) })}
                  min="1"
                  required
                />
              </div>
              {slideForm.imageUrl && (
                <div className="image-preview">
                  <img src={slideForm.imageUrl} alt="Preview" />
                </div>
              )}
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowCarouselModal(false)}>
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button type="submit" className="save-btn">
                  <i className="fas fa-save"></i> {editingSlide ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{selectedProject.title}"?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={confirmDelete}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide Delete Modal */}
      {deleteSlideId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this carousel slide?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteSlideId(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={() => handleDeleteSlide(deleteSlideId)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Member Delete Modal */}
      {deleteMemberId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this team member?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteMemberId(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={() => handleDeleteMember(deleteMemberId)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Career Photo Delete Modal */}
      {deletePhotoId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this career photo?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeletePhotoId(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={() => handleDeletePhoto(deletePhotoId)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leadership Delete Modal */}
      {deleteLeaderId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this leadership message?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteLeaderId(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={() => handleDeleteLeader(deleteLeaderId)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Application Delete Modal */}
      {deleteApplicationId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this job application?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteApplicationId(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={() => handleDeleteApplication(deleteApplicationId)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
