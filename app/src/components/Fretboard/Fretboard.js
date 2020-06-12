import './Fretboard.scss';
import React, { useState, useEffect } from 'react';
import Chords from '../Chords/Chords';

const Fretboard =  (props) => {

  const { copy, chordDataProp } = props;

  const [chords, setChords] = useState(JSON.parse(localStorage.getItem('chords')) || []);
  
  const [chordData, setChordData] = useState({
    "name": "CHORD",
    "chord": []
  });

  const [fretsCount, setFretsCount] = useState([1, 2, 3, 4]);

  const frets = [0, 1, 2, 3, 4],

        strings = [1, 2, 3, 4, 5, 6],
        stringsNames = ['E', 'A', 'D', 'G', 'B', 'E'];

  useEffect(() => {
    fetch('http://localhost:3000/chords')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setChords(data.results);
      })

    setChordData(chordDataProp)
    console.log(chordData)
    console.log('chordDataProp', chordDataProp);
  }, [chordData, chordDataProp]);

  let setNewChord = (e, chordId) => {
    e.preventDefault();

    chords.map((item) => {
      if (item.id === chordId) {
        setChordData({ ...item, name: item.name })
        console.log(chordData)
      }
      return false
    })
  }

  let addCapo = (fretWrapper) => {
    if (fretWrapper.querySelectorAll('.active').length === 6) {
      fretWrapper.classList.add('capo');
    } else {
      fretWrapper.classList.remove('capo');
    }
  }

  let setCapo = (e, note) => {
    let localChord = chordData;
    strings.map(string => {
      
      localChord.chord.push({
        'string': string,
        'fret': note.fret
      })
      return false
    })

    

    setChordData(localChord);
    
    let stringsEl = e.target.parentElement.querySelectorAll('.dot');
    stringsEl.forEach(function(s) {
      s.classList.add('active');
    }) 
    addCapo(e.target.parentElement);

    console.log(chordData)
  }

  let toggleDot = (e, note) => {

    let idx = getNoteIndexByChord(note, chordData.chord);
    let localChord = chordData;
    if (idx > -1) {
      localChord.chord.splice(idx, 1);
      e.target.classList.remove('active');
    } else {
      localChord.chord.push(note);
      e.target.classList.add('active');
    }
    setChordData(localChord);
    addCapo(e.target.parentElement);

    console.log(chordData)
  }

  let clearChord = () => {
    console.log('clear');
    setChordData({
      "name": "CHORD",
      "chord": []
    })

    console.log(this)


    
  }

  let chordInfoWrapper = (typeValue) => {
    return (
      <div className="chord-info-wrapper">
        {
          stringsNames.map((string, index) => {
            return (
              
              <input className="input-chord chord-info" key={index} defaultValue={ typeValue === 'name' ? string : stringsNames.length - index } />
            )
          })
        }
      </div>
    )
  }

  let handleFretNumber = (e, i) => {
    
    if (i === 0) {
      let first = parseInt(e.target.value);
      first = first > 0 && first < 12 ? first : 1;
      let localFretCount = [];

      for (let i = first; i < first + 4; i++) {
        localFretCount.push(i);
      }
      console.log(localFretCount);
      setFretsCount(localFretCount)
    }
  }

  let fretInfoWrapper = () => {
    return (
      <div className="fret-info-wrapper">
        {
          fretsCount.map((fret, i) => {
            return (
              <div key={i}>
                { i === 0 ? 
                  <input type="number" className="input-fret" key={fret} onChange={(e) => { handleFretNumber(e, i) }} defaultValue={fret} /> : 
                  <span className="input-fret">{fret}</span>
                }
              </div>
            )
          })
        }
      </div> 
    )
  }

  // let isNoteInChord = (note, chord) => chord.find(n => n.string === note.string && n.fret === note.fret);

  let hasCapo = (chord, capo) => {
    let count = chord.filter((n, i) => n.fret === capo).length;
    return count === strings.length;
  }

  let getNoteIndexByChord = (note, chord) => {
    let idx = -1;
    chord.map((n, i) => {
      if (n.string === note.string && n.fret === note.fret) {
        idx = i;
      }
      return false
    })
    return idx
  }

  let fretboard = () => {
    return (
      <div className="fretboard">
        {
          frets.map((fret) => {
            return (
              <div className={`fret fret-${fret} ${hasCapo(chordData.chord, fret+1) ? 'capo' : ''}`} key={fret}>
                {
                  strings.map((string) => {
                    let note = { string: string, fret: fret+1 };
                    let isCurrent = getNoteIndexByChord(note, chordData.chord);
                    return fret < 4 && 
                      <div className={`dot dot-string-${string} ${isCurrent > -1 ? 'active' : ''}`} key={string} onDoubleClick={(e) => {setCapo(e, note)}} onClick={(e) => toggleDot(e, note)}>
                      </div>
                  })
                }
              </div>
            )
          })
        }
        {
          strings.map((string) => {
            return <div className="string" key={string}></div>
          })
        }
      </div>
    )
  }

  let copyFret = (e) => {
    // console.log('copy', chordData)

    copy(chordData)

  }
  let removeFret = (e) => {
    clearChord()
    e.target.closest('.CmpFret').remove();
  }

  
  let handleChordName = (value) => {
    let localChord = chordData;
    localChord.name = value;
    setChordData({ ...chordData, name: value })
  }


  return (
    <div className="CmpFret">
      <div className="main-wrapper">
        <div className="fret-wrapper">
          <input type="text" className={`input-chord chord-name`} value={chordData.name} onChange={(e) => handleChordName(e.target.value)}  />
          { chordInfoWrapper('name') }
          { chordInfoWrapper('count') }
          { fretboard() }
        </div>
        {fretInfoWrapper()} 
      </div>
      <div className="fret-actions">
        <button onClick={(e) => { copyFret(e) }} >Copy</button>
        <button onClick={(e) => { removeFret(e) }}>Remove</button>
        <Chords chords={chords} setChord={setNewChord} />
      </div>
    </div>
  )
}

export default Fretboard;