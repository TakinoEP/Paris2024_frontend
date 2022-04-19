import axios from 'axios';
import React, {useState, useEffect } from 'react';
import logo from '../../assets/paris2024.png';
import './Disciplines.css';

function Disciplines() {

  const [discipline, setDisciplines] = useState([]);

  const [disciplineDelete, setDisciplineDelete] = useState();

  const [alertDelete, setAlertDelete] = useState(false);

  const getAllDisciplines = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/disciplines`)
      .then((resp) => {
        console.log(resp.data);
        return setDisciplines(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllDisciplines();
  }, []);

  const handleDeleteDiscipline = async () => {
    console.log(disciplineDelete);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/disciplines/${disciplineDelete}`,
          {
            withCredentials: true,
          }
        )
        .then((resp) => {
          console.log(resp);
          setAlertDelete(false);
          getAllDisciplines();
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="disciplines">
      <img src={logo} alt="logo" className="logo" />
      <div className="intro">
        <h2>LES DISCIPLINES</h2>
      </div>
      {discipline.map((discipline) => (
        <div className="rectangle">
          <h2>{discipline.dicipline_name}</h2>

          <div className="description">
            <div className="container_image_discipline">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${discipline.source}`}
                alt={discipline.asset_name}
                className="image_discipline"
              />
            </div>
            <p>{discipline.description}</p>
          </div>
          {/* pop up alerte suppression */}
          {alertDelete ? (
            <div className="delete">
              <section className="delete-alert">
                Voulez vous supprimer cette discipline?
                <button
                  type="button"
                  className="button-add"
                  onClick={handleDeleteDiscipline}
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
                setDisciplineDelete(discipline.id);
                console.log(discipline.id);
                setAlertDelete(true);
              }}
            >
              SUPPRIMER
            </button>
          
        </div>
      ))}
      <p>"Le sport, une passion"</p>
    </div>
  );
}
export default Disciplines;
