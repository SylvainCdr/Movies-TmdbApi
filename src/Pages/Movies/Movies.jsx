import "./style.scss";
import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal/Modal";
import MovieCarousel from "../../Components/Carousel/Carousel";
import Search from "../../Components/Search/Search";

function Movies() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const props1 = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    apiUrl: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
    imgUrl: "https://image.tmdb.org/t/p/w500/",
  };

  const props2 = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    apiUrl: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
    imgUrl: "https://image.tmdb.org/t/p/w500/",
  };

  useEffect(() => {
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

  const handleClick = (movie) => {
    console.log("Clicked on movie:", movie);
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleSearch = (event) => {
    event.preventDefault();
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

      <Search setSearchResults={setSearchResults} />


      <div className="carousels">
        <div className="upcomingMovies_carousel">
          <h2>Upcoming movies</h2>
          <MovieCarousel {...props1} />
        </div>
        <div className="topRatedMovies_carousel">
          <h2>Top rated </h2>
          <MovieCarousel {...props2} />
        </div>
      </div>

      <h2>Trendings now list</h2>
      {searchResults.length === 0 && (
        <div className="discoverMovies">
          {discoverMovies.map((discoverMovie) => (
            <div key={discoverMovie.id} className="discoverMovie_card">
              <h2>{discoverMovie.title}</h2>
              <p className="date">{discoverMovie.release_date.split("-")[0]}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500/${discoverMovie.poster_path}`}
                alt={discoverMovie.title}
                onClick={() => handleClick(discoverMovie)}
              />
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

      {selectedMovie && (
        <Modal
          media={selectedMovie}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default Movies;
