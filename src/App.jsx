import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "./components/Register"
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Movies } from "./components/Movies";
import { Series } from "./components/Series"
import { SearchMovies } from "./commons/SearchMovies";
import { SearchSeries } from "./commons/SearchSeries";
import { Navbar } from "./components/Navbar";
import { AllFavorites } from "./components/AllFavorites";

const App = () => {
  const handleLogin = (userData) => {
    console.log("Usuario inició sesión:", userData);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Login onLogin={handleLogin} /> 
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/movies/search/:name" element={<><Navbar/><SearchMovies /></>} />
        <Route path="/series/search/:name" element={<><Navbar/><SearchSeries /></>} />
        <Route path="/favorites" element={<><Navbar/><AllFavorites/></>} />
      </Routes>
    </div>
  );
};

export default App;