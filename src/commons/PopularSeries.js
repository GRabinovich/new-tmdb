import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { SerieDetails } from "./SerieDetails";
import CircularProgress from "@mui/material/CircularProgress";

export const PopularSeries = () => {
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

  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSerieId, setSelectedSerieId] = useState(null);

  const handleOpen = (serieId) => {
    setSelectedSerieId(serieId);
  };

  const handleClose = () => {
    setSelectedSerieId(null);
  };

  useEffect(() => {
    axios.get("/series")
      .then((res) => {
        setSeries(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="row" style={{ margin: "0 auto" }}>
      {series.map((serie) => (
        <div key={serie.id} className="col-md-2">
          <div className="card" style={{ width: "18rem", margin: "5px" }}>
            <img
              src={
                serie.poster_path === null
                  ? "https://st.depositphotos.com/1252248/1783/i/450/depositphotos_17833069-stock-photo-error-404-not-found.jpg"
                  : `https://image.tmdb.org/t/p/w400/${serie.poster_path}`
              }
              className="card-img-top"
              alt={serie.name}
            />
            <div className="card-body">
              <h5 className="card-title">
                {serie.name.length > 22
                  ? `${serie.name.slice(0, 22)}...`
                  : serie.name}
              </h5>
            </div>
            <Button onClick={() => handleOpen(serie.id)}>Detalles</Button>
          </div>
        </div>
      ))}

      {selectedSerieId && (
        <Modal
          open={selectedSerieId !== null}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={styleModal}
        >
          <Box sx={styleBox}>
            <SerieDetails id={selectedSerieId} />
          </Box>
        </Modal>
      )}
    </div>
  );
};
