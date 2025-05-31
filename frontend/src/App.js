import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Layouts/Navbar.js";
import Home from "./Pages/Home.js";
import History from "./Pages/History.js";
import Clients from "./Pages/Clients.js";
import CareerPage from "./Pages/CareerPage.js";
import Projects from "./Pages/Projects.js";
import ContactUs from "./Pages/ContactUs.js";
import Contact from "./Pages/Contact.js";
import ProjectDetails from "./Pages/ProjectDetails";
import Imager from "./Pages/Imager.js";
import Footer from "./Layouts/Footer.js";
import NewProjects from "./Pages/NewProjects.js";
import AddProject from "./Pages/AddProject.js";
import Login from "./Pages/Login.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import AdminDashboard from "./Pages/AdminDashboard";
import EditProject from "./Pages/EditProject";
import NewProjectDetails from "./Pages/NewProjectDetails";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<History />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/newprojects" element={<NewProjects />} />
          <Route path="/newproject/:id" element={<NewProjectDetails />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/careerPage" element={<CareerPage />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="*" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/project/:id" element={<ProjectDetails />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/add"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditProject />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
