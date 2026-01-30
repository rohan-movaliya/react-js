import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0 };
    this.apiKey = process.env.REACT_APP_NEWS_API_KEY;
  }

  setProgress = (newProgress) => {
    this.setState({ progress: newProgress });
  };

  render() {
    return (
      <Router>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={this.state.progress}
        />

        <Routes>
          <Route
            path="/"
            element={<News key="general" pageSize={4} category="general" apiKey={this.apiKey} setProgress={this.setProgress} />}
          />
          <Route
            path="/technology"
            element={
              <News key="technology" pageSize={4} category="technology" apiKey={this.apiKey} setProgress={this.setProgress} />
            }
          />
          <Route
            path="/business"
            element={<News key="business" pageSize={4} category="business" apiKey={this.apiKey} setProgress={this.setProgress} />}
          />
          <Route
            path="/entertainment"
            element={
              <News key="entertainment" pageSize={4} category="entertainment" apiKey={this.apiKey} setProgress={this.setProgress} />
            }
          />
          <Route
            path="/sports"
            element={<News key="sports" pageSize={4} category="sports" apiKey={this.apiKey} setProgress={this.setProgress} />}
          />
          <Route
            path="/science"
            element={<News key="science" pageSize={4} category="science" apiKey={this.apiKey} setProgress={this.setProgress} />}
          />
          <Route
            path="/health"
            element={<News key="health" pageSize={4} category="health" apiKey={this.apiKey} setProgress={this.setProgress} />}
          />
        </Routes>
      </Router>
    );
  }
}
