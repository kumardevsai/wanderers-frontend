import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

import MapGL from '../components/MapGL';
import BuddyForm from '../components/BuddyForm';
import SearchMap from '../components/SearchMap';
import Chat from '../components/Chat';

import { ChatBuddyList, ChatBuddyListItem } from '../elements/chat';
import { VideoContainer, VideoTag, VideoBtn } from '../elements/video';
import { TriggerChat, TriggerBuddy } from '../elements/triggers';

@inject('WanderersStore', 'UiStore')
@observer
export default class ShowTrip extends Component {
  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.UiStore.showBuddyForm = false;
        this.props.UiStore.showChat = false;
      }
    });
  }

  render() {
    const { WanderersStore, UiStore } = this.props;
    const trip = WanderersStore.trip;

    if (!trip) {
      return '🤘';
    }

    return (
      <div>
        <ChatBuddyList>
          {WanderersStore.buddies.map(buddy => (
            <ChatBuddyListItem key={buddy.id}>
              <p>{buddy.name} </p>
              {false &&
              enablePeer &&
              buddy.user_id !== WanderersStore.user.id ? (
                <img
                  src="/videoChat.svg"
                  className="videoIcon"
                  alt="chat icon"
                  onClick={e => this.startChat(e, buddy.user_id)}
                />
              ) : (
                ''
              )}
            </ChatBuddyListItem>
          ))}
        </ChatBuddyList>
        <SearchMap />
        {UiStore.showBuddyForm ? (
          <BuddyForm />
        ) : (
          <TriggerBuddy
            className="btn"
            onClick={e => {
              e.preventDefault();
              UiStore.showBuddyForm = true;
            }}
          >
            INVITE BUDDY
          </TriggerBuddy>
        )}

        <VideoContainer
          style={{
            display:
              this.props.UiStore.callInProgress ||
              this.props.UiStore.showAnswerCall
                ? 'block'
                : 'none'
          }}
        >
          <VideoBtn onClick={e => this.stopCall(e)}>Hang up</VideoBtn>
        </VideoContainer>

        {UiStore.showChat ? (
          <Chat />
        ) : (
          <TriggerChat
            className="btn"
            onClick={e => {
              e.preventDefault();
              UiStore.showChat = true;
            }}
          >
            CHAT
          </TriggerChat>
        )}

        <MapGL />
      </div>
    );
  }
}
