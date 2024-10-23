import React from 'react';
import * as types from '../types/types';

const Input: React.FC<types.placeholderProps> = (props) => <input className="guess" onInput={props.InputHandler}></input>;

export default Input;