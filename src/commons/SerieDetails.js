import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useUser } from "../context/userContext";
import CircularProgress from "@mui/material/CircularProgress";

export const SerieDetails = ({ id }) => {
  const [serie, setSerie] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);

  const fetchData = useCallback(async () => {
    axios.get(`/series/${id}`).then((response) => {
      setSerie(response.data);
      setLoading(false);
    });
  }, [id]);

  const checkIsFavorite = () => {
    axios
      .get(`/user/${user.username}/favorites`)
      .then((response) => {
        const isMovieInFavorites = response.data.some(
          (favorite) => favorite.tmdbId === serie.id
        );
        setIsFavorite(isMovieInFavorites);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
    checkIsFavorite();
  }, [fetchData]);

  function genresStr(genres) {
    return genres.map((genre) => genre.name).join(", ");
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  let rating = parseFloat(
    serie.vote_average.toString().split("").slice(0, 3).join("")
  );

  const toggleFavorites = () => {
    setOpenDialog(true);
  };

  const handleAddToFavorites = () => {
    if (isFavorite) {
      axios
        .delete(`/user/${user.userId}/remove-favorite/${serie.id}`)
        .then(() => {
          setIsFavorite(false);
          console.log("Removed from favorites");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post(`/user/${user.userId}/add-favorite`, {
          tmdbId: serie.id,
          title: serie.name,
          releaseDate: serie.first_air_date,
          imageURL: `https://image.tmdb.org/t/p/w400/${serie.poster_path}`,
          genres: genresStr(serie.genres),
          description: serie.overview,
          rating: rating,
        })
        .then(() => {
          setIsFavorite(true);
          console.log("Added to favorites");
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={
          serie.poster_path === null
            ? "https://st.depositphotos.com/1252248/1783/i/450/depositphotos_17833069-stock-photo-error-404-not-found.jpg"
            : `https://image.tmdb.org/t/p/w400/${serie.poster_path}`
        }
        className="img-fluid rounded-start"
        alt={serie.name}
      />
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {serie.name}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <p className="card-text">
          Fecha de Lanzamiento: {serie.first_air_date}
        </p>
        <p className="card-text">Géneros: {genresStr(serie.genres)}</p>
        <p className="card-text">
          {" "}
          Descripción:{" "}
          {serie.overview === "" ? "Not Descripcion" : serie.overview}
        </p>
        <p className="card-text">Rating: {Number(rating)}</p>

        <Button
          variant="contained"
          color={isFavorite ? "secondary" : "primary"}
          onClick={toggleFavorites}
        >
          {isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
        </Button>

        <Dialog open={openDialog} onClose={handleCancel}>
          <DialogTitle>
            {isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
          </DialogTitle>
          <DialogContent>
            <p>
              {isFavorite
                ? "¿Seguro que deseas eliminar esta serie de tus favoritos?"
                : "¿Seguro que deseas agregar esta serie a tus favoritos?"}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleAddToFavorites} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Typography>
    </div>
  );
};