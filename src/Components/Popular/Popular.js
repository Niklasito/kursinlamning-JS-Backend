import React, { useState, useEffect } from "react";
import Carousel from "better-react-carousel";
import "./Popular.css";
import { Link } from "react-router-dom";

const url =
  "https://api.themoviedb.org/3/movie/popular?api_key=8b782727b94e332aa6a436b96aa423e6";

const useEffectFetchPopular = (props) => {
  const [popularMovies, setPopularMovies] = useState([]);

  const getMovies = async () => {
    const response = await fetch(url);
    const movies = await response.json();
    setPopularMovies(movies.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div className="popMovieCont">
        <div className="popMovieHeadingCont">
          <h2 className="popHeading">Popular movies</h2>
        </div>
        <div className="carouselCont">
          <Carousel cols={5} rows={1} gap={1} loop>
            {popularMovies.map((image) => {
              const { title, poster_path, id, overview } = image;
              return (
                <Carousel.Item key={id}>
                  <div>
                    <h6 className="movieTitles">{title}</h6>
                  </div>
                  <div className="posterDiv">
                    <Link to={`/movies/${id}`}
                      className="posterImg"
                      onClick={() => props.addToRecent(image)
                        //() =>
                        //   localStorage.setItem(id, JSON.stringify(image))
                      }
                    >
                      <img
                        width="200px"
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={id}
                        className="posterImage"
                      />
                    </Link>
                  </div>
                  <div className="btnDiv">
                    <Link to={`/movies/${id}`} className="btn btn-primary">Details</Link>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default useEffectFetchPopular;
