import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import MapGL from '../components/MapGL';
import BuddyForm from '../components/BuddyForm';
import SearchMap from '../components/SearchMap';
import Chat from '../components/Chat';

import { ChatBuddyList, ChatBuddyListItem } from '../elements/chat';
import { VideoContainer } from '../elements/video';
import { Btn, BlockBtn } from '../elements/button';

import Video from 'twilio-video';
import TripMenu from '../components/TripMenu';
import PageTransition from '../components/PageTransition';

@inject('WanderersStore', 'UiStore')
@observer
export default class ShowTrip extends Component {
  componentWillMount() {
    const tripId = this.props.match.params.id;
    this.props.WanderersStore.loadTrip(tripId);
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.UiStore.showBuddyForm = false;
        this.props.UiStore.showChat = false;
      }
    });
  }

  newParticipant = participant => {
    const participantContainer = document.createElement('div');
    participantContainer.id = participant.sid;
    participantContainer.className = 'participantContainer';

    participant.tracks.forEach(track => {
      participantContainer.appendChild(track.attach());
    });
    participant.on('trackAdded', track => {
      participantContainer.appendChild(track.attach());
    });

    const participantName = document.createElement('p');
    participantName.innerText = `${participant.identity} 🎬`;

    participantContainer.appendChild(participantName);
    this.container.prepend(participantContainer);
  };

  initTwilioVideo = () => {
    // https://www.twilio.com/docs/api/video/javascript-v1-getting-started#2-get-an-api-key
    Video.connect(this.props.WanderersStore.videoToken, {
      name: this.props.WanderersStore.trip.uuid
    }).then(
      room => {
        this.room = room;
        this.props.UiStore.callInProgress = true;

        console.log('Successfully joined a Room: ', room);
        // people who were in the roon before you join
        room.participants.forEach(participant => {
          this.newParticipant(participant);
        });
        // when new participant joins
        room.on('participantConnected', participant => {
          this.newParticipant(participant);
        });
        // yourself
        this.newParticipant(room.localParticipant);

        room.on('participantDisconnected', participant => {
          participant.tracks.forEach(track => {
            track.detach().forEach(element => {
              element.remove();
            });
          });

          const participantContainer = document.getElementById(participant.sid);
          participantContainer.remove();
        });
      },
      error => {
        console.error('Unable to connect to Room: ' + error.message);
      }
    );
  };

  // https://github.com/twilio/video-quickstart-js/blob/master/examples/codecpreferences/src/index.js
  stopCall = e => {
    e.preventDefault();

    this.room.disconnect();
    this.room = null;
    this.props.UiStore.callInProgress = false;
  };

  render() {
    const { WanderersStore, UiStore } = this.props;
    const trip = WanderersStore.trip;

    if (!trip) {
      return '🤘';
    }

    return (
      <PageTransition>
        <div>
          <MapGL />
          <TripMenu initTwilioVideo={this.initTwilioVideo} />

          <ChatBuddyList>
            {WanderersStore.buddies.map(buddy => (
              <ChatBuddyListItem key={buddy.id}>
                <p>{buddy.name} </p>
              </ChatBuddyListItem>
            ))}
          </ChatBuddyList>
          <SearchMap />

          {UiStore.showBuddyForm && <BuddyForm />}

          <VideoContainer
            style={{
              display: this.props.UiStore.callInProgress ? 'block' : 'none'
            }}
            innerRef={container => (this.container = container)}
          >
            <BlockBtn onClick={e => this.stopCall(e)}>Hang up</BlockBtn>
          </VideoContainer>

          {UiStore.showChat && <Chat />}
        </div>
      </PageTransition>
    );
  }
}
