import React from 'react';
import * as types from '../types/types';
import styled from 'styled-components';

const Button: React.FC<types.ButtonProps> = (props) => {
  const StyledButton = styled.button`
    width: 150px;
    height: 45px;
    border-radius: 30px;
    color: #ffffff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 300ms ease;
    background: ${props.background};
    margin: 10px;
    `;
  return (
    <StyledButton className="btn" onClick={props.clickHandler}>{props.text}</StyledButton>
  );

};

export default Button;