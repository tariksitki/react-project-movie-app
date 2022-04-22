
// TMDB den gelen data icinde image linki bulunur. bu linki foto seklinde kullanabilmek icin de asagidakiimg_api linkini kullaniriz. bu link sonuna ekleme yaparak kullanacagiz
// eger bu foto gelmezse de default foto kullanacagiz.

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({id, title, poster_path, overview, vote_average}) => {
    // context üretmek icin createContext, kullanamk icin useContext
    const {currentUser} =  useContext(AuthContext);
    const navigate = useNavigate();

  return (
    <div className="movie" onClick={() => currentUser ? navigate(`details/${id}`) : alert("Please Log in to see Details!")} >
        <img src={poster_path ? IMG_API + poster_path : defaultImage} alt="image" />

        <div className="d-flex align-items-baseline justify-content-between p-1 text-white">
            <h5>{title}</h5>
            {currentUser && <span className={`tag ${vote_average >= 8 ? "green" : (vote_average > 6 ? "orange" : "red")}`} >{vote_average} </span> }
        </div>

        <div className="movie-over">
            <h2>Overview</h2>
            <p>{overview}</p>
        </div>
    </div>
  )
};

export default MovieCard;

    /// return icinde if yapisi kullanilamaz, ternary kullanilabilir.

  // const setVoteClass = (vote) => {
  //   if (vote >= 8) {
  //     return "green";
  //   } else if (vote >= 6) {
  //     return "orange";
  //   } else {
  //     return "red";
  //   }
  // };

  // yukaridaki class islemlerini bu sekilde de yapabilirdik