import React, { useState, useEffect } from "react";


// DEBUT COMPOSANT SLIDE

// AJOUTER PACKAGE REACT SLICK : npm install react-slick slick-carousel
// DOC : https://react-slick.neostack.com/docs/get-started

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Définit la fonction Carousel, qui représente un carrousel de films
// on récupère les props du composant Carousel

export default function Carousel(props) {
  // Etat pour stocker les films à venir
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);

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
              <img
                src={`${props.imgUrl}${movieToDisplay.poster_path}`}
                alt={movieToDisplay.title}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

// FIN FONCTION SLIDE
