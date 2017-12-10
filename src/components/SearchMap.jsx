import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { SearchContainer, Select } from '../elements/search';
import Geosuggest from 'react-geosuggest';

const types = [
  { key: 'amusement_park', label: 'Amusement Park' },
  { key: 'bowling_alley', label: 'Bowling' },
  { key: 'cafe', label: 'Cafe' },
  { key: 'campground', label: 'Camping' },
  { key: 'gym', label: 'Gym' },
  { key: 'movie_theater', label: 'Movie Theater' },
  { key: 'museum', label: 'Museum' },
  { key: 'night_club', label: 'Night Club' },
  { key: 'park', label: 'Park' },
  { key: 'restaurant', label: 'Restaurant' },
  { key: 'shopping_mall', label: 'Shopping Mall' },
  { key: 'zoo', label: 'Zoo' }
];

@inject('WanderersStore')
@observer
export default class SearchMap extends Component {
  render() {
    const { WanderersStore } = this.props;

    return (
      <SearchContainer>
        <Select innerRef={select => (this.select = select)}>
          <option value="">All</option>
          {types.map(type => (
            <option key={type.key} value={type.key}>
              {type.label}
            </option>
          ))}
        </Select>
        <Geosuggest
          onSuggestSelect={suggest => {
            WanderersStore.searchPlaces(
              suggest.location.lat,
              suggest.location.lng,
              this.select.value
            );
          }}
        />
      </SearchContainer>
    );
  }
}
