import React from 'react';
import './App.css';
import data from './data.js';
// мне не очень хотелось подключать вебсервер, поэтому я завернул данные в модуль и парсю его через papaparse
import Papa from 'papaparse';
import TripList from './TripList';
import TripMap from './TripMap';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: Papa.parse(data, {header: true}).data.slice(0, 50).map(function(item){
        return {...item, isSelected: false};
      })
    };
    this._onItemEnter = this._onItemEnter.bind(this);
    this._onItemLeave = this._onItemLeave.bind(this);
  }

  _updateTripData(changedTrip, isHovered) {
    this.setState(function(state){
        return {
          data: state.data.map(function(trip){
            if (changedTrip === trip) {
              return {
                ...trip,
                isSelected: isHovered
              }
            } else {
              return {...trip};
            }
          })
        };
    });
  }

  _onItemEnter(hoveredTrip){
    this._updateTripData(hoveredTrip, true);
  }
  _onItemLeave(leavedTrip){
    this._updateTripData(leavedTrip, false);
  }

  render() {
    return <div className="app">
      <TripList tripData={this.state.data} onItemEnter={this._onItemEnter} onItemLeave={this._onItemLeave}/>
      <TripMap tripData={this.state.data}/>
    </div>;
  }
}

export default App;
