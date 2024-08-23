import React, { useState } from "react";
import "./Policy.css"; // Import your CSS file
import { FiChevronRight } from "react-icons/fi"; // Import the icon

const Policy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (sectionId) => {
    setActiveSection(sectionId === activeSection ? null : sectionId);
  };

  return (
    <div className="custom-container d-flex flex-row align-items-stretch">
      <div
        onClick={() => toggleSection("section-1")}
        className={`section section-1 ${activeSection === "section-1" ? "grow" : "shrink"} shadow-dark`}
        role="tabpanel"
        aria-labelledby="Preview"
      >
        <button
          onClick={() => toggleSection("section-1")}
          className="button-thin"
          aria-label="Click to expand Section 1"
          aria-expanded={activeSection === "section-1"}
        >
          <FiChevronRight aria-hidden="true" />
        </button>
        <h3>Quality Policy</h3>
        <ul className={`main-text ${activeSection === "section-1" ? "show animate" : "hide"}`}>
          <li>Deliver consistent quality projects and services.</li>
          <li>Achieve quality leadership from project design to maintenance.</li>
          <li>Use the right quality of materials.</li>
          <li>Maintain a competent and well-coordinated team.</li>
          <li>Focus on continuous improvement in all project aspects.</li>
          <li>Implement rigorous quality control measures.</li>
          <li>Ensure customer satisfaction through regular feedback.</li>
          <li>Adopt best practices and industry standards.</li>
        </ul>
      </div>

      <div
        className={`section section-2 ${activeSection === "section-2" ? "grow" : "shrink"} shadow-pink`}
        role="tabpanel"
        aria-labelledby="Study"
      >
        <button
          onClick={() => toggleSection("section-2")}
          className="button-thin"
          aria-label="Click to expand Section 2"
          aria-expanded={activeSection === "section-2"}
        >
          <FiChevronRight aria-hidden="true" />
        </button>
        <h3>Social Responsibility</h3>
        <ul className={`main-text ${activeSection === "section-2" ? "show animate" : "hide"}`}>
          <li>Commit to creating a sustained positive impact on society.</li>
          <li>Adhere to high social and ethical standards.</li>
          <li>Focus on social welfare and environmental protection.</li>
          <li>Encourage a culture of volunteering.</li>
          <li>Integrate CSR into the business approach for sustainable development.</li>
          <li>Support community development initiatives.</li>
          <li>Promote education and skill development programs.</li>
          <li>Engage in environmentally sustainable practices.</li>
        </ul>
      </div>

      <div
        className={`section section-3 ${activeSection === "section-3" ? "grow" : "shrink"} shadow-blue`}
        role="tabpanel"
        aria-labelledby="Revise"
      >
        <button
          onClick={() => toggleSection("section-3")}
          className="button-thin"
          aria-label="Click to expand Section 3"
          aria-expanded={activeSection === "section-3"}
        >
          <FiChevronRight aria-hidden="true" />
        </button>
        <h3>HSE Policy</h3>
        <ul className={`main-text ${activeSection === "section-3" ? "show animate" : "hide"}`}>
          <li>Ensure safe working conditions and practices at project sites.</li>
          <li>Train senior personnel to maintain safe working conditions.</li>
          <li>Communicate effectively for the health and safety of all employees and associates.</li>
          <li>Ensure harmonious relations with other agencies on the same project.</li>
          <li>Ensure safe use of tools, tackles, plant, and machinery.</li>
          <li>Maintain neat, clean, and tidy surroundings for a good working environment.</li>
          <li>Monitor and record compliance with the HSE policy.</li>
          <li>Comply with all statutory requirements.</li>
          <li>Promote a culture of safety awareness and responsibility among all employees.</li>
        </ul>
      </div>

      <div
        className={`section section-4 ${activeSection === "section-4" ? "grow" : "shrink"} shadow-green`}
        role="tabpanel"
        aria-labelledby="Expand"
      >
        <button
          onClick={() => toggleSection("section-4")}
          className="button-thin"
          aria-label="Click to expand Section 4"
          aria-expanded={activeSection === "section-4"}
        >
          <FiChevronRight aria-hidden="true" />
        </button>
        <h3>Code of Conduct</h3>
        <ul className={`main-text ${activeSection === "section-4" ? "show animate" : "hide"}`}>
          <li>Follow Progressive's employee code of conduct with pride.</li>
          <li>Maintain high standards of corporate and personal behavior.</li>
          <li>Be sincere, honest, and hardworking.</li>
          <li>Take initiative and have drive in their work.</li>
          <li>Commit to excellence and continuous improvement.</li>
          <li>Adhere to reporting, compliance to standards, and law.</li>
          <li>Treat associates fairly, without bias in terms of caste, creed, religion, or sex.</li>
          <li>Conduct respectful and effective meetings.</li>
          <li>Promote informal training and open communication.</li>
          <li>Treat vendors and subcontractors fairly and reasonably.</li>
          <li>Deliver quality projects and services to customers.</li>
          <li>Address suggestions, issues, and differences amicably.</li>
          <li>Protect whistleblower identity and confidentiality.</li>
          <li>Comply with all rules and laws of the land.</li>
          <li>Endeavor to reduce environmental impact.</li>
        </ul>
      </div>

      <div
        className={`section section-5 ${activeSection === "section-5" ? "grow" : "shrink"} shadow-purple`}
        role="tabpanel"
        aria-labelledby="Achieve"
      >
        <button
          onClick={() => toggleSection("section-5")}
          className="button-thin"
          aria-label="Click to expand Section 5"
          aria-expanded={activeSection === "section-5"}
        >
          <FiChevronRight aria-hidden="true" />
        </button>
        <h3>Sustainability Policy</h3>
        <ul className={`main-text ${activeSection === "section-5" ? "show animate" : "hide"}`}>
          <li>Conduct business in an economically viable and environmentally responsible manner.</li>
          <li>Commit to projects in a cleaner and safer environment.</li>
          <li>Mark a positive imprint through sustainable initiatives.</li>
          <li>Prepare and continuously review the sustainability materiality matrix.</li>
          <li>Set, monitor, and review environmental targets for continuous improvement.</li>
          <li>Minimize impact on climate change through increased use of clean energy.</li>
          <li>Responsibly source key materials required for operations.</li>
          <li>Develop safe, sustainable, and eco-friendly product processes and technologies.</li>
          <li>Annually create a report of sustainability performance.</li>
          <li>Encourage sustainable practices across all levels of the organization.</li>
          <li>Promote awareness and education on sustainability among employees.</li>
          <li>Engage stakeholders in sustainability initiatives and practices.</li>
        </ul>
      </div>

      <div
        className={`section section-6 ${activeSection === "section-6" ? "grow" : "shrink"} shadow-yellow`}
        role="tabpanel"
        aria-labelledby="Engage"
       
      >
        <button
          onClick={() => toggleSection("section-6")}
          className="button-thin"
          aria-label="Click to expand Section 6"
          aria-expanded={activeSection === "section-6"}
        >
          <FiChevronRight aria-hidden="true" />
        </button>
        <h3>Sourcing Policy</h3>
        <ul className={`main-text ${activeSection === "section-6" ? "show animate" : "hide"}`}>
          <li>Source quality material as per specified standards and customer needs.</li>
          <li>Efficiently source materials to ensure consistent and competitive supply.</li>
          <li>Communicate promptly with clients if materials are unavailable and propose alternative solutions.</li>
          <li>Stay informed about alternative sourcing options to enhance organizational value delivery.</li>
          <li>Develop partnerships with suppliers capable of meeting long-term business needs.</li>
        </ul>
      </div>

      <div
        className={`section section-7 ${activeSection === "section-7" ? "grow" : "shrink"} shadow-orange`}
        role="tabpanel"
        aria-labelledby="Support"
      >
        <button
          onClick={() => toggleSection("section-7")}
          className="button-thin"
          aria-label="Click to expand Section 7"
          aria-expanded={activeSection === "section-7"}
        >
          <FiChevronRight aria-hidden="true" />
        </button>
        <h3>Human Rights Policy</h3>
        <ul className={`main-text ${activeSection === "section-7" ? "show animate" : "hide"}`}>
          <li>Prohibit employment of workers below minimum age as per local and national laws.</li>
          <li>Avoid the use of forced or involuntary labor, ensuring all work is freely agreed upon.</li>
          <li>Do not discriminate based on caste, creed, color, religion, sex, or disability.</li>
          <li>Ensure wages meet or exceed legal minimum standards, including equal pay for equal work.</li>
          <li>Comply with local and industry standards for regular and overtime working hours.</li>
          <li>Provide a work environment free of harassment, violence, or threat of violence.</li>
          <li>Maintain safe and healthy project environments, adhering to all safety regulations.</li>
          <li>Commit to full legal compliance with all applicable laws and regulations.</li>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
