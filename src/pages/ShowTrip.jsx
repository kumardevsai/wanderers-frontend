import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { ChatBuddyList, ChatBuddyListItem } from '../elements/chat';

import MapGL from '../components/MapGL';
import BuddyForm from '../components/BuddyForm';
import SearchMap from '../components/SearchMap';
import Chat from '../components/Chat';

import Peer from 'peerjs';

@inject('WanderersStore', 'UiStore')
@observer
export default class ShowTrip extends Component {
  constructor(props) {
    super(props);

    this.peer = new Peer(this.props.WanderersStore.user.id, {
      key: 'rfgj72lpk6fg8pvi'
    });

    this.call = null;
  }

  componentDidMount() {
    // person who receives call
    this.peer.on('call', call => {
      this.call = call;
      this.props.UiStore.showAnswerCall = true;
    });
  }

  answerCall = e => {
    e.preventDefault();

    this.props.UiStore.callInProgress = true;
    this.props.UiStore.showAnswerCall = false;

    navigator.getUserMedia(
      { video: true, audio: true },
      stream => {
        this.stream = stream;
        this.localVideo.srcObject = stream;
        this.call.answer(stream);

        // Answer the call with an A/V stream.
        this.call.on('stream', remoteStream => {
          this.remoteVideo.srcObject = remoteStream;
        });
      },
      function(err) {
        console.log('Failed to get local stream', err);
      }
    );
  };

  stopCall = e => {
    e.preventDefault();

    this.call.close();

    this.localVideo.srcObject = null;
    this.props.UiStore.callInProgress = false;

    this.stream.getTracks().forEach(track => {
      track.stop();
    });
  };

  startChat = (e, userId) => {
    e.preventDefault();

    // person who calls
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    navigator.getUserMedia(
      { video: true, audio: true },
      stream => {
        this.call = this.peer.call(userId, stream);
        this.stream = stream;
        this.localVideo.srcObject = stream;
        this.props.UiStore.callInProgress = true;

        this.call.on('stream', remoteStream => {
          this.remoteVideo.srcObject = remoteStream;
        });
      },
      err => {
        console.log('Failed to get local stream', err);
      }
    );
  };

  render() {
    const { WanderersStore } = this.props;
    const trip = WanderersStore.trip;

    if (!trip) {
      return 'Loading';
    }

    return (
      <div>
        <ChatBuddyList>
          {WanderersStore.buddies.map(buddy => (
            <ChatBuddyListItem key={buddy.id}>
              <p>{buddy.name} </p>
              <img
                src="/videoChat.svg"
                className="videoIcon"
                alt="chat icon"
                onClick={e => this.startChat(e, buddy.user_id)}
              />
            </ChatBuddyListItem>
          ))}
        </ChatBuddyList>
        <SearchMap />
        <BuddyForm />
        {this.props.UiStore.showAnswerCall ? (
          <button onClick={e => this.answerCall(e)}>Answer Call</button>
        ) : (
          ''
        )}
        <div
          className="videoWrapper"
          style={{
            display: this.props.UiStore.callInProgress ? 'block' : 'none'
          }}
        >
          <button onClick={e => this.stopCall(e)}>Hang up</button>
          <video
            ref={video => {
              this.localVideo = video;
            }}
            autoPlay
            muted
          />
          <video
            ref={video => {
              this.remoteVideo = video;
            }}
            autoPlay
          />
        </div>
        <Chat />
        <MapGL />
      </div>
    );
  }
}
