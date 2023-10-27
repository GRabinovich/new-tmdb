import React from "react";
import { Navbar } from "./Navbar";
import { useUser } from "../context/userContext";
import TMDBImage from "../assets/tmdb-white.png";

export const Home = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <>
      <Navbar />
      <div
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div style={{ fontSize: "50px", color: "rgb(71, 203, 255)" }}>
          Bienvenid@ {user.username}
        </div>
        <img src={TMDBImage} style={{ width: "500px", height: "500px" }} />
        <div style={{ fontSize: "30px", color: "rgb(71, 203, 255)" }}>
          El mejor servicio para encontrar tu película o serie favorita al
          alcance de tu pantalla
        </div>
        
      </div>
    </>
  );
};
