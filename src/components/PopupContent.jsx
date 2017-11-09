import React, { Component } from 'react';
import styled from 'styled-components';

const Figure = styled.figure`
  background-color: #fff;
  border-radius: 3px;
`;

const CardImg = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 200px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: box-shadow 1s ease;

  &:hover {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
`;

const Figcaption = styled.figcaption`
  color: #000;
  text-align: center;
  font-weight: bold;
  color: #69619b;
  margin-top: 20px;
  max-width: 200px;
`;

export default class PopupPlace extends Component {
  render() {
    const place = this.props.place;
    const firstImage = place.place_images[0];

    return (
      <Figure>
        {firstImage ? (
          <CardImg src={firstImage.card_image} alt={place.name} />
        ) : null}
        <hr />
        <Figcaption>{place.name.toUpperCase()}</Figcaption>
      </Figure>
    );
  }
}
