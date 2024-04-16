import React, { useState, useEffect } from "react";
import "./Projects.css";
import { animateScroll as scroll } from "react-scroll";

import first from "../assets/images/project/industrialBuildings.jpg";

import second from "../assets/images/project/Infrastructures bridges,flyovers and auqaducts.jpg";
import third from "../assets/images/project/interior & fitouts, repair & renovation.jpg";
import fourth from "../assets/images/project/Commercial Buildings,Residential Projects.jpg";

import ind1 from "../assets/images/industrial Buildings/LPG Refrigerated Storage and Handling Facilities, BPCL, Uran.png";
import ind2 from "../assets/images/industrial Buildings/LPG Plant BPCL URAN.png";
import ind3 from "../assets/images/industrial Buildings/LPG Tank Pad Foundation,  BPCL, Uran.png";
import ind4 from "../assets/images/industrial Buildings/Raft Foundation for LPG Storage Plant BPCL Uran.png";

import indes1 from "../assets/images/industrial/eng structure/Tatsuno india.jpg";
import indes2 from "../assets/images/industrial/eng structure/TGw machine.png";
import indes3 from "../assets/images/industrial/eng structure/TGw machine2.png";
import indes4 from "../assets/images/industrial/eng structure/Tractors eng.png";
import indes5 from "../assets/images/industrial/eng structure/warehouse for kellogs.jpg";

