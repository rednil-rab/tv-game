import React from 'react';
import { StatProps } from 'types/types';
import styled from 'styled-components';

const Stat: React.FC<StatProps> = (props) => {
  const { width, color, num, text } = props;

  return (
    <StyledStatDiv className="stat" width={width}>
      <h1 style={{margin: 0}}>{num}</h1>
      <StyleStatLabel className="stat-label" color={color}>
        {text}
      </StyleStatLabel>
    </StyledStatDiv>
  );

};

const StyledStatDiv = styled.div<{ width: number }>`
display: flex;
flex-direction: column;
align-items: center;
font-size: 16px;
font-family: 'Comfortaa', cursive;
width: ${({ width }) => width < 640 ? '100%' : '30%'};
justify-content: ${({ width }) => width < 640 ? 'center' : 'space-between'};
margin: ${({ width }) => width < 640 ? '5%' : '0'};

`;

const StyleStatLabel = styled.div<{
  color: string
}>`
width: 80%;
border-radius: 15px;
padding: 6%;
display: flex;
justify-content: center;
align-items: center;
color: #ffffff;
font-size: 16px;
background: ${({ color }) => color};
`;  

export default Stat;