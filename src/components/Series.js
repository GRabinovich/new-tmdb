import React from "react";
import { Navbar } from "./Navbar";
import { SearchSeries } from "../commons/SearchSeries";
import { PopularSeries } from "../commons/PopularSeries";

export const Series = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <SearchSeries />
        <PopularSeries />
      </div>
    </>
  );
};
