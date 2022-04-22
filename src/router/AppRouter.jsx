import { Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, Outlet } from "react-router-dom"
import AppNavbar from "../components/navbar/AppNavbar";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Register from "../pages/Register";
import MovieDetail from "../pages/MovieDetail";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AppRouter = () => {
  const {currentUser} = useContext(AuthContext);

    // PrivateRouter bir func degil bir component dir
  function PrivateRouter () {
    let location = useLocation();
    if (!currentUser) {
      return <Navigate to={"/login"} state = {{from : location}} replace />
      // navigate in ikinci tarz kullanimi(component seklinde)
    } else {
      return <Outlet />;
    }

  }
  return (
    <Router>
        <AppNavbar />
        <Routes>
            <Route path="/" element = {<Main />} />
            <Route path="/login" element = {<Login />} />
            <Route path="/register" element = {<Register />} />
            {/* <Route path="/details/:id" element = {<MovieDetail />} /> */}
            {/* Burada dynamic bir root olusturduk. Cünkü navigate ile ayarlama yaparken sonuna id koyduk. Bu nedenle her seferinde farkli bir id geliyor.*/}

            {/* Detay sayfasina gitmek icin tiklandiginda, eger log in degil ise alert verdik ve gitmesini engelledik. Ama bu bizim almis oldugumuz bir önlemdi. Ama sayfanin en üstünde url kisminda elimiz ile detay sayfasi url ini yazdigimizda hicbir engel ile karsilasmiyoruz. bu nedenle sartli router yapacagiz. */}

            {/* <Route path="/details/:id" element = {currentUser ? <MovieDetail /> : <Navigate to = "/login" replace /> } /> */}
            {/* replace de son geldigimiz sayfayi hafizaya almaz.  */}
            {/* Bu yöntemi yaptik ama bunu kullanmayacagiz. Cünkü onlarca sayfa olsa her birinde bu condition i kurmak zorundaydik. O nedenle private route olusturacagiz. */}

            <Route element = {<PrivateRouter />} >
                <Route path="/details/:id" element = {<MovieDetail />} />
                {/* Kullanimi asagida aciklama */}
            </Route>
        </Routes>
    </Router>
  )
}

export default AppRouter;

// Private Router kullanimi: 
// Eger bizim yazdigimiz ana 3 tane router main register ve login haricinde bir path gelirse bu durumda PrivateRouter a gir. Ve eger currentUser yoksa direkt login e gönder. Ama varsa o zaman Outlet lere yani child router lara gir. ve hangi path e denk geliyorsa onun elementini döndür.
// PrivateRouter satirinda path yazmadik dikkat
// outlet lerimiz sinirsiz sayida olabilir. mesela user, about gibi path lerde olabilir.

