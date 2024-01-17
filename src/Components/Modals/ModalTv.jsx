import React, { useState, useEffect } from "react";
import style from "./style.scss";

function ModalTv({ tv, showModal, setShowModal }) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [tvById, setTvById] = useState({});
  // Effet secondaire pour charger les objets films à découvrir au montage du composant
  useEffect(() => {
    if (showModal) {
      fetch(` https://api.themoviedb.org/3/tv/${tv.id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setTvById(json);
        });
    }
  }, [API_KEY, tv.id, showModal]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="containerModal" onClick={handleClose}>
      {showModal && (
        <div className="itemModal">
          <div className="itemModal_imgTitle">
           
           
              <img
                src={`https://image.tmdb.org/t/p/w500/${tvById.poster_path}`}
                alt={tvById.name}
              />
            
          </div>
          <div className="itemModal_details">
          <h3>{tvById.name}</h3>
          <h4>First air date :</h4> 
            <p>{tvById.first_air_date}</p>

            <h4>Genres</h4>{" "}
            <p>
              {tvById.genres?.map((genre) => genre.name).join(", ") || "N/A"}
            </p>
            <h4>Origin country :</h4>
            <p>{tvById.origin_country}</p>
            <h4>Synopsis </h4> <p>{tvById.overview}</p>
            {/* tableau incluant vote_average & vote_count */}
            <table>
              <th>Note</th>
              <th>Reviews</th>
              <tr>
                <td>{tvById.vote_average}/10</td>
                <td>{tvById.vote_count}</td>
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

export default ModalTv;
