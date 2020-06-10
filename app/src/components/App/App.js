// import React, {Component} from 'react';
import React, { useState, useEffect } from 'react';
import './App.scss';
// import ReactDOM from 'react-dom';
import HeaderNav from '../HeaderNav/HeaderNav';
import Fretboard from '../Fretboard/Fretboard';
// import ChordsReader from '../ChordsReader/ChordsReader';
// import Chords from '../Chords/Chords';

const App = () => {

  // const [chords, setChords] = useState(JSON.parse(localStorage.getItem('chords')) || []);
  const [fretboardList, setFretboardList] = useState([]);
  // const [chord, setChord] = useState([]);

  useEffect(() => {
    addFretMark(Fretboard);
        // <Fretboard  />
  //   fetch('http://localhost:3000/chords')
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((data) => {
  //       setChords(data.results);
  //     })
  }, []);

  // let setNewChord = (e, chordId) => {
  //   e.preventDefault();

  //   chords.map((item) => {
  //     if (item.id === chordId) {
  //       setChord(item.chord)
  //     }
  //   })
  // }

  let addFretMark = (f) => {
    
    console.log('add',typeof(f));
    setFretboardList(fl => [...fl, React.createElement(f, {af: addFretMark})]);
  }
  

  return (
    <div className="container">
      <HeaderNav/>
      <button className="add-fretmark" onClick={() => addFretMark(Fretboard)}>Add</button>
      { fretboardList.map((fret, index) => <React.Fragment key={index}> {fret} </React.Fragment>) }
      {/* <Chords chords={this.state.chords} setChord={this.setNewChord} /> */}
      {/* <ChordsReader/> */}
    </div>
  )
}


export default App;