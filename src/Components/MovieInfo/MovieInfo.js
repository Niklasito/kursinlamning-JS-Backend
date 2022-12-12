import React from 'react'
import Hero from '../Hero/Hero'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./MovieInfo.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import noimg from '../../img/noimg.jpg';


const MovieInfo = () => {

  const { id } = useParams()
  console.log(id);

  const [theMovieInfo, setTheMovieInfo] = useState({})
  const [loadingScreen, setLoadingScreen] = useState(true)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=8b782727b94e332aa6a436b96aa423e6&language=en-US`)
      .then(response => response.json())
      .then(data => {
        setTheMovieInfo(data)
        setLoadingScreen(false)
      })
  }, [id])

  function renderMovies() {
    if (loadingScreen) {
      return <Hero text='Loading..' />
    }
    if (theMovieInfo) {
      const imgPath = `https://image.tmdb.org/t/p/w500/${theMovieInfo.poster_path}`
      const backdropPath = `https://image.tmdb.org/t/p/original/${theMovieInfo.backdrop_path}`
      return (
        <>
          <Hero text={theMovieInfo.title} backdrop={backdropPath} className="renderMovieHero" />
          <div className="container my-5">
            <div className="row">
              <div className="col-md-3">
                <img src={theMovieInfo.poster_path === null ? noimg : imgPath} alt={theMovieInfo.title} className="img-fluid shadow rounded" />
              </div>
              <div className="col-md-9 showMovieMovieContainer">
                <h1 className='showMovieMovieTitle'>{theMovieInfo.title}</h1>
                <p className='showMovieMovieReleaseDate'>Release Date: {theMovieInfo.release_date}</p>
                <p className='showMovieMovieInfo'>{theMovieInfo.overview === "" ? "No description available" : theMovieInfo.overview}</p>
                <p className='showMovieMovieVoteAvg'><FontAwesomeIcon icon={faStar} id="homeIcon" />{theMovieInfo.vote_average}</p>


              </div>
            </div>
          </div>
        </>
      )
    }
  }

  return renderMovies()

}

export default MovieInfo