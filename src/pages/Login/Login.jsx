import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleSignState = () => {
    setSignState((prev) => (prev === "Sign In" ? "Sign Up" : "Sign In"));
  };

  const user_auth = async (event) => {
    setLoading(true);
    event.preventDefault();

    // Set a timeout to stop the spinner after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (signState === "Sign In") {
      if (email && password) {
        await login(email, password);
      } else {
        console.log("Please fill in all fields.");
      }
    } else {
      if (name && email && password) {
        await signup(name, email, password);
      } else {
        console.log("Please fill in all fields.");
      }
    }
  };

  return (
    loading ? (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    ) : (
      <div className="login">
        <img src={logo} alt="login-logo" className="login-logo" />
        <div className="login-form">
          <h1>{signState}</h1>
          <form onSubmit={user_auth}>
            {signState === "Sign Up" && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{signState}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            <p>
              {signState === "Sign In" ? (
                <>
                  New to Netflix? <span onClick={toggleSignState}>Sign Up Now</span>
                </>
              ) : (
                <>
                  Already have an account? <span onClick={toggleSignState}>Sign In Now</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
