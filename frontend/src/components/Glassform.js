import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Glassform() {

  const [email, setEmail]= React.useState('');
  const [password, setPassword]= React.useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.warn("email,password", email, password)
    let result = await fetch('/auth/login', {
      method:'post',
      body:JSON.stringify({email,password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.json();
    console.warn(result);
    if (result.user){
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/chat");
    }
  }

  return (
    <>
    {/* <Navbar val="Sign Up"/> */}
      <div className="set">
        <div className="side">
            <div className="wel">
                <p>Welcome to </p>
                <p>PeerLink</p>
            </div>
        </div>
        <div className="logsec">
              


          <div className="logbody">

              <div className="glass" ></div>
              <div className="glass" ></div>
              <div className="glass" ></div>
              <div className="glass" ></div>
              <div className="glass" ></div>

            <p className="para1">Log In</p>
            <form action="#">
              <div className="inp">
              <input type="text" placeholder="Phone or Email" 
              onChange={(e) => setEmail(e.target.value)} value={email}/>
              </div>
              <div className="inp">
              <input type="password" placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} value={password}/>
              </div>
              <div className="inp but" onClick={handleLogin}>
              <input type="submit" value="Log In"/>
              </div>
              <div className="hyper">
              <p>Forgott Password? <a href="
              #">Click me</a></p>
              <p>Create a Account? <Link to="/signup">Register</Link></p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
