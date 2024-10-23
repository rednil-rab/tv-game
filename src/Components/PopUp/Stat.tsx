import React from 'react';
import * as types from 'types/types';
import styled from 'styled-components';
import useWindowResize from 'hooks/useWindowsize';

const Stat: React.FC<types.StatProps> = (props) => {
  const windowSize = useWindowResize();
  const StyledStatDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    font-family: 'Comfortaa', cursive;
    width: ${windowSize[0] < 640 ? '100%' : '30%'};
    justify-content: ${windowSize[0] < 640 ? 'center' : 'space-between'};
    margin: ${windowSize[0] < 640 ? '5%' : '0'};
    
    `;
  const StyleStatLabel = styled.div`
    width: 80%;
    border-radius: 15px;
    padding: 6%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 16px;
    background: ${props.color};
    `;  
  return (
    <StyledStatDiv className="stat" ><h1 style={{margin: 0}}>{props.num}</h1><StyleStatLabel className="stat-label" >{props.text}</StyleStatLabel></StyledStatDiv>
  );

};

export default Stat;