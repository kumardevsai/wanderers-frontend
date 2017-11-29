import styled from 'styled-components';
import { colors } from './variables';

import { Link } from 'react-router-dom';

const NavStyle = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  width: 7vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: ${colors.lightPurple};
  ${'' /* display: none; */};
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding-left: 10px;
  text-align: left;
  height: 50px;
  color: ${colors.black};
  transition: background-color 1s ease;

  &:hover {
    background-color: ${colors.darkBlue};
  }
`;

export { NavStyle, NavLink };
