import React from 'react';

import { observer, inject } from 'mobx-react';

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
              <div className="msg_user_name">{message.user_id}</div>
              <div className="msg_content">{message.text}</div>
            </div>
          ))}
        </div>

        <section className="messageForm">
          <form
            onSubmit={e => {
              this.submitForm(e);
            }}
          >
            <textarea ref={area => (this.content = area)} />
            <button type="submit">Send</button>
          </form>
        </section>
      </div>
    );
  }
}
