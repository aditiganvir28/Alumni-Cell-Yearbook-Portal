// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar.jsx';
import Cards from './components/team/Cards.jsx';
import MakeAComment from './components/Make_a_Comment/MakeAComment';
import SecondLogin from './components/SecondLogin/SecondLogin';
// import Members from './components/team/Cards.jsx';
import Fill from './components/Fill_Details/Fill';
import Homepage from './components/Homepage/Homepage';

import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { Profile } from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      {/* <Navbar/>
      <Cards/> */}
      <SecondLogin />
    </div>
  );
}
export default App;
