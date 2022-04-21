// Dikkat: Movie sayfasinda, url leri component in üstünde global de tanimlamistik burada ise component icinde tanimladik. Bunun sebebi, url ler icinde id ve apikey gibi bilgileri kullaniyoruz. ve bunlar da component e props olarak geliyor. eger biz component disinda kullanirsak bu bilgileri alamayiz.

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import VideoSection from "../components/VideoSection";

// Burada useParams ile id yi aldik. Cünkü, details sayfasi icin bizim yeni bir url imiz bulunmakta ve bu url icinde id kullanmak zorundayiz.
// recipe app de, navigate icine id koyup öyle göndermistik. ama bu isin best practice i, veri nerede lazimsa sadece orada cekmektir.

const MovieDetail = () => {
  const { id } = useParams();
  // const params = useParams();
  // Bu sekilde de kullanilabilirdi ama params.id seklinde olurdu

  const [movieDetails, setMovieDetails] = useState();
  const [videoKey, setVideoKey] = useState();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  // const API_KEY = "d6278b3dc3e6f8f8376a89851c3f8c8f";
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((error) => console.log(error));

    axios
      .get(videoUrl)
      .then((res) => setVideoKey(res.data.results[0].key))
      .catch((error) => console.log(error));
  }, [movieDetailBaseUrl, videoUrl]);

  return (
    <div className="container py-2">
      <h1 className="text-center">{movieDetails?.title}</h1>
      {videoKey && <VideoSection videoKey={videoKey} />}
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={
                movieDetails?.poster_path
                  ? baseImageUrl + movieDetails?.poster_path
                  : defaultImage
              }
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8 d-flex flex-column">
            <div className="card-body">
              <h5 className="card-title">Overview</h5>
              <p className="card-text">{movieDetails?.overview}</p>
            </div>

            <ul className="list-group ">
              <li className="list-group-item">
                {"Release Date : " + movieDetails?.release_date}
              </li>
              <li className="list-group-item">
                {"Rate : " + movieDetails?.vote_average}
              </li>
              <li className="list-group-item">
                {"Total Vote : " + movieDetails?.vote_count}
              </li>
              <li className="list-group-item">
                <Link to={-1} className="card-link">
                  Go Back
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
