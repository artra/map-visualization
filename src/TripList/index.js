import React from 'react';
import './trip-list.css';

class TripList extends React.Component {

  render() {
    const {tripData: data, onItemEnter, onItemLeave} = this.props;

    return <table className='trip-list'>
      <thead><tr>
        <th>Начало поездки</th>
        <th>Конец поездки</th>
        <th>Продолжительность поездки</th>
        <th>Начальная точка</th>
        <th>Конечная точка</th>
      </tr></thead>
      <tbody>
      {data.map(function(item){
        return <tr className='trip-list__row' key={String(item.bikeid) + String(item.tripduration)} onMouseEnter={onItemEnter.bind(this, item)} onMouseLeave={onItemLeave.bind(this, item)} >
          <td>{item.starttime}</td>
          <td>{item.stoptime}</td>
          <td>{item.tripduration}</td>
          <td>{item['start station latitude']} {item['start station longitude']}</td>
          <td>{item['end station latitude']} {item['end station longitude']}</td>
        </tr>;
      })}
      </tbody>
    </table>;
  }
}

export default TripList;
