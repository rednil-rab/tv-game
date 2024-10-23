import React from 'react';
import Stat from './Stat';
import { X } from 'react-bootstrap-icons';
import * as types from '../../types/types';
import styled from 'styled-components';

const PopUp:React.FunctionComponent<types.popUpsProps> = (props) => {
  const { width } = props;
  const StyledDiv = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    height: fit-content;
    width: 60vw;
    display: ${props.display ? 'flex' : 'none'};
    ${width < 640 ? 'flex-direction: column;': ''}
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 5px 5px 15px -5px #000000;
    background: #ffffff;
    border-radius: 15px;
    padding: 3%;
    `;
  const iterations: number = props.stats.length;
  const popUps: JSX.Element[] = props.stats.map((stat,index) => (
    <Stat interations={iterations} key={`key_${index}`} num={stat.num} text={stat.text} color={stat.color} width={width}></Stat>
  ));
  return (
    <StyledDiv  className="pop-up">
      <div onClick={props.clickHandler}> <X className="x"/></div>

      {popUps}
    </StyledDiv>
  );

};

export default PopUp;