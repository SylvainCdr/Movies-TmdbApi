import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";

function Header() {
  const link1 = "https://www.themoviedb.org/";

  // Creation fonction menu Burger
  let isBurgerOpen = false;
  function burgerToggle() {
    const nav = document.querySelector(".header__nav");
    console.log(nav);
    nav.classList.toggle("active");
    isBurgerOpen = !isBurgerOpen;
  }

  // Fin fonction menu Burger

  return (
    <>
      <div className="header">
        <nav className="header__nav">
          <ul onClick={burgerToggle}>
            <li>
              <NavLink to="/">Movies</NavLink>
            </li>
            <li>
              <NavLink to="/tv">TV Series</NavLink>
            </li>
            <li>
              <NavLink to="/people">People</NavLink>
            </li>
            {/* <li>
              <NavLink to="/page4">Page4</NavLink>
            </li> */}
            <span>
              <a href={link1} target="_blank" rel="noopener noreferrer">
                <img
                  src="https://img.icons8.com/?size=48&id=AxHFXpfUuWsm&format=png"
                  alt="github"
                />
              </a>
            </span>
          </ul>
          <div className="header__burgerMenu" onClick={burgerToggle}></div>
        </nav>
      </div>
    </>
  );
}

export default Header;
