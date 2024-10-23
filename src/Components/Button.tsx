import React from 'react';
import { ButtonProps } from 'types/types';
import styled from 'styled-components';

const Button: React.FC<ButtonProps> = (props) => {
  const { background, clickHandler, text } = props;
  return (
    <StyledButton background={background} className="btn" onClick={clickHandler}>{text}</StyledButton>
  );

};

const StyledButton = styled.button<{ background: string }>`
width: 150px;
height: 45px;
border-radius: 30px;
color: #ffffff;
border: none;
font-size: 16px;
cursor: pointer;
transition: background-color 300ms ease;
background: ${({ background }) => background};
margin: 10px;
`;

export default Button;