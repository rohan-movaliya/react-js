import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({showAlert}) => {
  const navigate = useNavigate();

  const baseUrl = "http://127.0.0.1:8000";
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${baseUrl}/register`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        // After successful registration, automatically log the user in
        const loginResponse = await fetch(`${baseUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: e.target.email.value,
            password: e.target.password.value,
          }),
        });

        if (loginResponse.ok) {
          const loginJson = await loginResponse.json();
          localStorage.setItem("token", loginJson.access_token);
          if (showAlert) {
            showAlert("Account created and logged in successfully!", "success");
          }
          navigate("/login");
        } else {
          if (showAlert) {
            showAlert("Registration successful! Please login.", "success");
          }
          navigate("/login");
        }
      } else {
        const errorData = await response.json();
        if (showAlert) {
          showAlert(errorData.detail || "Registration failed. Please try again.", "danger");
        }
      }
    } catch (error) {
      if (showAlert) {
        showAlert("An error occurred. Please try again.", "danger");
      }
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                required
                aria-describedby="nameHelp"
              />
            </div>
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
                minLength={6}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
          <div className="mt-3">
            <p>
              Already have an account?{" "}
              <a href="/login" onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}>
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
