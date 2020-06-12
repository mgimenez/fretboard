import React, { useState } from 'react';
import './App.scss';
import HeaderNav from '../HeaderNav/HeaderNav';
import Fretboard from '../Fretboard/Fretboard';
// import ChordsReader from '../ChordsReader/ChordsReader';


const App = () => {

  const emptyChord = {
    "name": "CHORD",
    "chord": []
  };

  const copyChord = (data) => {
    console.log(data);
    addFretMark(<Fretboard copy={copyChord} chordDataProp={data} emptyChord={emptyChord} />)
  }

  const [fretboardList, setFretboardList] = useState([<Fretboard copy={copyChord} emptyChord={emptyChord} />]);

  const addFretMark = (f) => {
    console.log('add f', f)
    setFretboardList(fl => [...fl, f]);
  }

  return (
    <div className="container">
      <HeaderNav/>
      <button className="add-fretmark" onClick={() => addFretMark(<Fretboard copy={copyChord} emptyChord={emptyChord} />)}>Add</button>
      { fretboardList.map((fret, index) => <React.Fragment key={index}> {fret} </React.Fragment>) }
    </div>
  )
}


export default App;