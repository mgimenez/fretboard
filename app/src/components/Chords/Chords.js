import './Chords.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Chords extends Component {

  render() {
      return (
        <div className="chords-list">
          {
            this.props.chords.map((item) => {

              return <a className="chord" href="#" key={item.id} onClick={(e) => this.props.setChord(e, item.id)}>{item.name}</a>
            })
          }
        </div>
      )
  }

}


export default Chords;