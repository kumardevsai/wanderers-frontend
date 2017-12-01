import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Figure, CardImg, Figcaption } from '../elements/figure';

import PopupAction from './PopupAction';

import { observer, inject } from 'mobx-react';

@inject('WanderersStore')
@observer
export default class PopupContent extends Component {
  static propTypes = {
    place: PropTypes.object.isRequired
  };

  render() {
    const place = this.props.place;
    const firstImage = place.place_images[0];

    return (
      <Figure>
        <CardImg
          src={firstImage ? firstImage.card_image : '/noimg.jpg'}
          alt={place.name}
        />
        <hr />
        <Figcaption>{place.name.toUpperCase()}</Figcaption>
        <PopupAction place={place} />
      </Figure>
    );
  }
}
