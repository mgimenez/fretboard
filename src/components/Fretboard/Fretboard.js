import './Fretboard.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Fretboard extends Component {

  constructor() {

    super();

    this.state = {
      chords: {
        'sol': [
          {
            string: 5,
            fret: 2
          }, {
            string: 1,
            fret: 3
          }, {
            string: 6,
            fret: 3
          }
        ]
      }
    }
  }

  toggleDot(e) {
    e.target.classList.toggle('active');
  }

  setChord(chord) {
    chord.map((note) => {
      this.refs[`string-${note.string}-fret-${note.fret}`].classList.add('active');
    });
  }

  componentDidMount() {
    console.log(this.state.chords);
    this.setChord(this.state.chords['sol'])
  }

  render() {
    let frets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        strings = [6, 5, 4, 3, 2, 1];
    return (
        <div className="fretboard">
          {
            frets.map((fret) => {
              return (
                <div className={`fret fret-${fret}`} key={fret}>
                {
                  strings.map((string) => {
                    let note = {string: string, fret: fret};
                    return <div className={`dot dot-string-${string}`} key={string} onClick={(e) => this.toggleDot(e, note)} ref={`string-${string}-fret-${fret}`}></div>
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

}


export default Fretboard;
