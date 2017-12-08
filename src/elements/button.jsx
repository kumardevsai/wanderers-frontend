import styled from 'styled-components';
import { colors, fontSizes, fonts, padding, margin } from './variables';
import { Link } from 'react-router-dom';

const Btn = styled.button`
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

const BtnLink = styled(Link)`
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

export { Btn, BtnLink };
