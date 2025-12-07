import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [error, setErr] = useState({});
  const [emailormob, setValidate] = useState("");
  const [pwd, setPwd] = useState("");

  let navigate = useNavigate()

  const[loginerr, setloginErr] = useState("")

  function handlChange(e) {
    setValidate(e.target.value);
  }

  function handlChange2(e) {
    setPwd(e.target.value);
  }

  function Validte(e) {
    e.preventDefault();

    let err = {};

    if (!emailormob.trim()) {
      err.emailormob = "Please Enter the Valid email or mobile no";
    }

    if (!pwd.trim()) {
      err.pwd = "Please Enter the Password";
    }

    setErr(err);

    if (Object.keys(err).length === 0) {
      handleLogin(); 
    }
  }

  function handleLogin() {
    axios
      .post("https://loginpage-33.onrender.com/login", {
        emailOrMobile: emailormob,
        password: pwd,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.success) {
          navigate("home")
        } else {
          setErr({ api: "Invalid username or password" })
        }
      })
      .catch((err) => 

        setErr({ api: "Invalid username or password" })
      
    )
  }

  return (
    <div className="login-bg">
      <div className="login-nav">
        <div className="logo">Netflix</div>
      </div>
      <div className="login-container">
        <div className="login-card">
          <h1 className="title">Sign In</h1>
          {error.api && <p style={{ color: "red" }}>{error.api}</p>  }
          <form onSubmit={Validte}>
            <div className="input-group">
              <input
                value={emailormob}
                name="emailormob"
                onChange={handlChange}
                type="text"
                placeholder="Email or phone number"
              />
              <p style={{ color: "red" }}>{error.emailormob}</p>

              <input
                value={pwd}
                name="pwd"
                onChange={handlChange2}
                type="password"
                placeholder="Password"
              />
              <p style={{ color: "red" }}>{error.pwd}</p>
            </div>

            <button className="login-btn">Sign In</button>
          </form>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Need help?</a>
          </div>

          <p className="footer-text">
            New to Netflix? <Link to="signon">Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
