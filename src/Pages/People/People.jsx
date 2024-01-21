// Importe React depuis la bibliothèque React + style.scss
import React from "react";
import "./style.scss";
import { useState, useEffect } from "react";
import Carousel from "../../Components/Carousel/Carousel";


function People() {

    const API_KEY = process.env.REACT_APP_API_KEY;
    // Récupère la clé API à partir des variables d'environnement
    const [TrendingPeople, setTrendingPeople] = useState([]);

    const props = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1600,
        apiUrl: `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`,
        imgUrl: "https://image.tmdb.org/t/p/w500/",
    };



    useEffect(() => {
       
        const time_window = "week";
        fetch(`https://api.themoviedb.org/3/trending/person/${time_window}?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setTrendingPeople(json.results);
            });
    }, []);

    return (
        <div className="container">



            <h2>Popular people</h2>
            <Carousel {...props} />
            <h2>Trending people</h2>
            <div className="popularPeople">
                {TrendingPeople.map((TrendingPeople) => (
                    <div key={TrendingPeople.id} className="popularPeople_card">
                        <h3>{TrendingPeople.name}</h3>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${TrendingPeople.profile_path}`}
                            alt={TrendingPeople.name}
                        />
                    </div>
                ))}
            </div>


           
        </div>
    );
}



// Exporte la fonction pour qu'elle puisse être utilisée ailleurs dans l'application
export default People;
