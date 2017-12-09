import React, { Component } from 'react';

import { HomeContainer, InnerContainer, Heading1 } from '../elements/home';
import HomeScene from '../HomeScene';
import PageTransition from '../components/PageTransition';

import { TimelineMax } from 'gsap';

export default class Home extends Component {
  componentDidMount() {
    this.HomeScene = new HomeScene(this.container);
    setTimeout(() => {
      this.animateHeading();
    }, 1000);
  }

  animateHeading = () => {
    const tl = new TimelineMax({ delay: 0.2 });
    tl.fromTo(this.h1, 1, { y: '-200%', opacity: 0 }, { y: '0%', opacity: 1 });
  };

  render() {
    return (
      <PageTransition>
        <HomeContainer>
          <InnerContainer innerRef={container => (this.container = container)}>
            <Heading1 innerRef={h1 => (this.h1 = h1)} style={{ opacity: 0 }}>
              WANDERERS
            </Heading1>
          </InnerContainer>
        </HomeContainer>
      </PageTransition>
    );
  }
}
