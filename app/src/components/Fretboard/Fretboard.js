import './Fretboard.scss';
import React, { useState, useEffect } from 'react';
import Chords from '../Chords/Chords';

const Fretboard =  (props) => {

  const { copy, chordDataProp, emptyChord } = props;
  
  const [chordsList, setChordsList] = useState([]);
  const [chordData, setChordData] = useState(chordDataProp ? chordDataProp : emptyChord);
  const chordToString = (chord) => chord.map(item => `string-${item.string}-fret-${item.fret - 1}`).join(' ');
  const [fretsCount, setFretsCount] = useState([1, 2, 3, 4]);
  const [chordClassName, setChordClassName] = useState(chordToString(chordData.chord));
  
  const frets = [0, 1, 2, 3, 4];
  const strings = [1, 2, 3, 4, 5, 6];
  const stringsNames = ['E', 'A', 'D', 'G', 'B', 'E'];

  useEffect(() => {
    fetch('http://localhost:3000/chords')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setChordsList(data.results);
      })

  }, [chordData, chordDataProp]);

  let setNewChord = (e, chordId) => {
    e.preventDefault();

    chordsList.map((item) => {
      if (item.id === chordId) {
        setChordData({ ...item, name: item.name })
        setChordClassName(chordToString(item.chord))
        console.log(chordData)
      }
      return false
    })
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
    setChordClassName(chordToString(localChord.chord))

    console.log(chordData)
  }

  let toggleDot = (e, note) => {

    let idx = getNoteIndexByChord(note, chordData.chord);
    let localChord = chordData;
    if (idx > -1) {
      localChord.chord.splice(idx, 1);
    } else {
      localChord.chord.push(note);
    }
    setChordData(localChord);
    setChordClassName(chordToString(localChord.chord))

    console.log(chordData)
  }

  let clearChord = () => {
    console.log('clear');
    setChordData(emptyChord)
    console.log(chordData)
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
      <div className={`fretboard ${chordClassName}`}>
        {
          frets.map((fret) => {
            return (
              <div className={`fret fret-${fret} ${hasCapo(chordData.chord, fret+1) ? 'capo' : ''}`} key={fret}>
                {
                  strings.map((string) => {
                    let note = { string: string, fret: fret+1 };
                    return fret < 4 && 
                      <div className={`dot dot-string-${string}`} key={string} onDoubleClick={(e) => {setCapo(e, note)}} onClick={(e) => toggleDot(e, note)}>
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
        <Chords chordsList={chordsList} setChord={setNewChord} />
      </div>
    </div>
  )
}

export default Fretboard;