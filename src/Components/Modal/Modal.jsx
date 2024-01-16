import React, { useState, useEffect } from "react";
import style from "./style.scss";

function Modal({ movie, showModal, setShowModal }) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [movieById, setMovieById] = useState({});

  // Effet secondaire pour charger les objets films à découvrir au montage du composant
  useEffect(() => {
    if (showModal) {
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`)
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
    <div>
      {showModal && (
        <div className={style.movieModal}>
          <h1>{movieById.title}</h1>
          <img src={movieById.poster_path} alt={movieById.title} />
          <p>{movieById.overview}</p>
          <button onClick={handleClose}>Close Modal</button>
        </div>
      )}
    </div>
  );
}

export default Modal;
