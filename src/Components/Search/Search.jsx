import React, { useState } from "react";
import Modal from "../Modals/Modal";

function Search({ setSearchResults }) {
  const [search, setSearch] = useState("");
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
    <div>
      <div className="search">
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
