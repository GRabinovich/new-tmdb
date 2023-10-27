import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "../context/userContext";
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";

export const AllFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTmdbId, setSelectedTmdbId] = useState(null);

  const fetchData = useCallback(async () => {
    axios.get(`/user/${user.username}/favorites`).then((response) => {
      setFavorites(response.data);
      setLoading(false);
    });
  }, [user.username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const removeFromFavorites = (tmdbId) => {
    setSelectedTmdbId(tmdbId);
    setOpenDialog(true);
  };

  const handleRemoveFromFavorites = () => {
    axios
      .delete(`user/${user.userId}/remove-favorite/${selectedTmdbId}`)
      .then(() => {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((favorite) => favorite.tmdbId !== selectedTmdbId)
        );
        setSelectedTmdbId(null);
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error removing from favorites:", error);
        setSelectedTmdbId(null);
        setOpenDialog(false);
      });
  };

  const handleCancel = () => {
    setSelectedTmdbId(null);
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className="row" style={{ margin: "0 auto" }}>
        <h1>Mis Favoritos</h1>
        {favorites.map((favorite) => (
          <div key={favorite.id} className="col-md-2">
            <div className="card" style={{ width: "18rem", margin: "5px" }}>
              <img
                src={
                  favorite.imageURL === null
                    ? "Image-Error.png"
                    : `https://image.tmdb.org/t/p/w400/${favorite.imageURL}`
                }
                className="card-img-top"
                alt={favorite.title}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {favorite.title.length > 24
                    ? `${favorite.title.slice(0, 24)}...`
                    : favorite.title}
                </h5>
              </div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeFromFavorites(favorite.tmdbId)}
              >
                Eliminar de favoritos
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Eliminar de Favoritos</DialogTitle>
        <DialogContent>
          <p>¿Seguro que deseas eliminar esta película o serie de tus favoritos?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleRemoveFromFavorites} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};