import React from "react";
import { useState } from "react";
import MovieModal from "../Modals/MovieModal";

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fonction pour gérer le clic sur une image de film
  const handleClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

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
    <div>
      {/* ------------------------------------------------------------------------------------ */}
      {/* DEBUT SEARCHBAR */}
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
        {/* FIN SEARCHBAR */}
        {/* ------------------------------------------------------------------------------------ */}
        {/* AFFICHAGE RESULTATS RECHERCHE EN MASQUANT LES DIV PAGE D ACCUEIL */}
        <div className="searchMovies">
          {searchResults.map((searchResult) => (
            <div key={searchResult.id} className="resultsMovies">
              <h3>{searchResult.title}</h3>
              <span>{searchResult.release_date.split("-")[0]}</span>
              <img
                src={`https://image.tmdb.org/t/p/w500/${searchResult.poster_path}`}
                alt={searchResult.title}
                onClick={() => handleClick(searchResult)}
              />
              {/* <p>{searchResult.overview.substring(0, 200)} ...</p> */}
              <p>
                <span>{searchResult.vote_average}/10 </span>
                <span>({searchResult.vote_count} reviews)</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* FIN AFFICHAGE RESULTATS RECHERCHE*/}
      {/* ------------------------------------------------------------------------------------ */}

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

export default Search;
