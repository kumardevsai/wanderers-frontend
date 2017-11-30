import styled from 'styled-components';
import { colors, fonts } from './variables';

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

  @media (max-width: 1296px) {
    position: static;
    width: 100%;
    display: flex;
    flex-direction: row;
    z-index: 10;
  }
`;

const NavLink = styled(Link)`
  font-family: ${fonts.body};
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin: 0 auto;
  height: 50px;
  color: ${colors.white};
  transition: background-color 1s ease;

  &:hover {
    background-color: ${colors.pink};
  }

  @media (max-width: 1296px) {
    width: 100%;
    height: 7vh;
    padding-right: 10px;
    flex-direction: row;
  }
`;

const InnerList = styled.ul`
  @media (max-width: 1296px) {
    display: flex;
    width: 70%;
  }
`;

export { NavStyle, NavLink, InnerList };
