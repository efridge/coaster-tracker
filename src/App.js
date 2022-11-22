import React from "react";
import { Routes, Route } from 'react-router-dom'
import HomePage from './Home';
import LoginPage from './Login';

import "./App.css";

function App() {

  return (
    <Routes> {/* the collection of routes to match */}
        {/* if currentUrlPath === "/" */}
        <Route path="/" element={<HomePage />} />

        {/* if currentUrlPath ===  "login" */}
        <Route path="login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
