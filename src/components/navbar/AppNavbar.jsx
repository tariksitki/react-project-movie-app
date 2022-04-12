import { Link } from "react-router-dom";

const AppNavbar = () => {
  const currentUser = "Felix";
  // const currentUser = false;
  return (
    <div>
      <nav className="navbar navbar-expand bg-primary text-white">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand text-light">
            React Movie App
          </Link>

          <div>
            {currentUser ? (
              <div className="d-flex align-items-center">
                <h5 className="me-3 text-capitalize ">{currentUser} </h5>
                <button className="btn btn-outline-light">LOGOUT </button>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <button className="btn btn-outline-light me-3 ">LOGIN</button>
                <button className="btn btn-outline-light">REGISTER</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppNavbar;
