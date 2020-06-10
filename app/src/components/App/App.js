import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import HeaderNav from '../HeaderNav/HeaderNav';
import Fretboard from '../Fretboard/Fretboard';
import ChordsReader from '../ChordsReader/ChordsReader';
import Chords from '../Chords/Chords';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      chords: JSON.parse(localStorage.getItem('chords')) || [],
      fretboardList: [],
      chord: []
    }

    this.setChord = this.setChord.bind(this);
  }

  componentWillMount() {

    fetch('http://localhost:3000/chords')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({ chords: data.results })
      })
  }

  setChord(e, chordId) {
    e.preventDefault();
    this.state.chords.map((item) => {
      if (item.id === chordId) {
        this.setState({
          chord: item.chord
        })
      }
    })
  }

  addFretMark(f) {
    // console.log(this.state.fretboardList);
    let fl = this.state.fretboardList;
    fl.push(f);
    this.setState({
      fretboardList: fl
    })
  }
  

  render() {
    return (
      <div className="container">
        <HeaderNav/>
        <button className="add-fretmark" onClick={() => this.addFretMark(<Fretboard chords={this.state.chords} chord={this.state.chord}/>)}>Add</button>
        <Fretboard chords={this.state.chords} chord={this.state.chord} />
        {this.state.fretboardList}
        <Chords chords={this.state.chords} setChord={this.setChord} />
        <ChordsReader/>
      </div>
    )
  }
}


export default App;