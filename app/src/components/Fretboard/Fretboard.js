import './Fretboard.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Fretboard extends Component {

  constructor(props) {
    super(props);
  }

  setCapo(fretWrapper) {

    if (fretWrapper.querySelectorAll('.active').length === 6) {
      fretWrapper.classList.add('capo');
    } else {
      fretWrapper.classList.remove('capo');
    }
    

  }

  toggleDot(e) {
    e.target.classList.toggle('active');
    if (e.target.parentElement.querySelectorAll('.active').length === 6) {
      e.target.parentElement.classList.add('capo');
    } else {
      e.target.parentElement.classList.remove('capo');
    }
  }

  componentWillUpdate(nextProp, nextState) {
    this.setChord(nextProp.chord);
  }

  setChord(chord) {
    console.log(chord);
    this.clearChord();
    chord.map((note) => {
      let el = this.refs[`string-${note.string}-fret-${note.fret-1}`];
      let fretWrapper = el.parentElement;
      el.classList.add('active');
      this.setCapo(fretWrapper)
    });
    


  }

  clearChord() {
    let dots = document.querySelectorAll('.dot');
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
  }

  render() {
    let frets = [0, 1, 2, 3, 4],
        fretsCount = [1, 2, 3, 4],
        strings = [1, 2, 3, 4, 5, 6],
        stringsNames = ['E', 'A', 'D', 'G', 'B', 'E'];

    return (
       <div>
          <div className="main-wrapper">
            <div className="fret-wrapper">
              <input type="text" className={`input-chord chord-name`}  />
              <div className="chord-info-wrapper">
                {
                  stringsNames.map((string, index) => {
                    return (
                      <input className="input-chord chord-info" value={string} />
                    )
                  })
                }
              </div>
              <div className="chord-info-wrapper">
                {
                  stringsNames.map((string, index) => {
                    return (
                      <input className="input-chord chord-info" value={index + 1} />
                    )
                  })
                }
              </div>
              <div className="fretboard">
                {
                  frets.map((fret) => {
                    return (
                      <div className={`fret fret-${fret}`} key={fret}>
                        {
                          strings.map((string) => {
                            let note = { string: string, fret: fret };
                            return fret < 4 && <div className={`dot dot-string-${string}`} key={string} onClick={(e) => this.toggleDot(e, note)} ref={`string-${string}-fret-${fret}`}></div>
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
            <div className="fret-info-wrapper">
                {
                  fretsCount.map((fret) => {
                    return <input className="input-fret" value={fret} />
                  })                  
                }
            </div>

    
            
        </div>
      </div>
      )

  }

}


export default Fretboard;