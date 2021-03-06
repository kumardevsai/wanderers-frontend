import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import PageTransition from '../components/PageTransition';

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
export default class Signup extends Component {
  submitForm = async e => {
    e.preventDefault();

    const signupSuccessful = await this.props.WanderersStore.signup(
      this.nameInput.value,
      this.emailInput.value,
      this.passwordInput.value,
      this.imageInput.files[0]
    );

    this.props.UiStore.signupFormErrors = null;

    if (signupSuccessful === true) {
      const urlAfterLogin =
        sessionStorage.getItem('url-after-login') || '/trips/new';
      sessionStorage.removeItem('url-after-login');
      this.props.history.push(urlAfterLogin);
    } else {
      this.props.UiStore.signupFormErrors = signupSuccessful;
    }
  };

  render() {
    return (
      <PageTransition>
        <FormContainer>
          <Form onSubmit={e => this.submitForm(e)}>
            <Heading2>Sign Up</Heading2>

            {this.props.UiStore.signupFormErrors
              ? this.props.UiStore.signupFormErrors.map(error => (
                  <p key={error} className="error">
                    {error}
                  </p>
                ))
              : ''}

            <InputWrapper>
              <Label htmlFor="name" className="inputLabel">
                Name
              </Label>
              <Input
                innerRef={input => (this.nameInput = input)}
                type="text"
                className="inputField"
                name="name"
                id="name"
                required
              />
            </InputWrapper>

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

            <ActionsContainer>
              <Btn type="submit">SAVE</Btn>
              <BtnLink to="/">CANCEL</BtnLink>
            </ActionsContainer>
          </Form>
        </FormContainer>
      </PageTransition>
    );
  }
}
