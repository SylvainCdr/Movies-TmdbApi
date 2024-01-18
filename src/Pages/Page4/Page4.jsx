import "./style.scss";
import React, { useState, useEffect } from "react";

function Page4() {

    
    // https://api.themoviedb.org/3/movie/{movie_id}/videos
    
    const [video, setVideo] = useState([]);
    
    useEffect(() => {
        const API_KEY = process.env.REACT_APP_API_KEY;
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setVideo(json.results);
            });
    }, []);




    return (
        <div className="container">
        <h1>Trailers</h1>

        {/* // on boucle sur les films a décourir et on affiche le trailer de chaque film que l'on va chercher sur youtube */}
        {video.map((movie) => {
            return (
                <div className="video">
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${movie.key}`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </div>
            );
        })}

 
      

  
    </div>
    );
}


export default Page4;