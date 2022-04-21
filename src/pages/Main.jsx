
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/movieCard/MovieCard";

const Main = () => {
    // buradaki apikeylerimizi context te tutmamiza gerek yok lokalde kullanacagiz
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

  const [movies, setMovies] = useState();

    // Biz bu func imizin dinamik olmasini istiyoruz. yani icine hangi api yazilirsa o apiden veri ceksin, her api icin ayri bir func yazmayalim istiyoruz. Bu nedenle icine API adinda bir parametre verdik. 
  const getMovie = async (API) => {
    const response = await axios.get(API);
    const {data : {results : movies}} = response;
    setMovies(movies);
  };

  useEffect(() => {
      getMovie(FEATURED_API);
  }, []);

  return (
    <div className="d-flex flex-wrap">
        {movies?.map((movie) => {
          return (
              <MovieCard {...movie} key = {movie.id} />
          )
        })}
    </div>
  )
};

// Önemli: map isleminde movie yi gönderirken bir filme ait tüm verileri toplu sekilde gönderim yapiyoruz. eger movie = {movie seklinde gönderim yaparsak bu durumda kullanirken {} ile destructure yapmak gerekir her bir prop icin. ama {...movie} gönderiminde durum farkli. direkt olarak prop larin isimleri ile kullanim yapabiliriz.}

export default Main