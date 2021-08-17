import React from 'react';
import * as types from '../types/types'


const Button: React.FC<types.ButtonProps> = (props) => <button style={{background: props.background}} className="btn"  onClick={props.ClickHandler}>{props.text}</button>

export default Button;