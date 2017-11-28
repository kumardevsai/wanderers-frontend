import styled from 'styled-components';
import { colors, fontSizes, fonts, margin, padding } from './variables';

const ChatForm = styled.form`
  width: 30vw;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-end;
`;

const ChatTextarea = styled.textarea`
  width: 70%;
  padding: 10px;
  align-self: flex-end;
  font-family: ${fonts.body};
  -webkit-box-shadow: 0 0 0 30px white inset;
  font-size: ${fontSizes.small};
  font-family: ${fonts.body};
`;

const ChatBuddyList = styled.ul`
  position: absolute;
  right: 3%;
  padding-top: ${padding.small};
  align-self: flex-end;
`;

const ChatBuddyListItem = styled.li`
  font-family: ${fonts.body};
  font-size: ${fontSizes.small};
`;

export { ChatForm, ChatTextarea, ChatBuddyList, ChatBuddyListItem };
