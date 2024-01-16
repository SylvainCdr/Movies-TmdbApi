import React, { useState, useEffect } from "react";
import style from "./style.scss";

function Modal({ movie, showModal, setShowModal }) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [movieById, setMovieById] = useState({});
  const img = 

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
    <div className="modal" onClick={handleClose}>
      {showModal && (
        <div className={style.movieModal}>
          <h1>{movieById.title}</h1>


          <img
  src={`https://image.tmdb.org/t/p/w500/${movieById.poster_path}`}
  alt={movieById.title}
/>
          <p>{movieById.release_date}</p>
          <p>{movieById.vote_average}</p>
          <p>{movieById.vote_count}</p>
          <p>{movieById.original_language}</p>
          <p>{movieById.original_title}</p>
          <p>{movieById.popularity}</p>
          <p>{movieById.adult}</p>
          <p>{movieById.backdrop_path}</p>
          <p>{movieById.genre_ids}</p>
          <p>{movieById.id}</p>
          <p>{movieById.video}</p>
         

          <p>{movieById.overview}</p>
          
         
        </div>
      )}
    </div >
  );
}

export default Modal;
