import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Admin.css";


function Admin() {
  const [type, setType] = useState("disciplines");

  const [admins, setAdmins] = useState([]);

  const [objectList, setObjectList] = useState([]);

  const [setUpdateId] = useState([]);

  const [handleNewAdminSubmit] = useState([]);

  const [handleSubmit] = useState([]);

  // id de l'admin a supprimer
  const [adminDelete, setAdminDelete] = useState();
  // id de l'asset selectionné
  const [alertDelete, setAlertDelete] = useState();
  // state formulaire create admin
  const [actionType, setActionType] = useState();

  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
  });

  // message de confirmation pour delete-create
  const [status, setStatus] = useState("");

  // get all admins
  const getAdmins = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/admins`)
      .then((resp) => {
        return setAdmins(resp.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  // get all objects by type
  const getAllObjects = () => {
    // si le type d'objet' selectionné est discipline, on appelle la table disciplines
    if (type === "disciplines") {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/disciplines`)
        .then((resp) => {
          setObjectList(resp.data);
        });
    }
    if (type === "cocorico") {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/cocorico`)
        .then((resp) => {
          setObjectList(resp.data);
        });
    }
  };

  // on passe l'argument objetType au useEffect, a chaque fois que la selection du type change il re render le composant pour afficher la bonne liste
  useEffect(() => {
    getAdmins();
    getAllObjects();
  });

  // delete one admin => penser a ajouter le withcredentials pour obtenir req.cookies dans le back à chaque requete admin
  const handleDeleteAdmin = async () => {
    // si admin.id recupérée par axios.get = adminId recupérée lors du login pas supprimer (car c'est l'admin actif)
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/${adminDelete}`,
          {
            withCredentials: true,
          }
        )
        // on ferme le popup alerte avec le state false et on affiche le status OK, on refais un getAdmin pour actualiser la liste -admin supprimé
        .then((resp) => {
          setAlertDelete(false);
          getAdmins();
          setStatus("Admin supprimé");
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };



return (
  <div>
    {/* partie gestion admin */}
    <h2>Administrateurs</h2>
    <div className="Admin">
      {/* formulaire create admin */}
      <form className="new-admin" onSubmit={handleNewAdminSubmit}>
        Créer un nouveau
        <label htmlFor="email">
          <input
            type="email"
            placeholder="MAIL"
            value={newAdmin.email}
            // on rempli uniquement la valeur email en destructurant le state newAdmin
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, email: e.target.value })
            }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            placeholder="MOT DE PASSE"
            value={newAdmin.password}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, password: e.target.value })
            }
          />
        </label>
        <button type="submit" className="button-add">
          VALIDER
        </button>
      </form>

      {/* pop up alerte suppression */}
      {alertDelete ? (
        <div className="delete">
          <section className="delete-alert">
            Voulez vous supprimer cet admin?
            <button
              type="button"
              className="button-add"
              onClick={handleDeleteAdmin}
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

      {/* liste admin recupérée avec axios et décomposée avec .map */}
      {admins.map((admin) => (
        <div className="admin-container">
          <section className="admin-list">
            {admin.email}
            <button
              className="button-admin"
              type="button"
              onClick={() => {
                setAdminDelete(admin.id);
                console.log(`idAdmin recupérée ${adminDelete}`);
                setAlertDelete(true);
              }}
            >
              SUPPRIMER
            </button>
          </section>
        </div>
      ))}
    </div>

    {/* si le state status est rempli, affiche ce state prévu pour afficher un message d'erreur ou de succès */}
    {status ? <h5>{status}</h5> : null}

    {/* partie ajouter ou modifier */}
    <h2>AJOUTER ou MODIFIER</h2>
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
        {/* les 2 selecteurs : ajout/modif et type d'article */}
        <section className="selectors">
          <label htmlFor="select-action">
            <select name="action">
              <option
                value={actionType}
                onClick={() => setActionType("ajouter")}
              >
                AJOUTER
              </option>
              <option
                value={actionType}
                onClick={() => setActionType("modifier")}
              >
                MODIFIER
              </option>
            </select>
          </label>
          <label htmlFor="select-type">
            <select name="type">
              <option value={type} onClick={() => setType("disciplines")}>
                DISCIPLINES
              </option>

              <option
                value={type}
                onClick={() => {
                  setType("personnages");
                }}
              >
                COCORICO
              </option>
            </select>
          </label>
        </section>
        {actionType === "modifier" ? (
          <label htmlFor="select-update">
            <select name="update" id="update">
              <option>Choisissez un article à modifier</option>
              {/* on affiche les resultat du getallevent by type dans le selecteur, et on recup l'id de l'event au clic */}
              {objectList.map((objectPut) => (
                <option
                  value={objectPut.id}
                  onClick={() => setUpdateId(objectPut.id)}
                >
                  {objectPut.discipline_name || objectPut.name}
                </option>
              ))}
              ;
            </select>
          </label>
        ) : null}
      </form>
    </div>
  </div>
);}

export default Admin;
