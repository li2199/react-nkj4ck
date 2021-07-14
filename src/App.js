import './App.css';
import React from 'react';
import Top from './top/Top';
import Left from './left/left';
import Center from './center/center';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Top />
      <Left />
      <Center />
      <div className="bottom" />
    </BrowserRouter>
  </div>
);

export default App;
