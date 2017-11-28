import styled from 'styled-components';
import { colors } from './variables';

const HomeContainer = styled.div`
  height: 100vh;
  margin-left: 7vw;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 90%;
  height: 90%;
  border: 4px solid ${colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { HomeContainer, InnerContainer };
