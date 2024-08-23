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
import ProjectDetails from "./Pages/ProjectDetails.js";
import Imager from "./Pages/Imager.js";
import Footer from "./Layouts/Footer.js";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/aboutus" element={<History />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/careerPage" element={<CareerPage />} />
          {/* <Route path="/contactus" element={<ContactUs />} /> */}
          <Route path="/contactus" element={<Contact />} />

          {/* Define a wildcard route */}
          <Route path="*" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
