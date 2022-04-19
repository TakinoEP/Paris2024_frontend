import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../../assets/paris2024.png'
import './nav.scss';

export default function Nav() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const role = localStorage.getItem('role');
  console.log(typeof role);
  const toogleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  return (
    <div>
      <div className="navigation">
      <img src={logo} alt="logo" className="logo" />
        <ul className={hamburgerOpen ? 'navUlClose' : 'navUlOpen'}>
          <NavLink className="lienNav" to="/" onClick={toogleHamburger}>
            ACCUEIL
          </NavLink>
          <NavLink className="lienNav" to="/disciplines" onClick={toogleHamburger}>
            LES DISCIPLINES
          </NavLink>
          <NavLink className="lienNav" to="/cocorico" onClick={toogleHamburger}>
            COCORICO
          </NavLink>
        </ul>
        <button
          type="button"
          className={hamburgerOpen ? 'modeOuvert' : 'modeFerme'}
          onClick={toogleHamburger}
        >
          <div className=" burger1" />
          <div className=" burger2" />
          <div className=" burger3" />
        </button>
      </div>
    </div>
  );
}
