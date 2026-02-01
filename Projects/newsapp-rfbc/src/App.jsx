import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  const [progress, setProgress] = useState(0);
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <LoadingBar
        color="#f11946"
        progress={progress}
      />

      <Routes>
        <Route
          path="/"
          element={<News key="general" pageSize={4} category="general" apiKey={apiKey} setProgress={setProgress} />}
        />
        <Route
          path="/technology"
          element={
            <News key="technology" pageSize={4} category="technology" apiKey={apiKey} setProgress={setProgress} />
          }
        />
        <Route
          path="/business"
          element={<News key="business" pageSize={4} category="business" apiKey={apiKey} setProgress={setProgress} />}
        />
        <Route
          path="/entertainment"
          element={
            <News key="entertainment" pageSize={4} category="entertainment" apiKey={apiKey} setProgress={setProgress} />
          }
        />
        <Route
          path="/sports"
          element={<News key="sports" pageSize={4} category="sports" apiKey={apiKey} setProgress={setProgress} />}
        />
        <Route
          path="/science"
          element={<News key="science" pageSize={4} category="science" apiKey={apiKey} setProgress={setProgress} />}
        />
        <Route
          path="/health"
          element={<News key="health" pageSize={4} category="health" apiKey={apiKey} setProgress={setProgress} />}
        />
      </Routes>
    </Router>
  );
}
