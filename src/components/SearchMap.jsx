import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { SearchContainer } from '../elements/search';
import Geosuggest from 'react-geosuggest';

@inject('WanderersStore')
@observer
export default class SearchMap extends Component {
  render() {
    const { WanderersStore } = this.props;

    return (
      <SearchContainer>
        <Geosuggest
          onSuggestSelect={suggest => {
            WanderersStore.searchPlaces(
              suggest.location.lat,
              suggest.location.lng
            );
          }}
        />
      </SearchContainer>
    );
  }
}
