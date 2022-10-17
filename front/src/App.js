import React, {} from "react";
import './App.css';
import './connexion/register';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from "./connexion/register";
import Login from "./connexion/login";
import Profile from "./interfaces/profile";
import Header from "./interfaces/header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header/>
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
