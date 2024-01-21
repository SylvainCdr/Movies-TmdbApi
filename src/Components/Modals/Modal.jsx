import React, { useState, useEffect } from "react";
import style from "./style.scss";

function Modal  ({ media, showModal, setShowModal }) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [mediaDetails, setMediaDetails] = useState({});

  useEffect(() => {
    if (showModal && media.id) {
      const fetchUrl =
        media.media_type === "movie"
          ? `https://api.themoviedb.org/3/movie/${media.id}?api_key=${API_KEY}`
          : `https://api.themoviedb.org/3/tv/${media.id}?api_key=${API_KEY}`;

      fetch(fetchUrl)
        .then((res) => res.json())
        .then((json) => {
          setMediaDetails(json);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [API_KEY, media, showModal]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="container_modal" onClick={handleClose}>
          <div className="modal">
            <div className="itemModal">
              <div className="itemModal_imgTitle">
                {mediaDetails.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${mediaDetails.poster_path}`}
                    alt={mediaDetails.title || mediaDetails.name}
                  />
                )}
              </div>
              <div className="itemModal_details">
                <h3>{mediaDetails.title || mediaDetails.name}</h3>
                <h4>
                  {media.media_type === "movie"
                    ? "Release date"
                    : "First air date"}:
                </h4>
                <p>
                  {media.media_type === "movie"
                    ? mediaDetails.release_date
                    : mediaDetails.first_air_date}
                </p>
                <h4>Genres</h4>{" "}
                <p>
                  {mediaDetails.genres
                    ? mediaDetails.genres.map((genre) => genre.name).join(", ")
                    : "N/A"}
                </p>
                {media.media_type === "tv" && (
                  <>
                    <h4>Origin country :</h4>
                    <p>{mediaDetails.origin_country || "N/A"}</p>
                  </>
                )}
                <h4>Synopsis </h4> <p>{mediaDetails.overview}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Note</th>
                      <th>Reviews</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{mediaDetails.vote_average}/10</td>
                      <td>{mediaDetails.vote_count}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;