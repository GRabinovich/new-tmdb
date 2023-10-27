import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MovieDetails } from "./MovieDetails";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export const SearchMovies = () => {
  const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid grey',
    boxShadow: 24,
    borderRadius: "20px",
    p: 4,
  };

  const styleModal = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "auto", 
    padding: "16px",
  };

  const { name } = useParams();
  const [search, setSearch] = useState(name || "");
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/movies/search/${search}`);
    }
  };

  useEffect(() => {
    if (name) {
      setSearch(name);
      searchMovies();
    }
  }, [name]);

  const searchMovies = () => {
    axios.get(`/movies/search/${search}`).then((res) => {
      setMovies(res.data.results);
    });
  };

  const handleOpen = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleClose = () => {
    setSelectedMovieId(null);
  };

  return (
    <div>     
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        style={{ margin: "17px" }}
      />
      <div className="row" style={{ margin: "0 auto" }}>
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-2">
            <div className="card" style={{ width: "18rem", margin: "5px" }}>
              <img
                src={
                  movie.poster_path === null
                    ? "https://st.depositphotos.com/1252248/1783/i/450/depositphotos_17833069-stock-photo-error-404-not-found.jpg"
                    : `https://image.tmdb.org/t/p/w400/${movie.poster_path}`
                }
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {movie.title.length > 24
                    ? `${movie.title.slice(0, 24)}...`
                    : movie.title}
                </h5>
              </div>
              <Button onClick={() => handleOpen(movie.id)}>Detalles</Button>
            </div>
          </div>
        ))}
      </div>

      {selectedMovieId && (
        <Modal
          open={selectedMovieId !== null}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={styleModal}
        >
          <Box sx={styleBox}>
            <MovieDetails id={selectedMovieId} />
          </Box>
        </Modal>
      )}
    </div>
  );
};
