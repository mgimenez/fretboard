import React, { useState, useEffect } from 'react';
import './App.scss';
import HeaderNav from '../HeaderNav/HeaderNav';
import Fretboard from '../Fretboard/Fretboard';
// import ChordsReader from '../ChordsReader/ChordsReader';


const App = () => {

  const [fretboardList, setFretboardList] = useState([]);

  useEffect(() => {
    setFretboardList(fl => [...fl, <Fretboard af={addFretMark}/>]);
  }, []);

  let addFretMark = (f) => {
    console.log('add f', f)
    setFretboardList(fl => [...fl, f]);
  }
  

  return (
    <div className="container">
      <HeaderNav/>
      <button className="add-fretmark" onClick={() => addFretMark(<Fretboard af={addFretMark} />)}>Add</button>
      { fretboardList.map((fret, index) => <React.Fragment key={index}> {fret} </React.Fragment>) }
      {/* <ChordsReader/> */}
    </div>
  )
}


export default App;