import React, { useState, useEffect } from "react";
import style from "./style.scss";
import ModalTv from "../../Components/Modals/ModalTv";


// DEBUT COMPOSANT SLIDE

// AJOUTER PACKAGE REACT SLICK : npm install react-slick slick-carousel
// DOC : https://react-slick.neostack.com/docs/get-started

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Définit la fonction Carousel, qui représente un carrousel de films
// on récupère les props du composant Carousel

export default function TvCarousel(props) {
  // Etat pour stocker les films à venir
  const [tvToDisplay, setTvToDisplay] = useState([]);
  const [selectedTv, setSelectedTv] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fonction pour gérer le clic sur une image de film
  const handleClick = (tv) => {
    console.log("Clicked on movie:", tv);
    setSelectedTv(tv);
    setShowModal(true);
  };

  // Effet secondaire pour charger les films à venir au montage du composant
  // on récupère les props du composant Carousel
  useEffect(() => {
    fetch(`${props.apiUrl}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTvToDisplay(json.results);
      });
  }, []);

  // Définit un objet props avec les propriétés que vous souhaitez passer à Carousel
  return (
    <div>
      {tvToDisplay.length > 0 && (
        <Slider {...props}>
          {tvToDisplay.map((tvToDisplay) => (
            <div key={tvToDisplay.id} className="upcomingMovie_carousel">
              <h3>{tvToDisplay.title}</h3>
              <img
                src={`${props.imgUrl}${tvToDisplay.poster_path}`}
                alt={tvToDisplay.title}
                onClick={() => handleClick(tvToDisplay)}
              />
            </div>
          ))}
        </Slider>
      )}

      Modal pour afficher les détails du film
      {selectedTv && selectedTv.id && (
        <ModalTv
          tv={selectedTv}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

// FIN FONCTION SLIDE
