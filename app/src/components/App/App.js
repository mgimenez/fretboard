import React, { useState, useEffect } from 'react';
import './App.scss';
import HeaderNav from '../HeaderNav/HeaderNav';
import Fretboard from '../Fretboard/Fretboard';
// import ChordsReader from '../ChordsReader/ChordsReader';


const App = () => {

  const [fretboardList, setFretboardList] = useState([]);
  const [chordd, setChordd] = useState({
    "name": "CHORD",
    "chord": []
  });

  useEffect(() => {
    setFretboardList(fl => [...fl, <Fretboard af={addFretMark} copy={copyChord} chordd={chordd}/>]);
  }, []);

  let addFretMark = (f) => {
    console.log('add f', f)
    setFretboardList(fl => [...fl, f]);
  }

  let copyChord = (data) => {
    console.log(data);
    // setChordd(data);
    addFretMark(<Fretboard af={addFretMark} copy={copyChord} chordd={data} />)
  }
  

  return (
    <div className="container">
      <HeaderNav/>
      <button className="add-fretmark" onClick={() => addFretMark(<Fretboard af={addFretMark} copy={copyChord} chordd={chordd} />)}>Add</button>
      { fretboardList.map((fret, index) => <React.Fragment key={index}> {fret} </React.Fragment>) }
      {/* <ChordsReader/> */}
    </div>
  )
}


export default App;