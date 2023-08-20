import React, { useState, useEffect } from "react";
import axios from "axios";
import "./movies.css";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const OMDB_API_KEY = "a8db3e33"; // Your OMDB API key
  const DEFAULT_MOVIES = [
    {
      Title: "Ant-Man and The Wasp: Quantumania",
      Year: "2023",
      Poster:
        "https://cdn.marvel.com/content/1x/antmanandthewaspquantumania_lob_crd_03.jpg",
      imdbID: "1",
    },
    {
      Title: "Guardians of the Galaxy Vol. 3",
      Year: "2023",
      Poster:
        "https://cdn.marvel.com/content/1x/guardiansofthegalaxyvolume3_lob_crd_03.jpg",
      imdbID: "2",
    },
    {
      Title: "The Marvels",
      Year: "2023",
      Poster: "https://cdn.marvel.com/content/1x/themarvels_lob_crd_04.jpg",
      imdbID: "3",
    },
    {
      Title: "Black Panther: Wakanda Forever",
      Year: "2022",
      Poster:
        "https://cdn.marvel.com/content/1x/blackpantherwakandaforever_lob_crd_06.jpg",
      imdbID: "4",
    },
    {
      Title: "Doctor Strange In The Multiverse of Madness",
      Year: "2022",
      Poster:
        "https://cdn.marvel.com/content/1x/doctorstrangeinthemultiverseofmadness_lob_crd_02_3.jpg",
      imdbID: "5",
    },
    {
      Title: "Spiderman: No Way Home",
      Year: "2021",
      Poster:
        "https://cdn.marvel.com/content/1x/spider-mannowayhome_lob_crd_03.jpg",
      imdbID: "6",
    },
    {
      Title: "Avengers: Endgame",
      Year: "2019",
      Poster:
        "https://cdn.marvel.com/content/1x/avengersendgame_lob_crd_05_2.jpg",
      imdbID: "7",
    },
    {
      Title: "Avengers: Infinity War",
      Year: "2018",
      Poster:
        "https://cdn.marvel.com/content/1x/avengersinfinitywar_lob_crd_02_1.jpg",
      imdbID: "8",
    },
  ];

  useEffect(() => {
    // Fetch default movies when component mounts
    setMovies(DEFAULT_MOVIES);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      axios
        .get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${OMDB_API_KEY}`)
        .then((response) => {
          setMovies(response.data.Search || []);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setMovies(DEFAULT_MOVIES);
    }
  };

  return (
    <div className="movie-search-app">
      <div className="nav">
        <h1>Hooked</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p>({movie.Year})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
