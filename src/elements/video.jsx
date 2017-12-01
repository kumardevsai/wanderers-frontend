import styled from 'styled-components';
import { colors, fontSizes, fonts, padding, margin } from './variables';

const VideoContainer = styled.div`
  position: absolute;
  width: 300px;
  top: 50%;
  right: 8vw;
  z-index: 20;
`;

const VideoTag = styled.video`
  width: 300px;
  height: 300px;
  ${'' /* z-index: 500; */};
`;

const VideoBtn = styled.button`
  display: block;
  width: 30%;
  font-family: 'Roboto Condensed', sans-serif;
  border-radius: 0px;
  border: 1px solid #fff;
  padding: 15px;
  margin: 10px auto;
  background-color: ${colors.pink};
  color: ${colors.white};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: background-color 1s ease;
  z-index: 500;

  &:hover {
    cursor: pointer;
    background-color: #212121;
    color: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

export { VideoContainer, VideoTag, VideoBtn };
