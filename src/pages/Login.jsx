import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import {
  FormContainer,
  Form,
  Heading2,
  Label,
  InputWrapper,
  Input,
  ActionsContainer,
  Action
} from '../elements/form';

@inject('WanderersStore')
@observer
export default class Login extends Component {
  submitForm = async e => {
    e.preventDefault();

    const response = await this.props.WanderersStore.login(
      this.emailInput.value,
      this.passwordInput.value
    );

    const urlAfterLogin =
      sessionStorage.getItem('url-after-login') || '/places';
    sessionStorage.removeItem('url-after-login');
    this.props.history.push(urlAfterLogin);
  };

  render() {
    return (
      <FormContainer>
        <Form onSubmit={e => this.submitForm(e)}>
          <Heading2>Login</Heading2>

          <InputWrapper>
            <Label htmlFor="email" className="inputLabel">
              Email
            </Label>
            <Input
              innerRef={input => (this.emailInput = input)}
              type="email"
              className="inputField"
              name="email"
              id="email"
              required
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="password" className="inputLabel">
              Password
            </Label>
            <Input
              innerRef={input => (this.passwordInput = input)}
              type="password"
              className="inputField"
              name="password"
              id="password"
              required
            />
          </InputWrapper>

          <ActionsContainer>
            <Action type="submit">LOGIN</Action>
            <Action>CANCEL</Action>
          </ActionsContainer>
        </Form>
      </FormContainer>
    );
  }
}
