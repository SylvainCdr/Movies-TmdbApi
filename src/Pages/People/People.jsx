// Importe React depuis la bibliothèque React + style.scss
import React from "react";
import "./style.scss";
import { useState, useEffect } from "react";


function People() {

    // Récupère la clé API à partir des variables d'environnement
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const API_KEY = process.env.REACT_APP_API_KEY;
        fetch(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setPeople(json.results);
            });
    }, []);

    return (
        <div className="container">
            <h2>Popular people</h2>
            <div className="popularPeople">
                {people.map((people) => (
                    <div key={people.id} className="popularPeople_card">
                        <h3>{people.name}</h3>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${people.profile_path}`}
                            alt={people.name}
                        />
                    </div>
                ))}
            </div>


           
        </div>
    );
}



// Exporte la fonction pour qu'elle puisse être utilisée ailleurs dans l'application
export default People;
