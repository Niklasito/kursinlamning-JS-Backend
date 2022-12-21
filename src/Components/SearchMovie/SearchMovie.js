import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchMovie.css"
import { Link } from "react-router-dom";
import noimg from '../../img/noimg.jpg';

const hideSearchField = () => {
  let searchBarField = document.querySelector(".searchDiv");
  searchBarField.style.display = "none";
  let resultDiv = document.querySelector(".resultDiv");
  resultDiv.style.display = "none";
};

const SearchMovie = ({ props, results, addToRecent }) => {

  const foundMovies = results.map((obj,) => {

    const movieDetails = `/movies/${obj.id}`
    const poster_path = `https://image.tmdb.org/t/p/w500${obj.poster_path}`
    return (
      <Link to={movieDetails} key={obj.id} className="searchDiv col-12" onClick={() => { addToRecent(obj); hideSearchField(); }}>
        <div className="imgBox" onClick={() => props.addToRecent(obj)} >
          <img key={obj.id} src={obj.poster_path === null ? noimg : poster_path} alt={obj.title} className="poster" />
        </div>
        <div className="titleBox">
          <h6 key={obj.id} className="movieTitle">{obj.title}</h6>
          <p key={obj.id} className="voteAvg"><FontAwesomeIcon icon={faStar} />  {obj.vote_average}</p>
        </div>
      </Link>
    )
  })

  return (
    <>
      {foundMovies}
    </>
  )
}

export default SearchMovie;