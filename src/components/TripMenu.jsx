import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import PropTypes from 'prop-types';

import { Menu, MainButton, ChildButton } from 'react-mfb';

@inject('UiStore')
@observer
export default class TripMenu extends Component {
  static propTypes = {
    initTwilioVideo: PropTypes.func.isRequired
  };

  render() {
    const { UiStore } = this.props;

    return (
      <Menu effect="zoomin" method="click" position="br">
        <MainButton iconResting="ion-drag" iconActive="ion-close-round" />

        <ChildButton
          icon="ion-ios-personadd-outline"
          label="Invite Buddy"
          onClick={e => {
            UiStore.showChat = false;
            UiStore.showBuddyForm = true;
          }}
        />

        <ChildButton
          icon="ion-ios-chatboxes-outline"
          label="Chat"
          onClick={e => {
            UiStore.showBuddyForm = false;
            UiStore.showChat = true;
          }}
        />

        <ChildButton
          icon="ion-ios-videocam-outline"
          label="Video Chat"
          onClick={e => {
            UiStore.showChat = false;
            UiStore.showBuddyForm = false;
            this.props.initTwilioVideo();
          }}
        />
      </Menu>
    );
  }
}
