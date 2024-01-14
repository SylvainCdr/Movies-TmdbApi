import "./style.scss";
import React, { useState, useEffect } from "react";

function Movies() {
  // État pour stocker les films à découvrir
  const [discoverMovies, setDiscoverMovies] = useState([]);

  // État pour stocker les résultats de recherche
  const [searchResults, setSearchResults] = useState([]);

  // État pour stocker la valeur de la barre de recherche
  const [search, setSearch] = useState("");

  // Effet secondaire pour charger les films à découvrir au montage du composant
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
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
      < div className="hero">
      <h1>FilmExplorer</h1>
      </div>


      {/* Barre de recherche */}

      <div className="search">
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Saisissez un titre de film"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit">Rechercher</button>
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
      {/* Liste des films à découvrir récupérés de l'API et elle est masquée si il y a des résultats de recherche*/}
      {searchResults.length === 0 && (
        <div className="discoverMovies">
          {discoverMovies.map((discoverMovie) => (
            <div key={discoverMovie.id} className="discoverMovie_card">
              <h2>{discoverMovie.title}</h2>
              <span>{discoverMovie.release_date.split("-")[0]}</span>
              <img
                src={`https://image.tmdb.org/t/p/w500/${discoverMovie.poster_path}`}
                alt={discoverMovie.title}
              />
              <p>{discoverMovie.overview.substring(0, 200)} ...</p>
              <p>
                <span>{discoverMovie.vote_average}/10 ({discoverMovie.vote_count} reviews)</span>{" "}
                
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;
