import styled from 'styled-components';

import { colors, fonts, margin } from '../elements/variables';

const ImageSection = styled.section`
  margin: 0 auto;
  margin-top: ${margin.medium};
  padding: 10px;
`;

const Image = styled.img`
  max-width: 33%;

  @media (max-width: 1296px) {
    max-width: 50%;
  }
`;

export { ImageSection, Image };
