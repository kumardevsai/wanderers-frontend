import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('WanderersStore')
@observer
export default class Signup extends Component {
  submitForm = e => {
    e.preventDefault();

    this.props.WanderersStore.signup(
      this.nameInput.value,
      this.emailInput.value,
      this.passwordInput.value,
      this.imageInput.files[0]
    );
  };

  render() {
    return (
      <div className="signup_container">
        <h2>Sign Up</h2>

        <form onSubmit={e => this.submitForm(e)}>
          <div className="input-wrapper">
            <label htmlFor="name" className="input-label">
              Name
            </label>
            <input
              innerRef={input => (this.nameInput = input)}
              type="text"
              className="input-field"
              name="name"
              id="name"
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              innerRef={input => (this.emailInput = input)}
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
            <input
              innerRef={input => (this.passwordInput = input)}
              type="password"
              className="password-field"
              name="password"
              id="password"
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="image" className="input-label">
              Image
            </label>
            <input
              innerRef={input => (this.imageInput = input)}
              type="file"
              className="image-field"
              name="image"
              id="image"
              required
            />
          </div>

          <div className="input-container">
            <button type="submit">SAVE</button>
            <button>CANCEL</button>
          </div>
        </form>
      </div>
    );
  }
}
