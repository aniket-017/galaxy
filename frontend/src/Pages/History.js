import React, { useEffect } from "react";
import "./History.css";

const History = () => {
  useEffect(() => {
    // define variables
    const items = document.querySelectorAll(".timeline li");

    // check if an element is in viewport
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }

    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);

    // cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("load", callbackFunc);
      window.removeEventListener("resize", callbackFunc);
      window.removeEventListener("scroll", callbackFunc);
    };
  }, []);
  return (
    <div>
      <section class="intro">
        <div class="hiscontainer">
          <h1 className="hishead">Our History &darr;</h1>
          <div class="hisinfo">
            <p>
              Progressive Construction Co (PCC) was formed in the year 1976, by two engineers Mr. C. M. Abhang and Mr.V.
              D. Trivedi. Prior to forming the company, both were associate engineers of L&T. Driven by the
              entrepreneurial passion and the combined talents across various domains the company started with humble
              beginnings.
            </p>
            <p>
              With a vision to create a world-class construction and real estate development company with the highest
              standards of professionalism, ethics and customer service, Progressive Civil Construction Company soon
              earned a reputation for its high quality work and speedy construction. The company very soon ventured into
              building constructions, industrial construction and bridges. The versatile and complex nature of these
              projects, though challenging were integral to the part of the overall growth of the company. This
              diversification has helped in evolving Progressive Civil Construction Company into a leading civil
              construction and infrastructure development company in India.
            </p>
            <p>
              The company has completed over 250 major projects within Maharashtra and other states of India. Our
              clients include leading private companies such as Siemens ,Larsen and Toubro, Asian Paints, Johnson and
              Johnson, Hindustan DorrOliver, Godrej, etc. We have also executed projects for various government
              departments such as PWD (Public Works Department, Maharastra), IRCON (Indian Railways Construction), MJP
              (Maharashtra Jeevan Pradhikaran), BARC (Bhabha Atomic Research Centre), MTP, etc. Our client list includes
              some of the biggest names in both the private and public sectors.
            </p>
          </div>
        </div>
      </section>

      <section class="timeline">
        <ul>
          <li>
            <div>
              <time>2015</time> Completed two major residential towers G+9 each for Narayan Aura, Vadodara.
            </div>
          </li>
          <li>
            <div>
              <time>2014</time> Executed warehouse facility for Kelloggs India Pvt. Ltd. at Taloja, used lazer tremix
              machines for better finish.
            </div>
          </li>
          <li>
            <div>
              <time>2013</time> Executed major civil, structural & infrastructural facility for L & T, Heavy Engineering
              Division at Pune.
            </div>
          </li>
          <li>
            <div>
              <time>2012</time> Construction of two lane high level bridge at Panvel for PWD.
            </div>
          </li>
          <li>
            <div>
              <time>2011</time>Cobalt 66 Radiation Unit in Vashi. Executed first irradiation plant for Agriculture Dept.
              of Maharashtra, which is at forefront in adopting new technologies.
            </div>
          </li>
          <li>
            <div>
              <time>2010</time> Civil and structural work (ISBL) for Propane / LPG Storage and handling facilities at
              Uran LPG plant. Achieved milestone for single largest continuous concrete pour in BPCL of 750 Cum in
              record of 15 hrs.
            </div>
          </li>
          <li>
            <div>
              <time>2009</time> Construction of major and minor bridges on Aurangabad-Jalna Road spanning 80 KMS and
              total 45 structures.
            </div>
          </li>
          <li>
            <div>
              <time>2008</time>Repeat order from Asian Paints for construction of R & D Centre at Navi Mumbai. This
              project was completed much before completion date and hence, received the bonus award.
            </div>
          </li>
          <li>
            <div>
              <time>2007</time> Construction of complete facility for Industrial paints plant for Asian Paints at
              Taloja, Tal. Panvel, Dist. Raigad
            </div>
          </li>
          <li>
            <div>
              <time>2006</time> Completes the 250 project on completion of Asian Paints – Industrial paints
              manufacturing unit from start to finish. The company also completes ‘three decades’ – in the construction
              industry. Construction of factory complex at KIADB Industrial Area, Bangalore for Microtrol Sterilization
              Services Pvt. Ltd. Received award from the Chairman of BARC for execution of India’s first private
              radioactive venture for Cobol 66 Radiation Unit at Bangalore.
            </div>
          </li>
          <li>
            <div>
              <time>2005</time> Company lands in Bangalore – its first out of state project - Godrej factory building
              and Cobalt 66 Radiation unit. Construction of approaches to R.O.B. and service road joining East and West
              of Kulgaon-Badlapur, Tal. Ambernath, Dist. Thane.
            </div>
          </li>
          <li>
            <div>
              <time>2004</time> Carpark gets popular in India. One of the first ‘only cars’ Car Park tower is
              constructed in India by the company with German design for multinational client – Siemens. Construction of
              Bharat Ratna Dr. Babasaheb Ambedkar National Memorial at Mahad, Dist. Raigad. It includes auditorium,
              museum, swimming pool, library etc.
            </div>
          </li>
          <li>
            <div>
              <time>2003</time> Renovation and extension of rural hospital at Georai, Dist. Beed. This is the project of
              Maharashtra Health System Development, Mumbai.
            </div>
          </li>
          <li>
            <div>
              <time>2002</time> Construction of major bridge on Mumbai-Agra Road NH-3 having sandy Kumbheri river with
              stagnant subsoil water.
            </div>
          </li>
          <li>
            <div>
              <time>2001</time> Construction of bridge on Ahmedabad Mumbai Highway NH-8 for Executive Engineer, National
              Highway Division-III, Thane.
            </div>
          </li>
          <li>
            <div>
              <time>2000</time>Company being awarded the fast track project award for construction of Desai Creek Bridge
              completion of the project in record time of 86 days. This is still a record project for creek bridge in
              Maharashtra.
            </div>
          </li>
          <li>
            <div>
              <time>1999</time> The company gets awarded the ‘first’ prize at National level by Indian Institute of
              Bridge engineers for construction of Savitri bridge at Mahad on Mumbai- Goa road.
            </div>
          </li>
          <li>
            <div>
              <time>1997</time> The company gets its first projects in the public works department after being
              registered. Thereafter the company has executed more 3 dozen bridges in various districts of Maharashtra
            </div>
          </li>
          <li>
            <div>
              <time>1992</time> Awarded the bridge portion of the 3 km stretch of the Konkan Railway project – the first
              major project initiated by the government in one of the most difficult terrain in Maharashtra.
            </div>
          </li>
          <li>
            <div>
              <time>1989</time>Company gets the project for the construction of the podium work at Prabhadevi, Mumbai.
              The client being happy on the speed and quality awarded the G+23 storied building project. This is the
              highest project constructed by the company till date.
            </div>
          </li>
          <li>
            <div>
              <time>1988</time> Company becomes a private limited company.
            </div>
          </li>
          <li>
            <div>
              <time>1986</time> Company initiates its first ever real estate venture at Airoli. The company does huge
              progress in the real estate venture doing various project in the Navi Mumbai region.
            </div>
          </li>
          <li>
            <div>
              <time>1982</time> Starts operations in Navi Mumbai area. Received projects from the ‘Tata’ scientist and
              officers housing project and various projects in CIDCO.
            </div>
          </li>
          <li>
            <div>
              <time>1976</time> Company was established and started its construction operations with its first work
              “Construction of bridge on nalla in RCF” in Trombay, Mumbai.
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default History;
