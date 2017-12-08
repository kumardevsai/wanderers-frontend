import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import {
  FormContainer,
  Heading2,
  Form,
  InputWrapper,
  Label,
  Input,
  ActionsContainer
} from '../elements/form';
import { Btn } from '../elements/button';

@inject('WanderersStore')
@observer
export default class NewTrip extends Component {
  submitForm = async e => {
    e.preventDefault();

    const newTrip = await this.props.WanderersStore.createTrip(
      this.nameInput.value
    );
    //  redirect when you get the trip
    this.props.history.push(`/trips/${newTrip.id}`);
  };

  render() {
    const { WanderersStore } = this.props;

    return (
      <FormContainer>
        <Form onSubmit={e => this.submitForm(e)}>
          <Heading2>New Trip</Heading2>
          <InputWrapper>
            <Label htmlFor="name" className="input-label">
              New Trip Name
            </Label>
            <Input
              innerRef={input => (this.nameInput = input)}
              type="text"
              className="input-field"
              name="name"
              id="name"
              placeholder="Name"
              required
            />

            <ActionsContainer>
              <Btn type="submit">SUBMIT</Btn>
              <Btn to="/places">CANCEL</Btn>
            </ActionsContainer>
          </InputWrapper>
        </Form>
      </FormContainer>
    );
  }
}
