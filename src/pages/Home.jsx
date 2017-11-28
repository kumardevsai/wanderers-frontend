import React, { Component } from 'react';

import { HomeContainer, InnerContainer } from '../elements/home';

export default class Home extends Component {
  render() {
    return (
      <HomeContainer>
        <InnerContainer>
          <h1>WANDERERS</h1>
        </InnerContainer>
      </HomeContainer>
    );
  }
}
