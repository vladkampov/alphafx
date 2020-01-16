import styled from 'styled-components';

const ColourLabel = styled.div`
  width: 16px;
  height: 16px;
  background: ${props => props.colour};
  display: inline-block;
`;

export default ColourLabel;
