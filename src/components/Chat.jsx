import React from 'react';

import { observer, inject } from 'mobx-react';

import { ChatForm, ChatTextarea } from '../elements/chat';
import { FilledButton } from '../elements/form';

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
      <div>
        <div className="messages">
          {WanderersStore.messages.map(message => (
            <div className="msg" key={message.id}>
              <div className="msg_user_name">{message.name}</div>
              <div className="msg_content">{message.text}</div>
            </div>
          ))}
        </div>

        <section className="messageForm">
          <ChatForm
            onSubmit={e => {
              this.submitForm(e);
            }}
          >
            <ChatTextarea
              ref={area => (this.content = area)}
              placeholder="YOUR MESSAGE"
            />
            <FilledButton type="submit">SEND</FilledButton>
          </ChatForm>
        </section>
      </div>
    );
  }
}
