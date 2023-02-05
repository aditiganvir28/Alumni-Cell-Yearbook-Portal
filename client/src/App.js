// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar.jsx';
// import About from './components/About/About';
// import Cards from './components/team/Cards.jsx';
// import Members from './components/team/Cards.jsx';
import Fill from './components/Fill_Details/Fill';
import Homepage from './components/Homepage/Homepage';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { Profile } from './components/Profile/Profile';
import { useContext } from 'react';

function App() {
  // const authData = useContenxt()
  return (
    <div className="App">
      {/* <Navbar/>
      {/* <Cards/> */}
      {/* <Homepage></Homepage> */}
      {/* <Fill></Fill> */} 
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' exact element = {<Homepage/>}></Route>
        <Route path='/fill' exact element={<Fill/>}></Route>
        <Route path='/profile' exact element={<Profile/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
