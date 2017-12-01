import styled from 'styled-components';
import { colors, fontSizes, fonts, margin, padding } from './variables';

const FormContainer = styled.div`
  height: 100vh;
  margin-left: 7vw;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1296px) {
    margin-left: 0px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BuddyFormContainer = styled.div`
  padding: 20px;
  width: 30%;
  position: absolute;
  top: 75%;
  z-index: 15;
  background-color: ${colors.lightGrey};
  color: ${colors.white};
`;

const Heading2 = styled.h2`
  margin: ${margin.medium} 0;
  font-size: 30px;
  color: ${colors.white};
  text-align: center;
  font-family: ${fonts.headings};

  @media (max-width: 1296px) {
    margin-top: 0px;
  }
`;

const Label = styled.label`
  font-size: ${fontSizes.small};
  font-family: ${fonts.body};
  text-decoration: underline;
  color: ${colors.gray};
  text-transform: uppercase;
  margin-bottom: ${margin.mini};
  display: block;
`;

const InputWrapper = styled.div`
  width: 50%;

  @media (max-width: 1296px) {
    width: 80%;
  }
`;

const Input = styled.input`
  border: none;
  font-family: ${fonts.body};
  font-size: ${fontSizes.small};
  margin-bottom: ${margin.small};
  width: 100%;
  padding: 10px;

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
    background-color: ${colors.white} !important;
    font-family: ${fonts.body};
  }

  &:focus {
    outline: ${colors.white};
  }
`;

const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: space-between;
`;

const Action = styled.button`
  font-family: ${fonts.body};
  border-radius: 0px;
  border: 1px solid ${colors.white};
  padding: ${padding.mini};
  margin: ${margin.mini};
  width: 10rem;
  background-color: transparent;
  color: ${colors.gray};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: background-color 1s ease;

  &:hover {
    cursor: pointer;
    background-color: ${colors.black};
    color: ${colors.white};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

const LinkButton = styled(Action)``;

const FilledButton = styled(Action)`
  margin-right: 0px;
  background-color: ${colors.black};
  color: ${colors.white};
  align-self: flex-end;
  transition: background-color 1s ease;

  &:hover {
    cursor: pointer;
    background-color: ${colors.white};
    color: ${colors.black};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

export {
  FormContainer,
  BuddyFormContainer,
  Form,
  Heading2,
  Label,
  InputWrapper,
  Input,
  ActionsContainer,
  Action,
  LinkButton,
  FilledButton
};
