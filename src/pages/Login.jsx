
import { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState({
    email : "",
    password : ""
  });

  const handleSubmit = () => {
    console.log(userData);
  }
  return (
    <div className="d-flex">
      <section className="form-image w-50" >
          <img src="https://picsum.photos/seed/picsum/700/500" alt="" style={{width : "100%"}} />
      </section>

      <section className="register-form d-flex flex-column align-items-center justify-content-center w-50" >
          <h2 className="display-4">LOGIN</h2>

          <form id="register" onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
          }} >

            <div className="mt-4">
              <label htmlFor="email">E-Mail Address</label> <br />
              <input type="email" className="form-control" id="email" placeholder="Please Enter Your E-Mail Address" required onChange={(e) => setUserData({...userData, email : e.target.value })} />
            </div>

            
            <div className="mt-4">
              <label htmlFor="password">Password</label> <br />
              <input type="password" className="form-control" id="password" placeholder="Please Enter Your Password" required onChange={(e) => setUserData({...userData, password : e.target.value })} />
            </div>

            <div className="d-flex justify-content-center align-items-center mt-5">
                {/* <input type="button" value = "REGISTER" onClick={handleSubmit}/> */}
                <input type="submit" value = "LOGIN" className="btn btn-primary" />
                {/* Note: Forma onsubmit verdigimizde, button a event eklememize gerek yok. */}
            </div>
              
          </form>

          <button className="btn btn-primary mt-5">Continue With Google</button>
      </section>
    </div>
  )
}

export default Login