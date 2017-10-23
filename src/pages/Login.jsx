import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import styles from './Login.css';

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
      <div className={styles.login_container}>
        <h2>Login</h2>

        <form onSubmit={e => this.submitForm(e)}>
          <div className={styles.input_wrapper}>
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              ref={input => (this.emailInput = input)}
              type="email"
              className="input-field"
              name="email"
              id="email"
              required
            />
          </div>

          <div className={styles.input_wrapper}>
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              ref={input => (this.passwordInput = input)}
              type="password"
              className="input-field"
              name="password"
              id="password"
              required
            />
          </div>

          <div className={styles.input_wrapper}>
            <button type="submit">LOGIN</button>
            <button>CANCEL</button>
          </div>
        </form>
      </div>
    );
  }
}
