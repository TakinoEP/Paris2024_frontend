import { Routes, Route } from "react-router-dom";
import React from "react";
import Admin from "./components/admin/Admin";
import Nav from "./components/menuburger/Nav";
import Cocorico from "./components/cocorico/Cocorico";
import Home from "./components/home/Home";
import Disciplines from "./components/disciplines/Disciplines";

import './app.css';
function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disciplines" element={<Disciplines />} />
        <Route path="/cocorico" element={<Cocorico />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
