import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ searchingText, setSearchingText }) {



  const updateSearchingText = (e) => {
    setSearchingText(e.target.value)

  }


  return (
    <header>
      <nav>
        <div className="Headerbox">
          <div className="navHeading">
            <Link to="/">
              <FontAwesomeIcon icon={faHome} id="homeIcon" />
            </Link>
            <Link to="/">
              <h1>Filmoteket</h1>
            </Link>
          </div>
          <div className="searchBarCont">
            <input
              type="text"
              className="searchBar"
              placeholder="Search Filmoteket"
              aria-label="Search Filmoteket"
              value={searchingText}
              onChange={updateSearchingText}
            ></input>
            <FontAwesomeIcon icon={faSearch} id="searchIcon" />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
