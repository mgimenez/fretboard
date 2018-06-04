import './styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import HeaderNav from './components/HeaderNav/HeaderNav';
import Fretboard from './components/Fretboard/Fretboard';
import ChordsReader from './components/ChordsReader/ChordsReader';

ReactDOM.render(
  <div>
    <HeaderNav/>
    <Fretboard/>
    <ChordsReader/>
  </div>,
  document.getElementById('root')
);
