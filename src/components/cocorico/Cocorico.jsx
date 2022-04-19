import axios from 'axios';
import React, { useState, useEffect } from 'react';
import logo from '../../assets/paris2024.png';
import './Cocorico.css';

function Cocorico() {
 

  // get personnages
  const [cocorico, setCocorico] = useState([]);

 
  const [alertDelete, setAlertDelete] = useState(false);

 
  const [cocoricoDelete, setCocoricoDelete] = useState();

 
  const getallCocorico = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/personnages`)
      .then((resp) => {
        console.log(resp.data);
        return setCocorico(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getallCocorico();
  }, );

  const handleDeleteCocorico = async () => {
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/cocorico/${cocoricoDelete}`,
          {
            withCredentials: true,
          }
        )
        .then((resp) => {
          console.log(resp);
          setAlertDelete(false);
          getallCocorico();
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="personnages">
      <img src={logo} alt="logo" className="logo" />
      <div className="intro">
        <h2>LES ATHLÈTES FRANÇAIS</h2>
      </div>
      {cocorico.map((cocorico) => (
        <div className="rectangle">
          <h2>{cocorico.name}</h2>

          <div className="description">
            <div className="container_image_persos">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${cocorico.source}`}
                alt={cocorico.asset_name}
                className="image_perso"
              />
            </div>
            <p>{cocorico.description}</p>
          </div>
          <div className="Royaume">
            <p>Origine : {cocorico.discipline}</p>
          </div>
          {/* pop up alerte suppression */}
          {alertDelete ? (
            <div className="delete">
              <section className="delete-alert">
                Voulez vous supprimer ce personnage?
                <button
                  type="button"
                  className="button-add"
                  onClick={handleDeleteCocorico}
                >
                  VALIDER
                </button>
                <button
                  type="button"
                  className="button-add"
                  onClick={() => {
                    setAlertDelete(false);
                  }}
                >
                  ANNULER
                </button>
              </section>
            </div>
          ) : null}
            <button
              className="button-admin"
              type="button"
              onClick={() => {
                setCocoricoDelete(cocorico.id);
                setAlertDelete(true);
              }}
            >
              SUPPRIMER
            </button>
        </div>
      ))}
      <p>"Cocorico!"</p>
    </div>
  );
}

export default Cocorico;
