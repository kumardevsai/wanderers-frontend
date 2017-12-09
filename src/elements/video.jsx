import styled from 'styled-components';
import { colors, fontSizes, fonts, padding, margin } from './variables';

const VideoContainer = styled.div`
  width: 150px;
  z-index: 20;
  position: absolute;
  top: 150px;
  right: 0;
  width: 10vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export { VideoContainer };
