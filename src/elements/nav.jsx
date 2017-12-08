import styled from 'styled-components';
import { colors, fonts, padding, margin } from './variables';

import { Link } from 'react-router-dom';

const NavWrapper = styled.div`
  z-index: 500;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: ${colors.lightPurple};
  width: 7vw;

  @media (max-width: 1296px) {
    width: 100%;
    height: 10vh;
    position: absolute;
    top: 90vh;
  }
`;

const Navigation = styled.nav`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const List = styled.ul`
  width: 100%;
  height: 33.3%;
  flex-grow: 1;

  @media (max-width: 1296px) {
    height: 100%;
    flex-direction: row;
  }
`;

const ListItem = styled.li`
  @media (max-width: 1296px) {
    display: inline-block;
    padding-top: 20px;
    width: 20%;
    text-align: center;
  }
`;

const NavLink = styled(Link)`
  color: ${colors.white};
  font-family: ${fonts.nav};
  display: flex;
  padding: ${padding.mini};
  margin-top: ${margin.mini};
  height: 33.33%;
  width: 100%;
  font-weight: bold;
  transition: background-color 1s ease;

  &:hover {
    color: ${colors.white};
  }

  &:before {
    position: absolute;
    margin-top: 40px;
    left: -10%;
    width: 0px;
    display: block;
    content: '';
    height: 3px;
    background: ${colors.darkBlue};
    transition: width 0.5s ease;
  }

  &:hover:before {
    width: 110%;
  }

  @media (max-width: 1296px) {
    margin-top: 0px;
  }
`;

export { NavWrapper, Navigation, List, ListItem, NavLink };
