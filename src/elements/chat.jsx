import styled from 'styled-components';
import { colors, fontSizes, fonts, padding, margin } from './variables';

const ChatArea = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  bottom: 0px;
  left: 7vw;
  padding-bottom: ${padding.small};
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
  background-color: ${colors.lightGrey};
  padding: 20px;
`;

const MessagesContainer = styled.div`
  background-color: ${colors.white};
  margin-bottom: ${margin.mini};
  padding: ${margin.mini};
  font-family: ${fonts.body};
  color: ${colors.pink};
  max-height: 30vh;
  overflow-y: scroll;
`;

const MessageUserName = styled.div`
  background-color: ${colors.blue};
  color: ${colors.offwhite};
  width: 100%;
  padding: ${padding.ultramini};
  margin-bottom: ${padding.ultramini};
`;

const ChatTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  align-self: flex-end;
  font-family: ${fonts.body};
  -webkit-box-shadow: 0 0 0 30px white inset;
  font-size: ${fontSizes.small};
  font-family: ${fonts.body};
  border: none;
`;

const ChatBuddyList = styled.ul`
  position: absolute;
  top: 0;
  right: 3%;
  padding-top: ${padding.small};
  align-self: flex-end;
  display: flex;
  z-index: 6;

  @media (max-width: 1196px) {
    display: none;
  }
`;

const ChatBuddyListItem = styled.li`
  font-family: ${fonts.body};
  font-size: ${fontSizes.small};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.pink};
  font-weight: bold;
  padding: ${padding.mini};
  background-color: ${colors.white};
  margin: ${padding.ultramini};
`;

export {
  ChatArea,
  MessagesContainer,
  MessageUserName,
  ChatTextarea,
  ChatBuddyList,
  ChatBuddyListItem
};
