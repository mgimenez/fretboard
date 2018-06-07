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

  render() {
    return (
      <div className="container">
        <HeaderNav/>
        <Fretboard chords={this.state.chords} chord={this.state.chord} />
        <Chords chords={this.state.chords} setChord={this.setChord} />
        <ChordsReader/>
      </div>
    )
  }
}


export default App;