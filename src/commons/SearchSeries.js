import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { SerieDetails } from "./SerieDetails";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export const SearchSeries = () => {
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
  const [series, setSeries] = useState([]);
  const [selectedSerieId, setSelectedSerieId] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/series/search/${search}`);
    }
  };

  useEffect(() => {
    if (name) {
      setSearch(name);
      searchSeries();
    }
  }, [name]);

  const searchSeries = () => {
    axios.get(`/series/search/${search}`).then((res) => {
      setSeries(res.data.results);
    });
  };

  const handleOpen = (serieId) => {
    setSelectedSerieId(serieId);
  };

  const handleClose = () => {
    setSelectedSerieId(null);
  };

  return (
    <div>     
      <input
        type="text"
        placeholder="Search series..."
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        style={{ margin: "17px" }}
      />
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
                alt={serie.title}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {serie.name.length > 24
                    ? `${serie.name.slice(0, 24)}...`
                    : serie.name}
                </h5>
              </div>
              <Button onClick={() => handleOpen(serie.id)}>Detalles</Button>
            </div>
          </div>
        ))}
      </div>

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
