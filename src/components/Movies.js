import React from "react";
import { Navbar } from "./Navbar";
import { SearchMovies } from "../commons/SearchMovies";
import { PopularMovies } from "../commons/PopularMovies";

export const Movies = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <SearchMovies />
        <PopularMovies/>
      </div>
    </>
  );
};