import './Chords.scss';
import React, {Component} from 'react';

class Chords extends Component {

  render() {
      return (
        <div className="chords-list">
          {
            this.props.chordsList.map((item) => {

              return <a className="chord" href="http://" key={item.id} onClick={(e) => this.props.setChord(e, item.id)}>{item.name}</a>
            })
          }
        </div>
      )
  }

}


export default Chords;