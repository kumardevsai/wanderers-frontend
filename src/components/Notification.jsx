import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import styled from 'styled-components';
import { colors, padding, fonts } from '../elements/variables';

import { Motion, spring } from 'react-motion';

const NotificationDiv = styled.div`
  position: absolute;
  bottom: 50px;
  left: 8vw;
  display: inline-block;
  padding: ${padding.mini};
  background-color: ${colors.blue};
  color: ${colors.white};
  font-family: ${fonts.body};
  z-index: 800;
`;

@inject('WanderersStore')
@observer
export default class Notification extends Component {
  render() {
    const { WanderersStore } = this.props;

    return (
      <div>
        <Motion
          defaultStyle={{ y: 300 }}
          style={{
            y: spring(WanderersStore.showNotification ? 0 : 300, {
              stiffness: 120,
              damping: 20
            })
          }}
        >
          {value => (
            <NotificationDiv
              style={{
                transform: `translateY(${value.y}px)`
              }}
            >
              {WanderersStore.notification}
            </NotificationDiv>
          )}
        </Motion>
      </div>
    );
  }
}
