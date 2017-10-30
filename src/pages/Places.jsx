import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactMapGL from 'react-map-gl';

@inject('WanderersStore')
@observer
export default class Places extends Component {
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
      />
    );
  }
}
