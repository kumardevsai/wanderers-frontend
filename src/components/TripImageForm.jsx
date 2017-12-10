import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import PropTypes from 'prop-types';

import {
  Form,
  Label,
  InputWrapper,
  Input,
  ActionsContainer
} from '../elements/form';
import { Btn } from '../elements/button';

@inject('WanderersStore')
@observer
export default class TripImageForm extends Component {
  static propTypes = {
    trip: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      completed_at: PropTypes.string,
      completed: PropTypes.bool.isRequired,
      rating: PropTypes.number
    }).isRequired
  };

  uploadImage = e => {
    e.preventDefault();
    this.props.WanderersStore.addTripImage(
      this.props.trip.uuid,
      this.imageInput.files[0],
      this.captionInput.value
    );

    e.target.reset();
  };

  render() {
    return (
      <Form onSubmit={e => this.uploadImage(e)}>
        <InputWrapper>
          <Label htmlFor="image" className="inputLabel">
            Image
          </Label>
          <Input
            innerRef={input => (this.imageInput = input)}
            type="file"
            className="inputField"
            name="image"
            id="image"
            required
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="caption" className="inputLabel">
            Caption
          </Label>
          <Input
            innerRef={input => (this.captionInput = input)}
            type="text"
            className="inputField"
            name="caption"
            id="caption"
            required
          />
        </InputWrapper>

        <ActionsContainer>
          <Btn type="submit">UPLOAD</Btn>
        </ActionsContainer>
      </Form>
    );
  }
}
