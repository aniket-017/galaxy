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

// oil section image

import indogh1 from "../assets/images/industrial/oil&gas/Asian paints R&D turbhe.png";
import indogh2 from "../assets/images/industrial/oil&gas/Asian paints R&D turbhe2.jpg";
import indogh3 from "../assets/images/industrial/oil&gas/Asian paints taloja1.png";
import indogh4 from "../assets/images/ProjectImg/industrial(1)/oil&gas/Asian paints taloja2.png";
import indogh5 from "../assets/images/industrial/oil&gas/flare stack.jpg";
import indogh6 from "../assets/images/industrial/oil&gas/lpg plat bpcl.jpg";
import indogh7 from "../assets/images/industrial/oil&gas/lpg tank pad.jpg";

// infra bridge images

import infrabfa1 from "../assets/images/ProjectImg/infrasture/bridges/badlapur flayour.jpg";
import infrabfa2 from "../assets/images/ProjectImg/infrasture/bridges/GHV Bridge dhule.jpg";
import infrabfa3 from "../assets/images/ProjectImg/infrasture/bridges/GHV Bridge dhule1.jpg";
import infrabfa4 from "../assets/images/ProjectImg/infrasture/bridges/jalna rob 1.jpg";
import infrabfa5 from "../assets/images/ProjectImg/infrasture/bridges/jalna rob 4.jpg";
import infrabfa6 from "../assets/images/ProjectImg/infrasture/bridges/jalna rob2.jpg";
import infrabfa7 from "../assets/images/ProjectImg/infrasture/bridges/jalna rob3.jpg";
import infrabfa8 from "../assets/images/ProjectImg/infrasture/bridges/Nerul flyour.jpg";
import infrabfa9 from "../assets/images/ProjectImg/infrasture/bridges/Rob & aliied.jpg";

// special assignment Interior and Renovation images

import saiao1 from "../assets/images/ProjectImg/special assignments/interior and fitouts/interior of R&D centre Asia pacific region mumbai.jpg";
import saiao2 from "../assets/images/ProjectImg/special assignments/interior and fitouts/siemens canteen.jpg";

// multistored building

import mbcb1 from "../assets/images/ProjectImg/multistoried/cummercial buildings/CITICORP Info tech.jpg";
import mbcb2 from "../assets/images/ProjectImg/multistoried/cummercial buildings/Simens car parking.jpg";

import mbphb1 from "../assets/images/ProjectImg/multistoried/public heritage buildings/Dr Ambedkar memorial mahad.jpg";
import mbphb2 from "../assets/images/ProjectImg/multistoried/public heritage buildings/Mahraja Agrasen Bhavan jalna.jpg";
import mbphb3 from "../assets/images/ProjectImg/multistoried/public heritage buildings/shiv samrtha smarak.jpg";
import mbphb4 from "../assets/images/ProjectImg/multistoried/public heritage buildings/shiv smarak electrical room setup1.jpg";
import mbphb5 from "../assets/images/ProjectImg/multistoried/public heritage buildings/shiv smarak electrical room setup2.jpg";
import mbphb6 from "../assets/images/ProjectImg/multistoried/public heritage buildings/shiv smarak transformer and pannel.jpg";
import mbphb7 from "../assets/images/ProjectImg/multistoried/public heritage buildings/shiv smarak1.jpg";
import mbphb8 from "../assets/images/ProjectImg/multistoried/public heritage buildings/shiv smarak2.jpg";
import mbphb9 from "../assets/images/ProjectImg/multistoried/public heritage buildings/shiv smarak3.jpg";
import mbphb10 from "../assets/images/ProjectImg/multistoried/public heritage buildings/shiv smarak4.jpg";
import mbphb11 from "../assets/images/ProjectImg/multistoried/public heritage buildings/shiv smarak5.jpg";
import mbphb12 from "../assets/images/ProjectImg/multistoried/public heritage buildings/shiv smarak6.jpg";
import mbphb13 from "../assets/images/ProjectImg/multistoried/public heritage buildings/shiv smarak7.jpg";
import mbphb14 from "../assets/images/ProjectImg/multistoried/public heritage buildings/shiv smarak8.jpg";

