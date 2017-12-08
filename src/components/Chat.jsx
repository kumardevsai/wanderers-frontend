import React from 'react';

import { observer, inject } from 'mobx-react';

import {
  ChatArea,
  MessagesContainer,
  MessageUserName,
  ChatTextarea
} from '../elements/chat';
import { Btn } from '../elements/button';

@inject('WanderersStore')
@observer
export default class Chat extends React.Component {
  submitForm = e => {
    e.preventDefault();
    // pass content in textarea to sendMessage function
    this.props.WanderersStore.sendMessage(this.content.value);
    e.target.reset();
  };

  render() {
    const { WanderersStore } = this.props;
    return (
      <ChatArea>
        <MessagesContainer>
          {WanderersStore.messages.map(message => (
            <div className="msg" key={message.id}>
              <MessageUserName>{message.name}</MessageUserName>
              <div className="msg_content">{message.text}</div>
            </div>
          ))}
        </MessagesContainer>

        <section className="messageForm">
          <form
            onSubmit={e => {
              this.submitForm(e);
            }}
          >
            <ChatTextarea
              innerRef={area => (this.content = area)}
              placeholder="YOUR MESSAGE"
            />
            <Btn type="submit">SEND</Btn>
          </form>
        </section>
      </ChatArea>
    );
  }
}
