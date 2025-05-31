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
  const [stats, setStats] = useState({
    totalProjects: 0,
    industrialProjects: 0,
    infrastructureProjects: 0,
    specialAssignments: 0,
    multistoredBuildings: 0,
  });

  useEffect(() => {
    fetchProjects();
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
    </div>
  );
};

export default AdminDashboard;
