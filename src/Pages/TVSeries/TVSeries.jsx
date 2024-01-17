import "./style.scss";
import React, { useState, useEffect } from "react";
import ModalTv from "../../Components/Modals/ModalTv";
import TvCarousel from "../../Components/Carousel/TvCarousel";

function TV() {

  const API_KEY = process.env.REACT_APP_API_KEY;
  const [tvOnTheAir, setTvOnTheAir] = useState([]);
  const [tvTopRated, setTvTopRated] = useState([]);
  const [tvPopular, setTvPopular] = useState([]);

  // DEBUT PARAMETRAGE DU CAROUSEL Tv On The Air
  // Définit un objet props avec les propriétés que vous souhaitez passer à Carousel
  const props = {
    // dots: true, // Affiche les points de pagination
    infinite: true, // Permet de faire défiler le carrousel de manière infinie
    slidesToShow: 6, // Nombre de films à afficher à la fois
    slidesToScroll: 1, // Nombre de films à faire défiler à la fois
    autoplay: true, // Active le mode de lecture automatique
    autoplaySpeed: 2000, // Vitesse de transition entre les slides en mode autoplay (en millisecondes)
    apiUrl: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`, // URL de l'API TMDB pour les films à venir
    imgUrl: "https://image.tmdb.org/t/p/w500/", // URL de base pour les images des films
  };
  // FIN PARAMETRAGE DU CAROUSEL Tv On The Air


  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTvTopRated(json.results);
      });
  }, []);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTvPopular(json.results);
      });
  }, []);

  const [selectedTv, setSelectedTv] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fonction pour gérer le clic sur une image de la série
  const handleClick = (tv) => {
    console.log(tv);
    setSelectedTv(tv);
    setShowModal(true);
  };

  return (
    <div className="container">
    

      <div className="carousels">
        {/* DEBUT CAROUSEL Upcoming Movies*/}
          <h2>TV Series on the air</h2>
        <div className="tvOnTheAir" >
          {/* Rend le composant Carousel avec les propriétés définies dans props1 */}
          <TvCarousel {...props} />
        </div >
        </div>
        {/* FIN CAROUSEL Upcoming Movies */}
        {/* ------------------------------------------------------------------------------------ */}
  
    

      <h2>Top Rated TV Series</h2>
      <div className="tvTopRated">
        {tvTopRated.map((tv) => (
          <div key={tv.id} className="tvTopRated_card">
            <h3>{tv.name}</h3>
            <img
              src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
              alt={tv.name}
              onClick={() => handleClick(tv)}
            />
          </div>
        ))}
      </div>

      <h2>Popular TV Series</h2>
      <div className="tvPopular">
        {tvPopular.map((tv) => (
          <div key={tv.id} className="tvPopular_card">
            <h3>{tv.name}</h3>
            <img
              src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
              alt={tv.name}
              onClick={() => handleClick(tv)}
            />
          </div>
        ))}
      </div>

      {selectedTv && (
        <ModalTv
          tv={selectedTv}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

    </div>
  );
}

export default TV;
