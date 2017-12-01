import styled from 'styled-components';
import { colors, fontSizes, fonts, padding, margin } from './variables';

const ChatArea = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  bottom: 20px;
  right: 0;
  padding-bottom: ${padding.small};
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
`;

const MessagesContainer = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.black};
  margin-bottom: ${margin.mini};
  padding: ${margin.mini};
  font-family: ${fonts.body};
  color: ${colors.pink};
  max-height: 30vh;
  overflow-y: scroll;
`;

const MessageUserName = styled.div`
  background-color: ${colors.pink};
  color: ${colors.lightPurple};
  width: 30%;
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
`;

const ChatBuddyList = styled.ul`
  position: absolute;
  top: 0;
  right: 3%;
  padding-top: ${padding.small};
  align-self: flex-end;
  display: flex;
  z-index: 6;
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
