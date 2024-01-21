import "./style.scss";
import React, { useState, useEffect } from "react";
import Search from "../../Components/Search/Search";
import Modal from "../../Components/Modal/Modal";
import { Link } from "react-router-dom";

function Homepage() {
  const [movies, setMovies] = useState([]);
  const [movieTrailers, setMovieTrailers] = useState([]);
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const time_window = "day";
    fetch(
      `https://api.themoviedb.org/3/trending/movie/${time_window}?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results.slice(0, 20));
      });
  }, [API_KEY]);

  useEffect(() => {
    Promise.all(
      movies.map((movie) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            const officialTrailer = data.results.find(
              (video) =>
                video.type === "Trailer" &&
                video.official &&
                video.site === "YouTube"
            );
            return officialTrailer;
          })
      )
    )
      .then((trailers) => {
        const filteredTrailers = trailers.filter((trailer) => trailer);
        setMovieTrailers(filteredTrailers);
      })
      .catch((error) => console.error("Error fetching trailers:", error));
  }, [movies, API_KEY]);

  const handleNext = () => {
    setCurrentTrailerIndex(
      (prevIndex) => (prevIndex + 1) % movieTrailers.length
    );
  };

  const handlePrevious = () => {
    setCurrentTrailerIndex((prevIndex) =>
      prevIndex === 0 ? movieTrailers.length - 1 : prevIndex - 1
    );
  };

  const handleClick = (media) => {
    console.log("Clicked on movie:", media);
    setSelectedMovie(media);
    setShowModal(true);
  };

  // Update the selected movie and modal state when search results change
  useEffect(() => {
    setSelectedMovie(null);
    setShowModal(false);
  }, [searchResults]);

  return (
    <div className="home_container">
      <div className="hero">
        <h1>Film Explorer</h1>
      </div>
      <h2>Explore the Latest Blockbusters on our Movie Hub !</h2>
      <Search setSearchResults={setSearchResults} />

      <h3>Trending trailers</h3>

      {movieTrailers.length > 0 && (
        <div className="trailers">
          <button onClick={handlePrevious}>
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <iframe
            src={`https://www.youtube.com/embed/${movieTrailers[currentTrailerIndex].key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>

          <button onClick={handleNext}>
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}
      <h3>Categories</h3>
      <div className="section3">
        <div className="categories">
          <div className="categories_movies" >
          <Link to="/movies" className="categories_movies">
            <h5>Movies</h5>
            <img
              src="https://www.dailylocal.com/wp-content/uploads/2023/07/Summer_Movies-Guide_84837.jpg?w=394"
              alt="logo"
            /> </Link>
          </div>
          <div className="categories_tv">
          <Link to="/tv" className="categories_tv">
            <h5>TV Shows</h5>
            <img
              src="https://dims.apnews.com/dims4/default/a57c19c/2147483647/strip/true/crop/3000x2250+0+0/resize/599x449!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fb8%2Fb2%2F1b55d9aab1e903c8d13365507abe%2F20e0b997b0004dfe8e27b3184f6087a8"
              alt="logo"
            />
            </Link>
          </div>
          <div className="categories_people">
          <Link to="/people" className="categories_people">
            <h5>People</h5>
            <img
              src="https://images.squarespace-cdn.com/content/v1/5efb7a015dc2ac0077a81ea5/c7f09d02-25b9-4181-aa61-41a3481d47f9/actors-brad-collage-cruise-wallpaper-preview.jpeg"
              alt="logo"
            />
            </Link>
          </div>
    
        </div>
      </div>

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

export default Homepage;
