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
  color: ${colors.gray};
  text-transform: uppercase;
  margin-top: ${margin.small};
  margin-bottom: 10px;
  display: block;
  text-align: left;
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

export {
  FormContainer,
  BuddyFormContainer,
  Form,
  Heading2,
  Label,
  InputWrapper,
  Input,
  ActionsContainer
};
