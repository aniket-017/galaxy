import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Layouts/Navbar.js"
import Home from "./Pages/Home.js"
import History from "./Pages/History.js"
import Clients from "./Pages/Clients.js"
import Projects from "./Pages/Projects.js" 
import ContactUs from "./Pages/ContactUs.js" 

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
        <Route path="/contactus" element={<ContactUs />} />
 
      </Routes>
    </Router>
  </>
  );
}

export default App;
