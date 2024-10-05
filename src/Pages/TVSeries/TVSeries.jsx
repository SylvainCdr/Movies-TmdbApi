import "./style.scss";
import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal/Modal";
import MovieCarousel from "../../Components/Carousel/Carousel";
import Search from "../../Components/Search/Search";

function TV() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [tvTopRated, setTvTopRated] = useState([]);
  const [tvPopular, setTvPopular] = useState([]);
  const [selectedTv, setSelectedTv] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const props = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1700,
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


  return (
    <div className="tvShows_container">
      <Search setSearchResults={setSearchResults} />

      <div className="carousels">
        <h2>TV Shows on the air</h2>

        <MovieCarousel {...props} />

        <h2>Top Rated TV Shows</h2>
      </div>

      <div className="tvTopRated">
        {tvTopRated.map((tv) => (
          <div key={tv.id} className="tvTopRated_card">
            <h3>{tv.name}</h3>
            <p className="date">{tv.first_air_date.split("-")[0]}</p>

            <img
              src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
              alt={tv.name}
              onClick={() => handleClick(tv)}
            />
            <p>
              <span>
                {tv.vote_average}/10 ({tv.vote_count} reviews)
              </span>
            </p>
          </div>
        ))}
      </div>

      <h2>Popular TV Shows</h2>
      <div className="tvPopular">
        {tvPopular.map((tv) => (
          <div key={tv.id} className="tvPopular_card">
            <h3>{tv.name}</h3>
            <p className="date">{tv.first_air_date.split("-")[0]}</p>

            <img
              src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
              alt={tv.name}
              onClick={() => handleClick(tv)}
            />
            <p>
              <span>
                {tv.vote_average}/10 ({tv.vote_count} reviews)
              </span>
            </p>
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
