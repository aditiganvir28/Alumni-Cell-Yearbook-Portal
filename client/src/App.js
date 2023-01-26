// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import Cards from './components/team/Cards.jsx';
// import Members from './components/team/Cards.jsx';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Cards/>
    </div>
  );
}
export default App;
