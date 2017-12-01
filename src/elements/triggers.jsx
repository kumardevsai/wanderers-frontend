import styled from 'styled-components';
import { colors, fontSizes, fonts, padding, margin } from './variables';

const TriggerChat = styled.button`
  position: absolute;
  bottom: 5px;
  right: 30px;
  z-index: 5;
  display: inline-block !important;
`;

const TriggerBuddy = styled.button`
  position: absolute;
  bottom: 5px;
  left: calc(7vw + 30px);
  z-index: 5;
  display: inline-block !important;
`;

export { TriggerChat, TriggerBuddy };
