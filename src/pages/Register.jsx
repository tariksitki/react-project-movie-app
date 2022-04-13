import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createUser} from "../auth/Firebase"

const Register = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : ""
  });

  const handleSubmit = () => {
    createUser(userData.email, userData.password, navigate);
    // register olan kisi ayni zamanda login olmus demektir. bu nedenle register olan kisi eger problem yoksa home a yönlendirilir. ama kontrolünü firebase.jsx de yapiyoruz. navigate i buradan props olarak gönderiyoruz.
  }

  return (
    <div className="d-flex">
      <section className="form-image w-50" >
          <img src="https://picsum.photos/seed/picsum/700/500" alt="" style={{width : "100%"}} />
      </section>

      <section className="register-form d-flex flex-column align-items-center justify-content-center w-50" >
          <h2 className="display-4">Register</h2>

          <form id="register" onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
          }} >

          <div>
              <label htmlFor="first-name">First Name</label> <br />
              <input type="text" className="form-control" id="first-name" placeholder="Please Enter Your First Name" required onChange={(e) => setUserData({...userData, firstName : e.target.value })} />
            </div>

            <div className="mt-4">
              <label htmlFor="last-name">Last Name</label> <br />
              <input type="text" className="form-control" id="last-name" placeholder="Please Enter Your Last Name" required onChange={(e) => setUserData({...userData, lastName : e.target.value })} />
            </div>
            
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
                <input type="submit" value = "REGISTER" className="btn btn-primary" />
                {/* Note: Forma onsubmit verdigimizde, button a event eklememize gerek yok. */}
            </div>
              
          </form>
      </section>
    </div>
  )
}

export default Register;

// Note: Inputlari da button olarak kullanabiliriz. Bunun icin, input type button olmasi gerekir. ancak söyle bir sikinti var. input alanlarimizi requiered yapmak istiyorsak bu durumda bu calismaz. bu nedenle böyle durumlarda formun onSubmit özelligi kullanilir. bunun sebebi onclick de form submit edilmez 