import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Input } from '../elements/form';

@inject('WanderersStore')
@observer
export default class Login extends Component {
  submitForm = e => {
    e.preventDefault();

    this.props.WanderersStore.login(
      this.emailInput.value,
      this.passwordInput.value
    );
  };

  render() {
    return (
      <div className="login_container">
        <h2>Login</h2>

        <form onSubmit={e => this.submitForm(e)}>
          <div className="input-wrapper">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <Input
              ref={input => (this.emailInput = input)}
              type="email"
              className="input-field"
              name="email"
              id="email"
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <Input
              ref={input => (this.passwordInput = input)}
              type="password"
              className="input-field"
              name="password"
              id="password"
              required
            />
          </div>

          <div className="input-container">
            <button type="submit">LOGIN</button>
            <button>CANCEL</button>
          </div>
        </form>
      </div>
    );
  }
}
