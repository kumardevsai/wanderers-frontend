import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Input } from '../elements/form';

@inject('WanderersStore')
@observer
export default class BuddyForm extends Component {
  submitForm = e => {
    e.preventDefault();
    this.props.WanderersStore.sendInvitation(this.emailInput.value);
    e.target.reset();
  };

  render() {
    return (
      <div className="buddy_form_container">
        <form onSubmit={e => this.submitForm(e)}>
          <div className="input-wrapper">
            <label htmlFor="email" className="input-label">
              Invite a Friend
            </label>
            <Input
              innerRef={input => (this.emailInput = input)}
              type="email"
              className="input-field"
              name="email"
              id="email"
              placeholder="email"
              required
            />
          </div>

          <div className="input-container">
            <button type="submit">SEND</button>
            <button>CANCEL</button>
          </div>
        </form>
      </div>
    );
  }
}
