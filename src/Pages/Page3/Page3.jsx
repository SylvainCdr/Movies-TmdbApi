// Importe React depuis la bibliothèque React + style.scss
import React from "react";
import "./style.scss";

// Importe le composant Carousel depuis le chemin spécifié
import Carousel from "../../Components/Carousel/Carousel";



function Page3() {

    // Récupère la clé API à partir des variables d'environnement
    const API_KEY = process.env.REACT_APP_API_KEY;

    // Définit un objet props avec les propriétés que vous souhaitez passer à Carousel
    const props = {
        dots: true, // Affiche les points de pagination
        infinite: true, // Permet de faire défiler le carrousel de manière infinie
        slidesToShow: 3, // Nombre de films à afficher à la fois
        slidesToScroll: 1, // Nombre de films à faire défiler à la fois
        autoplay: true, // Active le mode de lecture automatique
        autoplaySpeed: 2000, // Vitesse de transition entre les slides en mode autoplay (en millisecondes)
        apiUrl: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`, // URL de l'API TMDB pour les films à venir
        imgUrl : "https://image.tmdb.org/t/p/w500/" // URL de base pour les images des films
    };

 
    return (
        <div className="container">
            <h1>Page3</h1>
            {/* Rend le composant Carousel avec les propriétés définies dans props */}
            <Carousel {...props}  />
        </div>
    );
}

// Exporte la fonction pour qu'elle puisse être utilisée ailleurs dans l'application
export default Page3;
