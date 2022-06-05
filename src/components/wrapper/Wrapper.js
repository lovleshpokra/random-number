import React from 'react';
import Header from './../header';
import Footer from './../footer';
import Randomizer from './../randomizer';

function Wrapper () {
  return (
    <div className="app-wrapper">
      <Header/>
      <Randomizer />
      <Footer/>
    </div>
  );
}

export default Wrapper;
