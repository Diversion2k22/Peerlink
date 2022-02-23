import React,{useState} from 'react';
import Navbar from "./Navbar";
import {useNavigate} from "react-router-dom";

function Register() {
  const [email,setEmail]=useState("");
  const [username,setUsername]=useState("");
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");
  const [cpassword,setCpassword]=useState("");
  const navigate = useNavigate();

  const handleSubmit =async (event) => {
    event.preventDefault();
    const result = await fetch("/auth/register",{
      method:"post",
      body:JSON.stringify({email,username,phone,password,cpassword}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data= await result.json();
    console.warn(data);
    if(result.status===422 || !data){
      window.alert("Bad request");
    }
    if(result.status===200 || result.status===201){
      navigate("/login");
    }
  }
    return (
        <>
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

            <p className="para2">Sign Up</p>
            <form action="#" onSubmit={handleSubmit}>
              <div className="inp">
              <input 
                type="email" 
                placeholder="Email" 
                name="email"
                //value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                />
              </div>
              <div className="inp"> 
              <input 
                type="text" 
                placeholder="Username" 
                name="username"
                //value={username}
                onChange={(e)=>setUsername(e.target.value)}
                //required
                />
              </div>
              <div className="inp">
              <input 
                type="text" 
                placeholder="Phone no." 
                name="phone"
                //value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                //required
                />
              </div>
              <div className="inp">
              <input 
                type="password" 
                placeholder="Password" 
                name="password"
                //value={password}
                onChange={(e)=>setPassword(e.target.value)}
                //required
                />
              </div>
              <div className="inp">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                name="cpassword"
                //value={cpassword}
                onChange={(e)=>setCpassword(e.target.value)}
                //required
                />
              </div>
              <div className="inp but">
              <input type="submit" value="Sign Up"/>
              </div>
              <div className="hyper">
              
              <p>Already Have an Account? <a href="
              #">Log In</a></p>
              </div>

            </form>
          </div>
        </div>
      </div>
            
        </>
    )
}

export default Register
