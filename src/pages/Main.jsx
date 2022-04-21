
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/movieCard/MovieCard";
import { AuthContext } from "../context/AuthContext";

const Main = () => {
    // buradaki apikeylerimizi context te tutmamiza gerek yok lokalde kullanacagiz
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

  const [movies, setMovies] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const {currentUser} = useContext(AuthContext);

    // Biz bu func imizin dinamik olmasini istiyoruz. yani icine hangi api yazilirsa o apiden veri ceksin, her api icin ayri bir func yazmayalim istiyoruz. Bu nedenle icine API adinda bir parametre verdik. 
  const getMovie = async (API) => {
    const response = await axios.get(API);
    const {data : {results : movies}} = response;
    setMovies(movies);
  };

  useEffect(() => {
      getMovie(FEATURED_API);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && currentUser) {
      getMovie(SEARCH_API + searchTerm)
    } else if (!currentUser) {
      alert("Please log in to search")
    } else {
      alert("Please enter a text to search")
    }
  };
  // eger user her harf girdiginde arama yapsin istersek direkt olarak onchange e getMovie baglariz.

  return (
    <>
    <form className="search" onSubmit={handleSubmit}>
    <input
      type="search"
      // search type olmasinin avantaji, giris esnasinda X isareti cikar silmek icin
      className="search-input"
      placeholder="Search a movie..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button type="submit">Search</button>
  </form>

    <div className="d-flex flex-wrap">
        {movies?.map((movie) => {
          return (
              <MovieCard {...movie} key = {movie.id} />
          )
        })}
    </div>
    </>

  )
};

// Önemli: map isleminde movie yi gönderirken bir filme ait tüm verileri toplu sekilde gönderim yapiyoruz. eger movie = {movie seklinde gönderim yaparsak bu durumda kullanirken {} ile destructure yapmak gerekir her bir prop icin. ama {...movie} gönderiminde durum farkli. direkt olarak prop larin isimleri ile kullanim yapabiliriz.}

export default Main