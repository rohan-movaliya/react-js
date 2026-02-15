import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({showAlert}) => {
  const navigate = useNavigate();

  const baseUrl = "http://127.0.0.1:8000";
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${baseUrl}/login`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.email.value,
          password: e.target.password.value,
        }),
      });
      
      if (response.ok) {
        const json = await response.json();
        localStorage.setItem("token", json.access_token);
        if (showAlert) {
          showAlert("Logged in successfully!", "success");
        }
        navigate("/");
      } else {
        const errorData = await response.json();
        if (showAlert) {
          showAlert(errorData.detail || "Login failed. Please check your credentials.", "danger");
        }
      }
    } catch (error) {
      if (showAlert) {
        showAlert("An error occurred. Please try again.", "danger");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                required
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <div className="mt-3">
            <p>
              Don't have an account?{" "}
              <a href="/signup" onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}>
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
