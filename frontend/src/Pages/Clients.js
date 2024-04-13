import React from 'react'
import "./Clients.css"
import z1 from "../assets/images/clientsLogo/adityaBrilahindalco_logo.png"
import z2 from "../assets/images/clientsLogo/imagica_logo.jpg"
import z3 from "../assets/images/clientsLogo/Ajwani-Infra1_logo.jpg"
import z4 from "../assets/images/clientsLogo/anthena_logo.jpg"
import z5 from "../assets/images/clientsLogo/apurva_logo.jpg"
import z6 from "../assets/images/clientsLogo/aon_logo.png"
import z7 from "../assets/images/clientsLogo/asian-paints_logo.png"
import z8 from "../assets/images/clientsLogo/bharatPetroleum_logo.png"
import z9 from "../assets/images/clientsLogo/cidco_logo.jpg"
import z10 from "../assets/images/clientsLogo/citi_logo.png"



const Clients = () => {
  return (
    <div class="clientcontainer">

    <ul class="logogrid">
      <li class="logogrid__item">
        <img src={z1} class="logogrid__img" alt="Coca Cola" />
      </li>
      <li class="logogrid__item">
        <img src={z2} class="logogrid__img" alt="Coca Cola" />
      </li>
      <li class="logogrid__item">
        <img src={z3} class="logogrid__img" alt="Coca Cola" />
      </li>
      <li class="logogrid__item">
        <img src={z4} class="logogrid__img" alt="Coca Cola" />
      </li>
      
      <li class="logogrid__item">
        <img src={z5} class="logogrid__img" alt="Coca Cola" />
      </li>
      <li class="logogrid__item">
        <img src={z6} class="logogrid__img" alt="Coca Cola" />
      </li>
      <li class="logogrid__item">
        <img src={z7} class="logogrid__img" alt="Coca Cola" />
      </li>
      <li class="logogrid__item">
        <img src={z8} class="logogrid__img" alt="Coca Cola" />
      </li>

      <li class="logogrid__item">
        <img src={z9} class="logogrid__img" alt="Coca Cola" />
      </li>
      <li class="logogrid__item">
        <img src={z10} class="logogrid__img" alt="Coca Cola" />
      </li>

    

    
    </ul>
  
  </div>
  )
}

export default Clients