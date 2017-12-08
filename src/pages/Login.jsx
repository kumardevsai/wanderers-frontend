import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import {
  FormContainer,
  Form,
  Heading2,
  Label,
  InputWrapper,
  Input,
  ActionsContainer
} from '../elements/form';
import { Btn, BtnLink } from '../elements/button';

@inject('WanderersStore', 'UiStore')
@observer
export default class Login extends Component {
  submitForm = async e => {
    e.preventDefault();
    this.props.UiStore.loginFormError = null;

    const loginSuccessful = await this.props.WanderersStore.login(
      this.emailInput.value,
      this.passwordInput.value
    );

    if (loginSuccessful) {
      const urlAfterLogin =
        sessionStorage.getItem('url-after-login') || '/trips';
      sessionStorage.removeItem('url-after-login');
      this.props.history.push(urlAfterLogin);
    } else {
      this.props.UiStore.loginFormError =
        'Bummer! There are errors in your submission';
    }
  };

  render() {
    return (
      <FormContainer>
        <Form onSubmit={e => this.submitForm(e)}>
          <Heading2>Login</Heading2>

          {this.props.UiStore.loginFormError ? (
            <p className="error">{this.props.UiStore.loginFormError}</p>
          ) : (
            ''
          )}

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
            <Btn type="submit">LOGIN</Btn>
            <BtnLink to="/">CANCEL</BtnLink>
          </ActionsContainer>
        </Form>
      </FormContainer>
    );
  }
}
