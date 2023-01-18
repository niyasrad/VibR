import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './component/navbar/Navbar';
import Home from './container/home/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
