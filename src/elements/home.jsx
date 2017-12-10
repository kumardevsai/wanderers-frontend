import styled from 'styled-components';
import { colors, fonts } from './variables';

const HomeContainer = styled.div`
  height: 100vh;
  margin-left: 7vw;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1296px) {
    height: 97vh;
    margin-left: 0px;
    z-index: -1;
  }
`;

const InnerContainer = styled.div`
  width: 90%;
  height: 90%;
  border: 4px solid ${colors.offwhite};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 1296px) {
    width: 90%;
    height: 80%;
  }
`;

const Heading1 = styled.h1`
  font-size: 9rem;
  font-family: ${fonts.h1Heading};
  padding: $spacing-small;
  ${'' /* color: ${colors.offwhite}; */} text-shadow: 3px 3px ${colors.black};
  position: absolute;
  margin: 0 auto;
  color: ${colors.violet};

  @media (max-width: 1296px) {
    font-size: 4rem;
  }
`;

export { HomeContainer, InnerContainer, Heading1 };
