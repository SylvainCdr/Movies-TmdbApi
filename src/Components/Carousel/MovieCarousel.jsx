import React, { useState, useEffect } from "react";
import style from "./style.scss";
import Modal from "../../Components/Modals/Modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MovieCarousel(props) {
  const [mediaToDisplay, setMediaToDisplay] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (media) => {
    console.log("Clicked on media:", media);
  
    if (media.title) {
      setSelectedMedia({
        id: media.id,
        title: media.title,
        overview: media.overview,
        release_date: media.release_date,
        poster_path: media.poster_path,
        vote_average: media.vote_average,
        vote_count: media.vote_count,
        media_type: "movie",
      });
    } else if (media.name) {
      setSelectedMedia({
        id: media.id,
        name: media.name,
        overview: media.overview,
        first_air_date: media.first_air_date,
        poster_path: media.poster_path,
        vote_average: media.vote_average,
        vote_count: media.vote_count,
        media_type: "tv",
      });
    }
  
    setShowModal(true);
  };

  useEffect(() => {
    fetch(`${props.apiUrl}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMediaToDisplay(json.results);
      });
  }, []);

  return (
    <div>
      {mediaToDisplay.length > 0 && (
        <Slider {...props}>
          {mediaToDisplay.map((media) => (
            <div key={media.id} className="upcomingMovie_carousel">
              <h3>{media.title}</h3>
              <img
                src={`${props.imgUrl}${media.poster_path}`}
                alt={media.title}
                onClick={() => handleClick(media)}
              />
            </div>
          ))}
        </Slider>
      )}

      {/* Modal pour afficher les détails du média */}
      {selectedMedia && (
        <Modal
          media={selectedMedia}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
