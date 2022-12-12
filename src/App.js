import Navbar from "./Components/Navbar/Navbar";
import React from "react";
import Popular from "./Components/Popular/Popular";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchMovie from "./Components/SearchMovie/SearchMovie";
import { useState, useEffect } from "react";
import "./App.css"
import MovieInfo from "./Components/MovieInfo/MovieInfo"
import RecentlyViewedRender from "./Components/RecentlyViewed/RecentlyViewed";

function App() {
  const [findMovies, setFindMovies] = useState([]);
  const [searchingText, setSearchingText] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    if (searchingText) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=8b782727b94e332aa6a436b96aa423e6&language=en-US&query=${searchingText}&page=1&include_adult=false`
      )
        .then((response) => response.json())
        .then((data) => {
          setFindMovies(data.results)
        })
    }

  }, [searchingText]);

  useEffect((items) => {
    const recentMovies = [
      ...new Set(
        JSON.parse(localStorage.getItem("seen-recently"))
      )
    ];

    if (recentMovies) {
      setRecentlyViewed([...new Set(recentMovies.slice(0, 5))])
    }
  }, []);

  const addToLocalStorage = (items) => {
    localStorage.setItem("seen-recently", JSON.stringify(items));
  };



  const addToRecent = (image) => {
    recentlyViewed.forEach((item) => {
      let index = recentlyViewed.indexOf(item);
      if (item.id === image.id) {
        recentlyViewed.splice(index, 1);
      }

    });
    const recentlyViewedList = [image, ...recentlyViewed];
    setRecentlyViewed([...new Set(recentlyViewedList)].slice(0, 5));
    addToLocalStorage(recentlyViewedList);
  };

  return (
    <>
      <Router>
        <Navbar searchingText={searchingText} setSearchingText={setSearchingText} addToRecent={addToRecent} />
        <div className="container-fluid searchBarHolder">
          <div className="row rowHolder">
            <SearchMovie keyword={searchingText} results={findMovies} addToRecent={addToRecent} />
          </div>
        </div>

        <Routes>
          <Route path="/movies/:id" element={<MovieInfo keyword={searchingText} results={findMovies} />} />
          <Route path="/" element={<Popular addToRecent={addToRecent} />} />
          <Route path="/" element={<RecentlyViewedRender recentlyViewed={recentlyViewed} addToRecent={addToRecent} />} />
        </Routes>
        <div className="container recentCont">
          <h2 className="recentHeading">Recently Viewed</h2>
          <div className="row recentRow">
            <RecentlyViewedRender recentlyViewed={recentlyViewed} addToRecent={addToRecent} />
          </div>
        </div>

      </Router>
    </>
  );
}



export default App;
