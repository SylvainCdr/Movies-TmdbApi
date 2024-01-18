import "./style.scss";
import React, { useState, useEffect } from "react";
import MovieModal from "../../Components/Modals/MovieModal";
import MovieCarousel from "../../Components/Carousel/MovieCarousel";
import Search from "../../Components/Search/Search";

function Movies() {
  // Récupère la clé API à partir des variables d'environnement
  const API_KEY = process.env.REACT_APP_API_KEY;

  // DEBUT PARAMETRAGE DU CAROUSEL Upcoming Movies
  // Définit un objet props avec les propriétés que vous souhaitez passer à Carousel
  const props1 = {
    // dots: true, // Affiche les points de pagination
    infinite: true, // Permet de faire défiler le carrousel de manière infinie
    slidesToShow: 6, // Nombre de films à afficher à la fois
    slidesToScroll: 1, // Nombre de films à faire défiler à la fois
    autoplay: true, // Active le mode de lecture automatique
    autoplaySpeed: 2000, // Vitesse de transition entre les slides en mode autoplay (en millisecondes)
    apiUrl: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`, // URL de l'API TMDB pour les films à venir
    imgUrl: "https://image.tmdb.org/t/p/w500/", // URL de base pour les images des films
  };
  // FIN PARAMETRAGE DU CAROUSEL Upcoming Movies

  // DEBUT PARAMETRAGE DU CAROUSEL Top rated
  // Définit un objet props avec les propriétés que vous souhaitez passer à Carousel
  const props2 = {
    // dots: true, // Affiche les points de pagination
    infinite: true, // Permet de faire défiler le carrousel de manière infinie
    slidesToShow: 6, // Nombre de films à afficher à la fois
    slidesToScroll: 1, // Nombre de films à faire défiler à la fois
    autoplay: true, // Active le mode de lecture automatique
    autoplaySpeed: 2000, // Vitesse de transition entre les slides en mode autoplay (en millisecondes)
    apiUrl: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`, // URL de l'API TMDB pour les films à venir
    imgUrl: "https://image.tmdb.org/t/p/w500/", // URL de base pour les images des films
  };
  // FIN PARAMETRAGE DU CAROUSEL Top rated

  // État pour stocker les discoverMovies, les résultats Search, la valeur de la barre de Search,
  // le film sélectionné et l'état du modal
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
      
      <Search />
      {/* ------------------------------------------------------------------------------------ */}
      {/* DEBUT SEARCHBAR */}
      <div className="carousels">
        {/* DEBUT CAROUSEL Upcoming Movies*/}
        <div className="upcomingMovies_carousel">
          <h2>Upcoming movies</h2>
          {/* Rend le composant Carousel avec les propriétés définies dans props1 */}
          <MovieCarousel {...props1} />
        </div>
        {/* FIN CAROUSEL Upcoming Movies */}
        {/* ------------------------------------------------------------------------------------ */}
        {/* DEBUT CAROUSEL Top Rated Movies*/}
        <div className="topRatedMovies_carousel">
          <h2>Top rated </h2>
          {/* Rend le composant Carousel avec les propriétés définies dans props2 */}
          <MovieCarousel {...props2} />
        </div>
        {/* FIN CAROUSEL Top Rated Movies */}
        {/* ------------------------------------------------------------------------------------ */}
      </div>
      {/* DEBUT TRENDING NOW LIST */}
      <h2>Trendings now list</h2>
      {/* Liste des films à découvrir récupérés de l'API et elle est masquée si il y a des résultats de recherche*/}
      {searchResults.length === 0 && (
        <div className="discoverMovies">
          {discoverMovies.map((discoverMovie) => (
            <div key={discoverMovie.id} className="discoverMovie_card">
              <h2>{discoverMovie.title}</h2>
              <p className="date">{discoverMovie.release_date.split("-")[0]}</p>
              {/* Autres informations sur le film */}
              <img
                src={`https://image.tmdb.org/t/p/w500/${discoverMovie.poster_path}`}
                alt={discoverMovie.title}
                onClick={() => handleClick(discoverMovie)}
              />
              {/* <p>{discoverMovie.overview.substring(0, 200)} ...</p> */}
              <p>
                <span>
                  {discoverMovie.vote_average}/10 ({discoverMovie.vote_count}{" "}
                  reviews)
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
      {/* FIN TRENDING NOW LIST */}
      {/* ------------------------------------------------------------------------------------ */}
      {/* APPEL DU COMPOSANT MODAL POUR AFFICHER LES DETAILS DU FILM */}
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

export default Movies;
