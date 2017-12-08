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
      id: PropTypes.number.isRequired,
      completed_at: PropTypes.string,
      completed: PropTypes.bool.isRequired,
      rating: PropTypes.number
    }).isRequired
  };

  uploadImage = e => {
    e.preventDefault();
    this.props.WanderersStore.addImage(
      this.props.trip.id,
      this.imageInput.files[0],
      this.captionInput.value
    );
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
          <Btn>CANCEL</Btn>
        </ActionsContainer>
      </Form>
    );
  }
}
