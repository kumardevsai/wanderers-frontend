import React, { Component } from 'react';

import styled from 'styled-components';
import { colors } from '../elements/variables';

import { Motion, spring } from 'react-motion';

const MotionDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${colors.salmon};
  transform-origin: right center;
  z-index: 800;
`;

export default class PageTransition extends Component {
  render() {
    return (
      <div>
        <Motion
          defaultStyle={{ x: 1 }}
          style={{ x: spring(0, { stiffness: 120, damping: 20 }) }}
        >
          {value => (
            <MotionDiv
              style={{
                transform: `scaleX(${value.x})`
              }}
            />
          )}
        </Motion>

        {/* Anithing wrapped within PageTransition */}
        {this.props.children}
      </div>
    );
  }
}
