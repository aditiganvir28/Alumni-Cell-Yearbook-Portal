// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import About from './components/About/About';
import Cards from './components/team/Cards.jsx';
// import Members from './components/team/Cards.jsx';

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <Cards/> */}
      <About></About>
    </div>
  );
}
export default App;
