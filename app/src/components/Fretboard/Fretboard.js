import './Fretboard.scss';
import React from 'react';

const Fretboard = () => {

  let addCapo = (fretWrapper) => {
    if (fretWrapper.querySelectorAll('.active').length === 6) {
      fretWrapper.classList.add('capo');
    } else {
      fretWrapper.classList.remove('capo');
    }
  }

  let toggleDot = (e) => {
    e.target.classList.toggle('active');
    addCapo(e.target.parentElement);
  }

  // componentWillUpdate(nextProp, nextState) {
  //   // this.setChord(nextProp.chord);
  // }

  // let setChord = (chord) =>{
  //   // console.log(chord);
  //   clearChord();
  //   chord.map((note) => {
  //     let el = this.refs[`string-${note.string}-fret-${note.fret-1}`];
  //     let fretWrapper = el.parentElement;
  //     el.classList.add('active');
  //     this.setCapo(fretWrapper)
  //   });
    


  // }

  // let clearChord = () => {
  //   console.log('clear');
  //   let dots = document.querySelectorAll('.dot');
  //   for (let i = 0; i < dots.length; i++) {
  //     dots[i].classList.remove('active');
  //   }
  // }

  let frets = [0, 1, 2, 3, 4],
    fretsCount = [1, 2, 3, 4],
    strings = [1, 2, 3, 4, 5, 6],
    stringsNames = ['E', 'A', 'D', 'G', 'B', 'E'];

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

  let fretInfoWrapper = () => {
    return (
      <div className="fret-info-wrapper">
        {
          fretsCount.map((fret) => {
            return <input className="input-fret" key={fret} defaultValue={fret} />
          })
        }
      </div> 
    )
  }

  return (
    <div className="CmpFret">
      <div className="main-wrapper">
        <div className="fret-wrapper">
          <input type="text" className={`input-chord chord-name`} defaultValue="CHORD"  />
          { chordInfoWrapper('name') }
          { chordInfoWrapper('count') }
          <div className="fretboard">
            {
              frets.map((fret) => {
                return (
                  <div className={`fret fret-${fret}`} key={fret}>
                    {
                      strings.map((string) => {
                        let note = { string: string, fret: fret };
                        return fret < 4 && <div className={`dot dot-string-${string}`} key={string} onClick={(e) => toggleDot(e, note)}></div>
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
        </div>
        {fretInfoWrapper()} 
      </div>
    </div>
  )
}


export default Fretboard;