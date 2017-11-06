import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import ReactMapGL, { Marker } from 'react-map-gl';
import CityPin from '../components/CityPin';

@inject('WanderersStore')
@observer
export default class MapGL extends Component {
  renderPlaces = () => {
    const { WanderersStore } = this.props;
    return WanderersStore.places.map(place => {
      return (
        <Marker
          key={place.id}
          latitude={parseFloat(place.lat)}
          longitude={parseFloat(place.lon)}
        >
          <CityPin
            onClick={() => {
              console.log('Clicked');
            }}
          />
        </Marker>
      );
    });
  };

  render() {
    const { WanderersStore } = this.props;
    const viewport = WanderersStore.viewport;

    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWFyaWFuc2VybmEiLCJhIjoiY2o0dm8wcGpqMHZ2YzJxcjV0ZDFvbTM5dSJ9.W5BkzLIaUIZcVuiSFbVTsw"
        onViewportChange={viewport => {
          WanderersStore.viewport = viewport;
        }}
        mapStyle="mapbox://styles/marianserna/cj9dl49je6ab72smd6pt33qwh"
      >
        {this.renderPlaces()}
      </ReactMapGL>
    );
  }
}
