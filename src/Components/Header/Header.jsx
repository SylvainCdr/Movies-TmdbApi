import React, { useState } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // Import des icônes

function Header() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  // Fonction pour basculer l'état du menu burger
  function burgerToggle() {
    setIsBurgerOpen(!isBurgerOpen);
  }

  return (
    <div className="header">
      <nav className={`header__nav ${isBurgerOpen ? "active" : ""}`}>
        <NavLink to="/">
          <img
            src="assets/filmExplorerLogo.png"
            alt="website logo"
            className="logo"
          />
        </NavLink>
        <ul onClick={burgerToggle}>
          <li></li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/tv">TV Shows</NavLink>
          </li>
          <li>
            <NavLink to="/people">People</NavLink>
          </li>
        </ul>

        {/* Icône de menu burger */}
        <div className="header__burgerMenu" onClick={burgerToggle}>
          <FontAwesomeIcon icon={isBurgerOpen ? faTimes : faBars} />
        </div>
      </nav>
    </div>
  );
}

export default Header;
