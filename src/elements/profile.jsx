import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, fontSizes, fonts, padding } from './variables';

const ProfilePage = styled.div`
  height: 100vh;
  margin-left: 7vw;
  padding: 0px;
  display: flex;
`;

const TripVisualization = styled.section`
  width: 70%;
  background-color: ${colors.white};
  height: 100vh;
  padding: 0px;
  ${'' /* color: ${colors.white}; */};
`;

const UserTrips = styled.section`
  width: 30%;
  height: 100vh;
  padding: 0px;
`;

const TripsList = styled.ul`
  ${'' /* padding-top: ${padding.small}; */} align-self: flex-end;
  width: 100%;
`;

const TripsListItem = styled.li`
  font-family: ${fonts.body};
  font-size: ${fontSizes.medium};

  text-transform: uppercase;
  text-align: center;
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

const ListItemLine = styled.hr`
  border: 2px solid ${colors.black};
  width: 80%;
`;

export {
  ProfilePage,
  UserTrips,
  TripVisualization,
  TripsList,
  TripsListItem,
  ListItemLine,
  TripLink,
  TripIcon
};
