import React, { useState, useEffect } from "react";
import style from "./style.scss";
import MovieModal from "../Modals/MovieModal";

// DEBUT COMPOSANT SLIDE

// AJOUTER PACKAGE REACT SLICK : npm install react-slick slick-carousel
// DOC : https://react-slick.neostack.com/docs/get-started

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Définit la fonction Carousel, qui représente un carrousel de films
// on récupère les props du composant Carousel

export default function MovieCarousel(props) {
  // Etat pour stocker les films à venir
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fonction pour gérer le clic sur une image de film
  const handleClick = (movie) => {
    console.log("Clicked on movie:", movie);
    setSelectedMovie(movie);
    setShowModal(true);
  };

  // Effet secondaire pour charger les films à venir au montage du composant
  // on récupère les props du composant Carousel
  useEffect(() => {
    fetch(`${props.apiUrl}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMoviesToDisplay(json.results);
      });
  }, []);

  // Définit un objet props avec les propriétés que vous souhaitez passer à Carousel
  return (
    <div>
      {moviesToDisplay.length > 0 && (
        <Slider {...props}>
          {moviesToDisplay.map((movieToDisplay) => (
            <div key={movieToDisplay.id} className="upcomingMovie_carousel">
              <h3>{movieToDisplay.title}</h3>
              <img
                src={`${props.imgUrl}${movieToDisplay.poster_path}`}
                alt={movieToDisplay.title}
                onClick={() => handleClick(movieToDisplay)}
              />
            </div>
          ))}
        </Slider>
      )}

      {/* Modal pour afficher les détails du film */}
      {selectedMovie && selectedMovie.id && (
        <MovieModal
          movie={selectedMovie}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

// FIN FONCTION SLIDE
