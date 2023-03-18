import React, { useState } from "react";
import "../index.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userLogIn");
        if (data.user.email === email) {
          console.log(email, password, data.token);
          alert("login successful");
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("userId", data.id);
          window.location.href = "./show-travel-list";
        } else {
          alert("Incorrect password");
        }
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{ color: "white" }}>Travel Goals</h1>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="/sign-up">Sign Up</a>
          </p>
        </div>
      </div>
    </form>
  );
}
