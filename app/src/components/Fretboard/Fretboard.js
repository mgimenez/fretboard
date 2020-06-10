import './Fretboard.scss';
import React from 'react';

class Fretboard extends React.Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    // const { sf } = props;
  };


  addCapo = (fretWrapper) => {
    if (fretWrapper.querySelectorAll('.active').length === 6) {
      fretWrapper.classList.add('capo');
    } else {
      fretWrapper.classList.remove('capo');
    }
  }

  setCapo = (e) => {
    let strings = e.target.parentElement.querySelectorAll('.dot');
    strings.forEach(function(s) {
      s.classList.add('active');
    }) 
    this.addCapo(e.target.parentElement);
  }

  toggleDot = (e) => {
    e.target.classList.toggle('active');
    this.addCapo(e.target.parentElement);
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

  frets = [0, 1, 2, 3, 4];
  fretsCount = [1, 2, 3, 4];
  strings = [1, 2, 3, 4, 5, 6];
  stringsNames = ['E', 'A', 'D', 'G', 'B', 'E'];

  chordInfoWrapper = (typeValue) => {
    return (
      <div className="chord-info-wrapper">
        {
          this.stringsNames.map((string, index) => {
            return (
              
              <input className="input-chord chord-info" key={index} defaultValue={ typeValue === 'name' ? string : this.stringsNames.length - index } />
            )
          })
        }
      </div>
    )
  }

  fretInfoWrapper = () => {
    return (
      <div className="fret-info-wrapper">
        {
          this.fretsCount.map((fret) => {
            return <input className="input-fret" key={fret} defaultValue={fret} />
          })
        }
      </div> 
    )
  }

  fretboard = () => {
    return (
      <div className="fretboard">
        {
          this.frets.map((fret) => {
            return (
              <div className={`fret fret-${fret}`} key={fret}>
                {
                  this.strings.map((string) => {
                    let note = { string: string, fret: fret };
                    return fret < 4 && <div className={`dot dot-string-${string}`} key={string} onDoubleClick={(e) => {this.setCapo(e)}} onClick={(e) => this.toggleDot(e, note)}></div>
                  })
                }
              </div>
            )
          })
        }
        {
          this.strings.map((string) => {
            return <div className="string" key={string}></div>
          })
        }
      </div>
    )
  }

  copyFret = (e) => {
    // console.log('copyFret', e.target.closest(".CmpFret"))
    // let a = e.target.closest(".CmpFret").innerHTML;
    // let a = React.cloneElement(this, {});
    let a = React.createElement(this, {});
    console.log(this);
    // this.props.af(a);
    // React.cloneElement()
    
  }
  removeFret = (e) => {
    console.log('removeFret')
    e.target.closest('.CmpFret').remove();
  }

  render() {
    return (
      <div className="CmpFret" ref={this.myRef}>
        <div className="main-wrapper">
          <div className="fret-wrapper">
            <input type="text" className={`input-chord chord-name`} defaultValue="CHORD"  />
            { this.chordInfoWrapper('name') }
            { this.chordInfoWrapper('count') }
            { this.fretboard() }
          </div>
          {this.fretInfoWrapper()} 
        </div>
        <div className="fret-actions">
          <button onClick={(e) => { this.copyFret(e) }} >Copy</button>
          <button onClick={(e) => { this.removeFret(e) }}>Remove</button>
        </div>
      </div>
    )
  }
}

export default Fretboard;