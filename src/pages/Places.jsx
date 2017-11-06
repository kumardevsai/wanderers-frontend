import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import MapGL from '../components/MapGL';
import SearchMap from '../components/SearchMap';

@inject('WanderersStore')
@observer
export default class Places extends Component {
  render() {
    return (
      <div className="places_page">
        <SearchMap />
        <MapGL />
      </div>
    );
  }
}
