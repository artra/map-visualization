import React from 'react';
import './trip-map.css';
import { Map, TileLayer, Marker, Tooltip} from 'react-leaflet';
import L from 'leaflet';

class TripMap extends React.Component {
  _increaseMarkSize(trip, icon) {
      // это точно работает не до конца верно, если я правильно понимаю, то при изменении размера, еще нужно смещать координаты маркера
      return [icon.options.iconSize[0] * (1 + Number(trip.tripduration) / 1000), icon.options.iconSize[1] * (1 + Number(trip.tripduration) / 1000)];
  }
  render() {
    const data = this.props.tripData;
    return <div className='trip-map'><Map center={[data[0]['start station latitude'], data[0]['start station longitude']]} zoom="13">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <>
          {data.map(function(trip){
            let zIndexOffset = 0;
            let opacity = 0.5;

            let icon = new L.Icon.Default();

            if (trip.isSelected) {
                // не очень хотелось искать отдельную картинку для выделенной иконки, поэтому я просто меняю opacity здесь и filter в css
                icon = new L.Icon.Default({className: 'trip-map__icon-hovered', iconSize: this._increaseMarkSize(trip, icon)});
                opacity = 1;
                zIndexOffset = 1000;
            }

            // почему-то permanent не работает так, как я думаю что он должен работать, тултипы динамически фиксировать не удалось
            return <>
              <Marker position={[trip['start station latitude'], trip['start station longitude']]} zIndexOffset={zIndexOffset} icon={icon} opacity={opacity}>
                <Tooltip permanent={trip.isSelected}>{trip['start station name']}</Tooltip>
              </Marker>
              <Marker position={[trip['end station latitude'], trip['end station longitude']]} zIndexOffset={zIndexOffset} icon={icon} opacity={opacity}>
                <Tooltip permanent={trip.isSelected}>{trip['end station name']}</Tooltip>
              </Marker>
            </>
          }, this)}
        </>
    </Map></div>;
  }
}

export default TripMap;
