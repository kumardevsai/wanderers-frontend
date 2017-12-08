import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, fontSizes, fonts, padding, margin } from './variables';

const CompletedText = styled.span`
  line-height: 40px;
`;

const CheckBox = styled.input`
  margin: ${margin.mini};
`;

const Radio = styled.input`
  margin: ${margin.mini};
`;

export { CompletedText, CheckBox, Radio };
