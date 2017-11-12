import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { observer, inject } from 'mobx-react';
import { Input } from '../elements/form';

@inject('WanderersStore')
@observer
export default class NewTrip extends Component {
  submitForm = async e => {
    e.preventDefault();

    const newTrip = await this.props.WanderersStore.createTrip(
      this.nameInput.value
    );
  };

  render() {
    const { WanderersStore } = this.props;

    return (
      <form onSubmit={e => this.submitForm(e)}>
        <div className="input-wrapper">
          <label htmlFor="name" className="input-label">
            Name
          </label>
          <Input
            innerRef={input => (this.nameInput = input)}
            type="text"
            className="input-field"
            name="name"
            id="name"
            required
          />

          <div className="input-container">
            <button type="submit">SUBMIT</button>
            <Link to="/places">CANCEL</Link>
          </div>
        </div>
      </form>
    );
  }
}
