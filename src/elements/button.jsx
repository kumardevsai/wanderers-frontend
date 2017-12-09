import styled from 'styled-components';
import { colors, fontSizes, fonts, padding, margin } from './variables';
import { Link } from 'react-router-dom';

const Btn = styled.button`
  min-width: 150px;
  text-align: center;
  z-index: 600;
  display: inline-block;
  font-family: ${fonts.body};
  font-size: 16px;
  border-radius: 0px;
  border: 2px solid ${colors.lightPurple};
  padding: ${padding.mini};
  margin: ${margin.ultramini};
  background-color: ${colors.white};
  color: ${colors.black};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: background-color 1s ease;
  ${'' /* position: absolute; */} ${'' /* top: 85vh; */} z-index: 50;

  &:hover {
    cursor: pointer;
    background-color: ${colors.black};
    color: ${colors.white};
    border: 2px solid ${colors.white};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

const BtnLink = styled(Link)`
  min-width: 150px;
  text-align: center;
  z-index: 600;
  display: inline-block;
  font-family: ${fonts.body};
  font-size: 16px;
  border-radius: 0px;
  border: 2px solid ${colors.lightPurple};
  padding: ${padding.mini};
  margin: ${margin.ultramini};
  background-color: ${colors.white};
  color: ${colors.black};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: background-color 1s ease;

  &:hover {
    cursor: pointer;
    background-color: ${colors.black};
    color: ${colors.white};
    border: 2px solid ${colors.white};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

const BlockBtn = styled.button`
  min-width: 150px;
  text-align: center;
  z-index: 600;
  display: block;
  font-family: ${fonts.body};
  font-size: 12px;
  border-radius: 0px;
  border: 2px solid ${colors.lightPurple};
  padding: ${padding.ultramini};
  margin: ${margin.ultramini} auto;
  background-color: ${colors.white};
  color: ${colors.black};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: background-color 1s ease;

  &:hover {
    cursor: pointer;
    background-color: ${colors.black};
    color: ${colors.white};
    border: 2px solid ${colors.white};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

export { Btn, BtnLink, BlockBtn };