import indff1 from "../assets/images/industrial/food and farma/godrej agrovet.png";
import indff2 from "../assets/images/industrial/food and farma/godrej agrovet2.jpg";
import indff3 from "../assets/images/industrial/food and farma/johnson&johnson.png";
import indff4 from "../assets/images/industrial/food and farma/Smith  and newphaw sinnar 1.png";
import indff5 from "../assets/images/industrial/food and farma/smith and newphaw ltd sinner 2.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Projects = () => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/projects/${product.id}`, { state: { product } });
  };
  
  const [activeSection, setActiveSection] = useState(null);

  const handleCardClick = (section) => {
    setActiveSection(section);
    // scrollIntoView(section);
  };

  const [activeFilter, setActiveFilter] = useState("Engineering Structures");
  const [activeFilterInfrastructure, setActiveFilterInfrastructure] = useState("Bridges, Flyovers and Aqueducts");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handlFilterChangeInfrasture = (filter) => {
    setActiveFilterInfrastructure(filter);
  };

  const scrollIntoView = (section) => {
    const targetElement = document.getElementById(`section-${section}`);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop; // Adjust the offset as needed
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Call scrollIntoView when the component is mounted
    if (activeSection) {
      scrollIntoView(activeSection);
    }
  }, [activeSection]); // Trigger the effect whenever activeSection changes


  const indes = [
    { id: 1, title: 'Isaac Asimov', description: 'Description of Isaac Asimov\'s project', image: indes1 },
    { id: 2, title: 'Isaac Asimov', description: 'Description of Isaac Asimov\'s project', image: indes2 },
    { id: 3, title: 'Isaac Asimov', description: 'Description of Isaac Asimov\'s project', image: indes3 },
    { id: 4, title: 'Isaac Asimov', description: 'Description of Isaac Asimov\'s project', image: indes4 },
    { id: 5, title: 'Isaac Asimov', description: 'Description of Isaac Asimov\'s project', image: indes5 },
    // Add more product data
  ];

  return (
    <div>
      {/* <div className="headproj">
       <h1>Projects</h1> 
    </div> */}
      {/* <div class="cards-list">
        <div class="card 1">
          <div class="card_image">
        
            <img src="https://www.stevensec.com/hubfs/construction-company/how-is-bim-changing-the-construction-industry/best-industrial-construction-company.jpg" />{" "}
          </div>
          <div class="card_title title-white">
            <p>Industrial Buildings</p>
          </div>
        </div>

       
          <div class="card 2">
            <div class="card_image">
              <img src="https://constructionexec.com/assets/site_18/images/article/shutterstock_37230340.jpg?width=800" />
            </div>
            <div class="card_title title-white">
              <p>infrastructures</p>
            </div>
          </div>
         

        <div class="card 3">
          <div class="card_image">
            <img src="https://planradar-website.s3.amazonaws.com/production/uploads/2021/12/Fit-out-1.jpg" />
          </div>
          <div class="card_title">
            <p>Special Assignments</p>
          </div>
        </div>

        <div class="card 4">
          <div class="card_image">
            <img src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/201909/infrastructure_india_660_091719122913.jpg" />
          </div>
          <div class="card_title title-black">
            <p>Multistored Buildings</p>
          </div>
        </div>
      </div>
 */}

      <section class="section-5 projsection" name="section-projects" id="section-projects">
        <div class="heading">
          <h1>Projects</h1>
        </div>
        <div class="row">
          <figure class="figure" onClick={() => handleCardClick("industrial")}>
            <img src={first} alt="" />
            <figcaption>
              <div class="icon">
                <span>
                  <ion-icon name="images"></ion-icon>
                </span>
              </div>
              <h2>
                Industrial <span>Buildings</span>
              </h2>
              <div class="caption">
                <p>View</p>
              </div>
            </figcaption>
            <a href="#"></a>
          </figure>
          <figure class="figure" onClick={() => handleCardClick("infrastructures")}>
            <img src={second} alt="" />
            <figcaption>
              <div class="icon">
                <span>
                  <ion-icon name="images"></ion-icon>
                </span>
              </div>
              <h2>
                {" "}
                <span>Infrastructures</span>
              </h2>
              <div class="caption">
                <p>View</p>
              </div>
            </figcaption>
            <a href="#"></a>
          </figure>
          <figure class="figure" onClick={() => handleCardClick("specialAssignments")}>
            <img src={third} alt="" />
            <figcaption>
              <div class="icon">
                <span>
                  <ion-icon name="images"></ion-icon>
                </span>
              </div>
              <h2>
                Special <span>Assignments</span>
              </h2>
              <div class="caption">
                <p>View</p>
              </div>
            </figcaption>
            <a href="#"></a>
          </figure>
          <figure class="figure" onClick={() => handleCardClick("multistored")}>
            <img src={fourth} alt="" />
            <figcaption>
              <div class="icon">
                <span>
                  <ion-icon name="images"></ion-icon>
                </span>
              </div>
              <h2>
                Multistored <span>Buildings</span>
              </h2>
              <div class="caption">
                <p>View</p>
              </div>
            </figcaption>
            <a href="#"></a>
          </figure>
        </div>
      </section>

      {activeSection === "industrial" && (
        <section className="section-6 projsection" id="section-industrial" name="section-industrial">
          <div className="heading">
            <h1>Industrial Buildings</h1>
          </div>
          <div className="industrialfilters">
            <div
              className={activeFilter === "Engineering Structures" ? "active" : ""}
              onClick={() => handleFilterChange("Engineering Structures")}
            >
              Engineering Structures
            </div>
            <div
              className={activeFilter === "Food and Pharma" ? "active" : ""}
              onClick={() => handleFilterChange("Food and Pharma")}
            >
              Food and Pharma
            </div>
            <div
              className={activeFilter === "Oil & Gas, Heavy Engineering" ? "active" : ""}
              onClick={() => handleFilterChange("Oil & Gas, Heavy Engineering")}
            >
              Oil & Gas, Heavy Engineering
            </div>
          </div>
          <div className="row">
            {activeFilter === "Engineering Structures" && (
              <>
              {indes.map(product => (
        <div key={product.id} onClick={() => handleProductClick(product)}>
          <figure className="figure">
            <img src={product.image} alt="" />
            <figcaption>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </figcaption>
          </figure>
        </div>
      ))}
               
              </>
            )}

            {activeFilter === "Food and Pharma" && (
              <>
                <figure className="figure">
                  <img src={indff1} alt="" />
                  <figcaption>
                    <h3>Godrej Agrovet, Bangalore</h3>
                    <p>
                      "Godrej - a leading name in the industry had appointed us to construct the RGC (Real Good Chicken)
                      plant at Bangalore. Our scope of work involves construction of sheds, clean rooms, processing
                      area, storage area, rendering plant and wastage processing zone. Independent concrete batch mix
                      plant with concrete pump was set up of this project"
                    </p>
                  </figcaption>
                  <a href="#"></a>
                </figure>
                <figure className="figure">
                  <img src={indff2} alt="" />
                  <figcaption>
                    <h3>Philip K. Dick</h3>
                    <p>
                      "I, for one, bet on science as helping us. I have yet to see how it fundamentally endangers us,
                      even with the H-bomb lurking about. Science has given us more lives than it has taken; we must
                      remember that"
                    </p>
                  </figcaption>
                  <a href="#"></a>
                </figure>
                <figure className="figure">
                  <img src={indff3} alt="" />
                  <figcaption>
                    <h3>Jules Verne</h3>
                    <p>
                      "The moon, by her comparative proximity, and the constantly varying appearances produced by her
                      several phases, has always occupied a considerable share of the attention of the inhabitants of
                      Earth."
                    </p>
                  </figcaption>
                  <a href="#"></a>
                </figure>
                <figure className="figure">
                  <img src={indff4} alt="" />
                  <figcaption>
                    <h3>Jules Verne</h3>
                    <p>
                      "The moon, by her comparative proximity, and the constantly varying appearances produced by her
                      several phases, has always occupied a considerable share of the attention of the inhabitants of
                      Earth."
                    </p>
                  </figcaption>
                  <a href="#"></a>
                </figure>
                <figure className="figure">
                  <img src={indff5} alt="" />
                  <figcaption>
                    <h3>Jules Verne</h3>
                    <p>
                      "The moon, by her comparative proximity, and the constantly varying appearances produced by her
                      several phases, has always occupied a considerable share of the attention of the inhabitants of
                      Earth."
                    </p>
                  </figcaption>
                  <a href="#"></a>
                </figure>
              </>
            )}
            {/* Add similar conditional rendering for other filter options */}
          </div>
        </section>
      )}

      {activeSection === "infrastructures" && (
        <section className="section-6 projsection" id="section-infrastructures" name="section-infrastructures">
          <div className="heading">
            <h1>Infrastructures</h1>
          </div>
          <div className="infrastructureFilters">
            <div
              className={activeFilterInfrastructure === "Bridges, Flyovers and Aqueducts" ? "active" : ""}
              onClick={() => handlFilterChangeInfrasture("Bridges, Flyovers and Aqueducts")}
            >
              Bridges, Flyovers and Aqueducts
            </div>
            <div
              className={activeFilterInfrastructure === "Nuclear Structures" ? "active" : ""}
              onClick={() => handlFilterChangeInfrasture("Nuclear Structures")}
            >
              Nuclear Structures
            </div>
            <div
              className={activeFilterInfrastructure === "Water Supply & Sewage Treatment" ? "active" : ""}
              onClick={() => handlFilterChangeInfrasture("Water Supply & Sewage Treatment")}
            >
              Water Supply & Sewage Treatment
            </div>
            <div
              className={activeFilterInfrastructure === "Mass Excavation & Geotechnical Projects" ? "active" : ""}
              onClick={() => handlFilterChangeInfrasture("Mass Excavation & Geotechnical Projects")}
            >
              Mass Excavation & Geotechnical Projects
            </div>
          </div>
          <div className="row">
            {activeFilterInfrastructure === "Bridges, Flyovers and Aqueducts" && (
              <>
                <figure className="figure">
                  <img src={ind1} alt="" />
                  <figcaption>
                    <h3>Isaac Asimov</h3>
                    <p>
                      "But suppose we were to teach creationism. What would be the content of the teaching? Merely that
                      a creator formed the universe and all species of life ready-made? Nothing? No details?"
                    </p>
                  </figcaption>
                  <a href="#"></a>
                </figure>
                <figure className="figure">
                  <img src={ind2} alt="" />
                  <figcaption>
                    <h3>Philip K. Dick</h3>
                    <p>
                      "I, for one, bet on science as helping us. I have yet to see how it fundamentally endangers us,
                      even with the H-bomb lurking about. Science has given us more lives than it has taken; we must
                      remember that"
                    </p>
                  </figcaption>
                  <a href="#"></a>
                </figure>
                {/* Add additional figures for "Bridges, Flyovers and Aqueducts" filter option */}
              </>
            )}
            {/* Add similar conditional rendering blocks for other filter options */}
          </div>
        </section>
      )}

      {activeSection === "specialAssignments" && (
        <section class="section-6 projsection" id="section-specialAssignments" name="section-specialAssignments">
          <div class="heading">
            <h1>Special Assignments</h1>
          </div>
          <div class="row">
            <figure class="figure">
              <img src={ind1} />
              <figcaption>
                <h3>Isaac Asimov</h3>
                <p>
                  "But suppose we were to teach creationism. What would be the content of the teaching? Merely that a
                  creatore formed the universe and all specias of life ready-made? Nothing? No details?"
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
            <figure class="figure">
              <img src={ind2} />
              <figcaption>
                <h3>Philip K. Dick</h3>
                <p>
                  "I, for one, bet on science as helping us. I have yet to see how it fundamentally endagers us, even
                  with the H-bomb lurking about. Science has given us more lives than it has taken; we must remember
                  that"
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
            <figure class="figure">
              <img src={ind3} />
              <figcaption>
                <h3>Jules Verne</h3>
                <p>
                  "The moon, by her comparative proximity, and the constantly varying appearances produced by her
                  several phases, has always occupied a considerable share of the attention of the inhabitants of
                  Earth."
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
            <figure class="figure">
              <img src={ind3} />
              <figcaption>
                <h3>Jules Verne</h3>
                <p>
                  "The moon, by her comparative proximity, and the constantly varying appearances produced by her
                  several phases, has always occupied a considerable share of the attention of the inhabitants of
                  Earth."
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
            <figure class="figure">
              <img src={ind3} />
              <figcaption>
                <h3>Jules Verne</h3>
                <p>
                  "The moon, by her comparative proximity, and the constantly varying appearances produced by her
                  several phases, has always occupied a considerable share of the attention of the inhabitants of
                  Earth."
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
            <figure class="figure">
              <img src={ind3} />
              <figcaption>
                <h3>Jules Verne</h3>
                <p>
                  "The moon, by her comparative proximity, and the constantly varying appearances produced by her
                  several phases, has always occupied a considerable share of the attention of the inhabitants of
                  Earth."
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
          </div>
        </section>
      )}

      {activeSection === "multistored" && (
        <section class="section-6 projsection" id="section-multistored" name="section-multistored">
          <div class="heading">
            <h1>Multistored Buildings</h1>
          </div>
          <div class="row">
            <figure class="figure">
              <img src={ind1} />
              <figcaption>
                <h3>Isaac Asimov</h3>
                <p>
                  "But suppose we were to teach creationism. What would be the content of the teaching? Merely that a
                  creatore formed the universe and all specias of life ready-made? Nothing? No details?"
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
            <figure class="figure">
              <img src={ind2} />
              <figcaption>
                <h3>Philip K. Dick</h3>
                <p>
                  "I, for one, bet on science as helping us. I have yet to see how it fundamentally endagers us, even
                  with the H-bomb lurking about. Science has given us more lives than it has taken; we must remember
                  that"
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
            <figure class="figure">
              <img src={ind3} />
              <figcaption>
                <h3>Jules Verne</h3>
                <p>
                  "The moon, by her comparative proximity, and the constantly varying appearances produced by her
                  several phases, has always occupied a considerable share of the attention of the inhabitants of
                  Earth."
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
            <figure class="figure">
              <img src={ind3} />
              <figcaption>
                <h3>Jules Verne</h3>
                <p>
                  "The moon, by her comparative proximity, and the constantly varying appearances produced by her
                  several phases, has always occupied a considerable share of the attention of the inhabitants of
                  Earth."
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
            <figure class="figure">
              <img src={ind3} />
              <figcaption>
                <h3>Jules Verne</h3>
                <p>
                  "The moon, by her comparative proximity, and the constantly varying appearances produced by her
                  several phases, has always occupied a considerable share of the attention of the inhabitants of
                  Earth."
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
            <figure class="figure">
              <img src={ind3} />
              <figcaption>
                <h3>Jules Verne</h3>
                <p>
                  "The moon, by her comparative proximity, and the constantly varying appearances produced by her
                  several phases, has always occupied a considerable share of the attention of the inhabitants of
                  Earth."
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
          </div>
        </section>
      )}
    </div>
  );
};

export default Projects;
