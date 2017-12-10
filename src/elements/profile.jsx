import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, fontSizes, fonts, padding, margin } from './variables';

const ProfilePage = styled.div`
  overflow: hidden;
  height: 100vh;
  margin-left: 7vw;
  padding: 0px;
  display: flex;

  @media (max-width: 1296px) {
    display: block;
    margin-left: 0px;
    overflow: scroll;
  }
`;

const TripVisualization = styled.section`
  width: 70%;
  background-color: ${colors.white};
  height: 100vh;
  padding: 0px;

  @media (max-width: 1296px) {
    width: 100vw;
  }
`;

const UserTrips = styled.section`
  width: 30%;
  height: 100vh;
  padding: 0px;
  overflow-y: scroll;

  @media (max-width: 1296px) {
    width: 100vw;
  }
`;

const TripsList = styled.ul`
  align-self: flex-end;
  width: 100%;
  padding-top: ${padding.large};
`;

const TripsListItem = styled.li`
  font-family: ${fonts.body};
  padding-bottom: ${padding.mini};
  font-size: ${fontSizes.medium};
  color: ${colors.darkBlue};
  margin-top: ${margin.small}
  text-transform: uppercase;
  text-align: center;
`;

const TripName = styled.p`
  border-bottom: 3px solid ${colors.darkBlue};
  width: 80%;
  height: 50px;
  text-align: center;
  margin: 0 auto;
  margin-top: 25px;
  color: ${colors.violet};
  text-transform: uppercase;
`;

const TripNameVisual = styled.h2`
  color: ${colors.salmon};
  font-family: ${fonts.h1Heading};
  font-weight: bold;
  font-size: ${fontSizes.medium};
  position: absolute;
  bottom: 25px;
  left: 8vw;
  padding: 0px;
  margin: 0px;

  @media (max-width: 1296px) {
    top: 25px;
  }
`;

const TripLink = styled(Link)`
  padding: ${padding.small};
  display: inline-block;
  width: 80%;
  color: ${colors.black};
  transition: background-color 1s ease;

  &:hover {
    background-color: ${colors.darkBlue};
    color: ${colors.white};
  }
`;

const TripIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
    background-color: ${colors.white};
  }
`;

export {
  ProfilePage,
  UserTrips,
  TripVisualization,
  TripsList,
  TripsListItem,
  TripName,
  TripNameVisual,
  TripLink,
  TripIcon
};
