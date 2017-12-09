import styled from 'styled-components';

import { colors, fontSizes, fonts, padding, margin } from './variables';

const SearchContainer = styled.section`
  margin: ${margin.mini};
  z-index: 10;
  position: absolute;
  top: 10px;
  left: 7vw;
`;

const Select = styled.select`
  z-index: 10;
  position: absolute;
  font-size: 0.8rem;
  width: 20vw;
  height: ${padding.medium};
  margin-left: 8vw;
  text-align: left;
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
  padding: ${padding.mini};
  background-color: ${colors.white};
  padding: ${padding.mini};
  font-size: 14px;
  font-family: ${fonts.body};
  color: ${colors.lillac};
  text-transform: uppercase;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  @media (max-width: 1296px) {
    width: 40vw;
  }
`;

export { SearchContainer, Select };
