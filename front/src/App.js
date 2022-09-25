import React, {} from "react";
import './App.css';
import './connexion/register';
import {Link} from "react-router-dom";
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from "./connexion/register";
import Login from "./connexion/login";
import Profile from "./interfaces/profile";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>}/>
          </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
