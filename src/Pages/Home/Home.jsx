import "./style.scss";
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Modal from "../../Components/Modal/Modal"; 

import Carousel from "../../Components/Carousel/Carousel";

function Movies() {
  // Récupère la clé API à partir des variables d'environnement
  const API_KEY = process.env.REACT_APP_API_KEY;

  // DEBUT PARAMETRAGE DU CAROUSEL
  // Définit un objet props avec les propriétés que vous souhaitez passer à Carousel
  const props = {
    // dots: true, // Affiche les points de pagination
     infinite: true, // Permet de faire défiler le carrousel de manière infinie
    slidesToShow: 4, // Nombre de films à afficher à la fois
    slidesToScroll: 1, // Nombre de films à faire défiler à la fois
    autoplay: true, // Active le mode de lecture automatique
    autoplaySpeed: 3000, // Vitesse de transition entre les slides en mode autoplay (en millisecondes)
    apiUrl: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`, // URL de l'API TMDB pour les films à venir
    imgUrl: "https://image.tmdb.org/t/p/w500/", // URL de base pour les images des films
  };
  // FIN PARAMETRAGE DU CAROUSEL

  // État pour stocker les discoverMovies, les résultats Search, la valeur de la barre de Search
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fonction pour gérer le clic sur une image de film
  const handleClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };
 


  // Effet secondaire pour charger les films à découvrir au montage du composant
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const time_window = "week";
    fetch(
      `https://api.themoviedb.org/3/trending/movie/${time_window}?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setDiscoverMovies(json.results);
      });
  }, []);

  // Fonction pour mettre à jour l'état de la barre de recherche lors de la saisie
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Fonction pour gérer la soumission du formulaire de recherche
  const handleSearch = (event) => {
    event.preventDefault();

    // Appel à l'API pour effectuer la recherche de films
    const API_KEY = process.env.REACT_APP_API_KEY;
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setSearchResults(json.results);
      });
  };

  return (
    <div className="container">
      <div className="hero">
        <h1>Film</h1> <br />
        <h2>Explorer</h2>
      </div>
      {/* Barre de recherche */}
      <div className="search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter a movie title"
            value={search}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
        {/* On affiche les résultats de la recherche en masquant la div discoverMovies */}
        <div className="searchMovies">
          {searchResults.map((searchResult) => (
            <div key={searchResult.id}>
              <h2>{searchResult.title}</h2>
              <p>{searchResult.release_date.split("-")[0]}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500/${searchResult.poster_path}`}
                alt={searchResult.title}
              />
              <p>{searchResult.overview.substring(0, 200)} ...</p>
              <p>
                <span>{searchResult.vote_average}</span>
                <span>{searchResult.vote_count}</span>
              </p>
            </div>
          ))}
        </div>
        </div>

        {/* DEBUT CAROUSEL */}
        <div className="upcomingMovies">
        
        <h2>Upcoming movies</h2>
        <div className="upcomingMovies_carousel">
          {/* Rend le composant Carousel avec les propriétés définies dans props */}
          <Carousel {...props} />
        </div>
        </div>
        {/* FIN CAROUSEL */}
      
        <h2>Trendings now</h2>
      {/* Liste des films à découvrir récupérés de l'API et elle est masquée si il y a des résultats de recherche*/}
{searchResults.length === 0 && (
  <div className="discoverMovies">
   {discoverMovies.map((discoverMovie) => (
  <div key={discoverMovie.id} className="discoverMovie_card">
    <h2>{discoverMovie.title}</h2>
    {/* Autres informations sur le film */}
    <img
      src={`https://image.tmdb.org/t/p/w500/${discoverMovie.poster_path}`}
      alt={discoverMovie.title}
      onClick={() => handleClick(discoverMovie)} 
    />
    <p>{discoverMovie.overview.substring(0, 200)} ...</p>
    <p>
      <span>
        {discoverMovie.vote_average}/10 ({discoverMovie.vote_count} reviews)
      </span>
    </p>
  </div>
))}
  </div>
)}

      {/* Modal pour afficher les détails du film */}
      {selectedMovie && selectedMovie.id && (
  <Modal
    movie={selectedMovie}
    showModal={showModal}
    setShowModal={setShowModal}
  />
)}

    </div>
  );
}

export default Movies;