import "./style.scss";
import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modals/Modal";
import TvCarousel from "../../Components/Carousel/TvCarousel";
import Search from "../../Components/Search/Search";

function TV() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  
  const [tvOnTheAir, setTvOnTheAir] = useState([]);
  const [tvTopRated, setTvTopRated] = useState([]);
  const [tvPopular, setTvPopular] = useState([]);
  const [selectedTv, setSelectedTv] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const props = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    apiUrl: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`,
    imgUrl: "https://image.tmdb.org/t/p/w500/",
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTvTopRated(json.results);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTvPopular(json.results);
      });
  }, []);

  const handleClick = (tv) => {
    console.log(tv);
    setSelectedTv(tv);
    setShowModal(true);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setSearchResults(json.results);
      });
  };

  return (
    <div className="container">
      <Search setSearchResults={setSearchResults} />

      <div className="searchTv">
        {searchResults.map((searchResult) => (
          <div key={searchResult.id} className="resultsTv">
            <h3>{searchResult.name}</h3>
            <span>{searchResult.release_date.split("-")[0]}</span>
            <img
              src={`https://image.tmdb.org/t/p/w500/${searchResult.poster_path}`}
              alt={searchResult.title}
              onClick={() => handleClick(searchResult)}
            />
            <p>
              <span>{searchResult.vote_average}/10 </span>
              <span>({searchResult.vote_count} reviews)</span>
            </p>
          </div>
        ))}
      </div>

      <div className="carousels">
        <h2>TV Series on the air</h2>
        <div className="tvOnTheAir">
          <TvCarousel {...props} />
        </div>
      </div>

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
        <Modal
          media={selectedTv}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default TV;
