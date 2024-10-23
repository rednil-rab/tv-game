import React from 'react';

// components
import Stat from 'Components/PopUp/Stat';

// bootstrap
import { X } from 'react-bootstrap-icons';

// types
import { popUpsProps } from 'types/types';

// style
import styled from 'styled-components';

const PopUp:React.FunctionComponent<popUpsProps> = (props) => {
  const { width, display, stats, clickHandler } = props;

  const iterations: number = stats.length;

  const popUps: JSX.Element[] = stats.map((stat,index) => (
    <Stat interations={iterations} key={`key_${index}`} num={stat.num} text={stat.text} color={stat.color} width={width}></Stat>
  ));

  return (
    <StyledDiv display={display} width={width}  className="pop-up">
      <div onClick={clickHandler}> <X className="x"/></div>

      {popUps}
    </StyledDiv>
  );
};

const StyledDiv = styled.div<{
    display: boolean,
    width: number
}>`
position: fixed;
top: 0;
right: 0;
left: 0;
bottom: 0;
margin: auto;
height: fit-content;
width: 60vw;
display: ${({ display }) => display ? 'flex' : 'none'};
${({ width }) => width < 640 ? 'flex-direction: column;': ''}
justify-content: space-evenly;
align-items: center;
box-shadow: 5px 5px 15px -5px #000000;
background: #ffffff;
border-radius: 15px;
padding: 3%;
`;

export default PopUp;