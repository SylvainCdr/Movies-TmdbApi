import React, { useState, useEffect } from "react";
import style from "./style.scss";

function Modal({ movie, showModal, setShowModal }) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [movieById, setMovieById] = useState({});
  const img =
    // Effet secondaire pour charger les objets films à découvrir au montage du composant
    useEffect(() => {
      if (showModal) {
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`
        )
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            setMovieById(json);
          });
      }
    }, [API_KEY, movie.id, showModal]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="containerModal" onClick={handleClose}>
      {showModal && (
        <div className="movieModal">
          <div className="movieModal_img">
            <h1>{movieById.title}</h1>

            <img
              src={`https://image.tmdb.org/t/p/w500/${movieById.poster_path}`}
              alt={movieById.title}
            />
          </div>
          <div className="movieModal_details">
          <p>
  Genres: <br />
  {movieById.genres?.map((genre) => genre.name).join(", ") || "N/A"}
</p>

            <p>Release date : {movieById.release_date}</p>
            <p>
              Synopsis : <br />
              {movieById.overview}
            </p>
            <p>Rating : {movieById.vote_average}/10</p>
            <p>Reviews : {movieById.vote_count}</p>

            {/* <p>{movieById.video}</p> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
