import React, { useState } from "react";
import Modal from "../Modal/Modal";
import style from "./style.scss";

function Search() {

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const handleClick = (media) => {
    setSelectedMovie(media);
    setShowModal(true);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const API_KEY = process.env.REACT_APP_API_KEY;
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setSearchResults(json.results);
      });
  };

  return (
    <div className="search">
      <div className="search_bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter a movie or TV show title"
            value={search}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="search_results">
  {searchResults.map((searchResult) => (
    <div key={searchResult.id} className="final_results">
      <h3>{searchResult.title || searchResult.name}</h3>
      {searchResult.release_date && (
        <span>{searchResult.release_date.split("-")[0]}</span>
      )}
      <img
        src={`https://image.tmdb.org/t/p/w500/${searchResult.poster_path}`}
        alt={searchResult.title || searchResult.name}
        onClick={() => handleClick(searchResult)}
      />
      <p>
        <span>{searchResult.vote_average}/10 </span>
        <span>({searchResult.vote_count} reviews)</span>
      </p>
    </div>
  ))}
</div>

      {selectedMovie && selectedMovie.id && (
        <Modal
          media={selectedMovie}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default Search;