import mbrp1 from "../assets/images/ProjectImg/multistoried/residential projects/chaitanya tower.jpg";
import mbrp2 from "../assets/images/ProjectImg/multistoried/residential projects/Narayan aura vadora.jpg";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const [activeFilterInfrastructure, setActiveFilterInfrastructure] = useState(
    "Bridges, Flyovers and Aqueducts"
  );

  const [activeFilterSpecialAssignments, setActiveFilterSpecialAssignments] =
    useState("Customized Housing");
  const [activeFilterMultistoredBuilding, setActiveFilterMultistoredBuilding] =
    useState("Cummercial Buildings");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handlFilterChangeInfrasture = (filter) => {
    setActiveFilterInfrastructure(filter);
  };

  const handlFilterChangeSpecialAssignments = (filter) => {
    setActiveFilterSpecialAssignments(filter);
  };

  const handlFilterChangeMultistoredBuilding = (filter) => {
    setActiveFilterMultistoredBuilding(filter);
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
    {
      id: 1,
      title: "Isaac Asimov",
      description: "Description of Isaac Asimov's project",
      image: indes1,
    },
    {
      id: 2,
      title: "Isaac Asimov",
      description: "Description of Isaac Asimov's project",
      image: indes2,
    },
    {
      id: 3,
      title: "Isaac Asimov",
      description: "Description of Isaac Asimov's project",
      image: indes3,
    },
    {
      id: 4,
      title: "Isaac Asimov",
      description: "Description of Isaac Asimov's project",
      image: indes4,
    },
    {
      id: 5,
      title: "Isaac Asimov",
      description: "Description of Isaac Asimov's project",
      image: indes5,
    },
    // Add more product data
  ];

  const indfap = [
    {
      id: 1,
      title: "Godrej Agrovet, Bangalore",
      description:
        "Godrej - a leading name in the industry had appointed us to construct the RGC (Real Good Chicken) plant at Bangalore. Our scope of work involves construction of sheds, clean rooms, processing area, storage area, rendering plant and wastage processing zone. Independent concrete batch mix plant with concrete pump was set up of this project",
      image: indff1,
    },

    {
      id: 2,
      title: "Philip K. Dick",
      description:
        "I, for one, bet on science as helping us. I have yet to see how it fundamentally endangers us, even with the H-bomb lurking about. Science has given us more lives than it has taken; we must remember that",
      image: indff2,
    },
    {
      id: 3,
      title: "Jules Verne",
      description:
        "The moon, by her comparative proximity, and the constantly varying appearances produced by her several phases, has always occupied a considerable share of the attention of the inhabitants of Earth.",
      image: indff3,
    },
    {
      id: 4,
      title: "Jules Verne",
      description:
        "The moon, by her comparative proximity, and the constantly varying appearances produced by her several phases, has always occupied a considerable share of the attention of the inhabitants of Earth.",
      image: indff4,
    },
    {
      id: 5,
      title: "Jules Verne",
      description:
        "The moon, by her comparative proximity, and the constantly varying appearances produced by her several phases, has always occupied a considerable share of the attention of the inhabitants of Earth.",
      image: indff5,
    },
  ];

  const indogh = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: indogh1,
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: indogh2,
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: indogh3,
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: indogh4,
    },
    {
      id: 5,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: indogh5,
    },
    {
      id: 6,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: indogh6,
    },
    {
      id: 7,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: indogh7,
    },

  ];

  // Infra bridge img

  const infrabfa = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: infrabfa1,
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: infrabfa2,
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: infrabfa3,
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: infrabfa4,
    },
    {
      id: 5,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: infrabfa5,
    },
    {
      id: 6,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: infrabfa6,
    },
    {
      id: 7,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: infrabfa7,
    },
    {
      id: 8,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: infrabfa8,
    },
    {
      id: 9,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: infrabfa9,
    },
  ];

  // Special assignment interior

  const saiao = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: saiao1,
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: saiao2,
    },
  ];

  const mbcb = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbcb1,
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbcb2,
    },
  ];

  // multimode building public Heritage building

  const mbphb = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb1,
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb2,
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb3,
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb4,
    },
    {
      id: 5,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb5,
    },
    {
      id: 6,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb6,
    },
    {
      id: 7,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb7,
    },
    {
      id: 8,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb8,
    },
    {
      id: 9,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb9,
    },
    {
      id: 10,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb10,
    },
    {
      id: 11,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb11,
    },
    {
      id: 12,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb12,
    },
    {
      id: 13,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb13,
    },
    {
      id: 14,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbphb14,
    },
  ];

  const mbrp = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbrp1,
    },
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Irure id incididunt est ad dolor elit quis velit veniam irure Lorem.Dolore sit minim et nulla consequat officia aliqua Lorem occaecat ullamco deserunt deserunt duis.",
      image: mbrp2,
    },
  ];

  function truncateDescription(description, maxLength) {
    // console.log(description.length)
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncatedText = description.substring(0, maxLength);
      const lastSpaceIndex = truncatedText.lastIndexOf(" ");
      return truncatedText.substring(0, lastSpaceIndex) + "...";
    }
  }
  

  return (
    <div>
      <section
        class="section-5 projsection"
        name="section-projects"
        id="section-projects"
      >
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
          <figure
            class="figure"
            onClick={() => handleCardClick("infrastructures")}
          >
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
          <figure
            class="figure"
            onClick={() => handleCardClick("specialAssignments")}
          >
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
        <section
          className="section-6 projsection"
          id="section-industrial"
          name="section-industrial"
        >
          <div className="heading">
            <h1>Industrial Buildings</h1>
          </div>
          <div className="industrialfilters">
            <div
              className={
                activeFilter === "Engineering Structures" ? "active" : ""
              }
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
              className={
                activeFilter === "Oil & Gas, Heavy Engineering" ? "active" : ""
              }
              onClick={() => handleFilterChange("Oil & Gas, Heavy Engineering")}
            >
              Oil & Gas, Heavy Engineering
            </div>
          </div>
          <div className="row">
            {activeFilter === "Engineering Structures" && (
              <>
                {indes.map((product) => (
                  <figure className="figure"
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    {/* <figure className="figure"> */}
                      <img src={product.image} alt="" />
                      <figcaption>
                        <h3>{product.title}</h3>
                        <p>{truncateDescription(product.description, 100)}</p>
                      </figcaption>
                    {/* </figure> */}
                  </figure>
                ))}
              </>
            )}

            {activeFilter === "Food and Pharma" && (
              <>
                {indfap.map((product) => (
                  <figure className="figure"
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    {/* <figure className="figure"> */}
                      <img src={product.image} alt="" />
                      <figcaption>
                        <h3>{product.title}</h3>
                        <p>{truncateDescription(product.description, 100)}</p>
                      </figcaption>
                    {/* </figure> */}
                  </figure>
                ))}
              </>
            )}
            {/* Add similar conditional rendering for other filter options */}

            {activeFilter === "Oil & Gas, Heavy Engineering" && (
              <>
                {indogh.map((product) => (
                  <figure className="figure"
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    {/* <figure className="figure"> */}
                      <img src={product.image} alt="" />
                      <figcaption>
                        <h3>{product.title}</h3>
                        <p>{truncateDescription(product.description, 100)}</p>
                      </figcaption>
                    {/* </figure> */}
                  </figure>
                ))}
              </>
            )}
          </div>
        </section>
      )}

      {activeSection === "infrastructures" && (
        <section
          className="section-6 projsection"
          id="section-infrastructures"
          name="section-infrastructures"
        >
          <div className="heading">
            <h1>Infrastructures</h1>
          </div>
          <div className="infrastructureFilters">
            <div
              className={
                activeFilterInfrastructure === "Bridges, Flyovers and Aqueducts"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handlFilterChangeInfrasture("Bridges, Flyovers and Aqueducts")
              }
            >
              Bridges, Flyovers and Aqueducts
            </div>
            <div
              className={
                activeFilterInfrastructure === "Nuclear Structures"
                  ? "active"
                  : ""
              }
              onClick={() => handlFilterChangeInfrasture("Nuclear Structures")}
            >
              Nuclear Structures
            </div>
            <div
              className={
                activeFilterInfrastructure === "Water Supply & Sewage Treatment"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handlFilterChangeInfrasture("Water Supply & Sewage Treatment")
              }
            >
              Water Supply & Sewage Treatment
            </div>
            <div
              className={
                activeFilterInfrastructure ===
                "Mass Excavation & Geotechnical Projects"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handlFilterChangeInfrasture(
                  "Mass Excavation & Geotechnical Projects"
                )
              }
            >
              Mass Excavation & Geotechnical Projects
            </div>
          </div>
          <div className="row">
            {activeFilterInfrastructure ===
              "Bridges, Flyovers and Aqueducts" && (
              <>
                {infrabfa.map((product) => (
                  <figure className="figure"
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    {/* <figure className="figure"> */}
                      <img src={product.image} alt="" />
                      <figcaption>
                        <h3>{product.title}</h3>
                        <p>{truncateDescription(product.description, 100)}</p>
                      </figcaption>
                    {/* </figure> */}
                  </figure>
                ))}
              </>
            )}
            {/* Add similar conditional rendering blocks for other filter options */}
          </div>
        </section>
      )}

      {activeSection === "specialAssignments" && (
        <section
          class="section-6 projsection"
          id="section-specialAssignments"
          name="section-specialAssignments"
        >
          <div class="heading">
            <h1>Special Assignments</h1>
          </div>

          <div className="industrialfilters">
            <div
              className={activeFilter === "Customized Housing" ? "active" : ""}
              onClick={() =>
                handlFilterChangeSpecialAssignments("Customized Housing")
              }
            >
              Customized Housing
            </div>
            <div
              className={
                activeFilter === "Interior and Fitouts" ? "active" : ""
              }
              onClick={() =>
                handlFilterChangeSpecialAssignments("Interior and Fitouts")
              }
            >
              Interior and Fitouts
            </div>
            <div
              className={
                activeFilter === "Repair and Renovation" ? "active" : ""
              }
              onClick={() =>
                handlFilterChangeSpecialAssignments("Repair and Renovation")
              }
            >
              Repair and Renovation
            </div>
          </div>

          <div className="row">

            {activeFilterSpecialAssignments === "Interior and Fitouts" && (
              <>
                {saiao.map((product) => (
                  <figure className="figure"
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    {/* <figure className="figure"> */}
                      <img src={product.image} alt="" />
                      <figcaption>
                        <h3>{product.title}</h3>
                        <p>{truncateDescription(product.description, 100)}</p>
                      </figcaption>
                    {/* </figure> */}
                  </figure>
                ))}
              </>
            )}
          </div>
        </section>
      )}

      {activeSection === "multistored" && (
        <section
          class="section-6 projsection"
          id="section-multistored"
          name="section-multistored"
        >
          <div class="heading">
            <h1>Multistored Buildings</h1>
          </div>

          <div className="industrialfilters">
            <div
              className={
                activeFilter === "Cummercial Buildings" ? "active" : ""
              }
              onClick={() =>
                handlFilterChangeMultistoredBuilding("Cummercial Buildings")
              }
            >
              Cummercial Buildings
            </div>
            <div
              className={
                activeFilter === "Public Heritage Buildings" ? "active" : ""
              }
              onClick={() =>
                handlFilterChangeMultistoredBuilding(
                  "Public Heritage Buildings"
                )
              }
            >
              Public Heritage Buildings
            </div>
            <div
              className={
                activeFilter === "Residential Projects" ? "active" : ""
              }
              onClick={() =>
                handlFilterChangeMultistoredBuilding("Residential Projects")
              }
            >
              Residential Projects
            </div>
          </div>

          <div className="row">
            {activeFilterMultistoredBuilding === "Cummercial Buildings" && (
              <>
                {mbcb.map((product) => (
                  <figure className="figure"
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    {/* <figure className="figure"> */}
                      <img src={product.image} alt="" />
                      <figcaption>
                        <h3>{product.title}</h3>
                        <p>{truncateDescription(product.description, 100)}</p>
                      </figcaption>
                    {/* </figure> */}
                  </figure>
                ))}
              </>
            )}

            {activeFilterMultistoredBuilding ===
              "Public Heritage Buildings" && (
              <>
                {mbphb.map((product) => (
                  <figure className="figure"
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    {/* <figure className="figure"> */}
                      <img src={product.image} alt="" />
                      <figcaption>
                        <h3>{product.title}</h3>
                        <p>{truncateDescription(product.description, 100)}</p>
                      </figcaption>
                    {/* </figure> */}
                  </figure>
                ))}
              </>
            )}

            {activeFilterMultistoredBuilding === "Residential Projects" && (
              <>
                {mbrp.map((product) => (
                  <figure
                    className="figure"
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    <img src={product.image} alt="" />
                    <figcaption>
                      <h3>{product.title}</h3>
                      <p>{truncateDescription(product.description, 100)}</p>
                    </figcaption>
                  </figure>
                ))}
              </>
            )}
          </div>

         
        </section>
      )}
    </div>
  );
};

export default Projects;
