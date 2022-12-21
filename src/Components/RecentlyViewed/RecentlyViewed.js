import React from "react";
import { Link } from "react-router-dom";
import "./RecentlyViewed.css"
import noimg from '../../img/noimg.jpg';

const RecentlyViewedRender = (props) => {
  return (
    <>
      {props.recentlyViewed.map((movie) => {
        const { id, poster_path, title } = movie;
        const imageURL = `https://image.tmdb.org/t/p/w500${poster_path}`;
        return (

          <div className="col-lg-2 col-md-3 col-sm-6 recentContentDiv" key={id}>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/movies/${id}`}
            >
              <div className="recentPosterDiv">
                <img
                  width="100%"
                  height={"275px"}
                  src={poster_path === null ? noimg : imageURL}
                  alt={title}
                  className="img-gallery"
                />
              </div>
              <div className="recentHeadingCont">
                <h6 className="recentMovieTitles">{title}</h6>
              </div>
            </Link>
            <div className="d-flex justify-content-center py-2 flex-column text-center">

            </div>
          </div>
        );
      })}
    </>
  )
}

export default RecentlyViewedRender;