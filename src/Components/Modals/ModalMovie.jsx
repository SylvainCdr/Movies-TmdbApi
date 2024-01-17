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
        <div className="itemModal">
          <div className="itemModal_imgTitle">
            

            <img
              src={`https://image.tmdb.org/t/p/w500/${movieById.poster_path}`}
              alt={movieById.title}
            />
          
          </div>
          <div className="itemModal_details">
          <h3>{movieById.title}</h3>
            <h4>Release date </h4> 
            <p>{movieById.release_date}</p>
            
          
  <h4>Genres</h4> <p>
  {movieById.genres?.map((genre) => genre.name).join(", ") || "N/A"}
</p>

              <h4>Synopsis </h4> <p>
              {movieById.overview}
            </p>
            {/* tableau incluant vote_average & vote_count */}

        <table>
          <th>Note</th>
          <th>Reviews</th>
          <tr>
            <td>{movieById.vote_average}/10</td>
            <td>{movieById.vote_count}</td>
          </tr>
        </table>
{/* 
            <h4>Rating </h4><p>{movieById.vote_average}/10</p> 
            <h4>Reviews </h4> <p>{movieById.vote_count}</p> */}

            {/* <p>{movieById.video}</p> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
