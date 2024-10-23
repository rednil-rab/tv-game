import React from 'react';
import * as types from '../../types/types';
import { HeartFill } from 'react-bootstrap-icons';
import { Heart } from 'react-bootstrap-icons';
import styled from 'styled-components';

const LifeBar: React.FunctionComponent<types.LifeBarProps> = (props) => {
  const { width, num } = props;
  const StyledDiv = styled.div`
    display: flex;
    width: 60%;
    justify-content: space-evenly
    `;
  const StyledContainer = styled.div`
    display: flex;
    width: ${width < 640 ? '60%' : '100%'};
    justify-content: space-evenly
    `;
  const fillHearts: (num: number) => JSX.Element = (num) => {
    if (num < 1) {
      return <StyledDiv><HeartFill className="heart" /><HeartFill className="heart" /><HeartFill className="heart" /></StyledDiv>;
    }
    if (num < 2) {
      return <StyledDiv><HeartFill className="heart" /><HeartFill className="heart" /><Heart className="heart" /></StyledDiv>;
    }
    if (num < 3) {
      return <StyledDiv><HeartFill className="heart" /><Heart className="heart" /><Heart className="heart" /></StyledDiv>;
    }

    return <HeartFill />;
  };
  return (
    <StyledContainer>
      {fillHearts(num)}
    </StyledContainer>


  );
};

export default LifeBar;