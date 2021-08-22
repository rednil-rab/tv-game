import React, { useEffect } from 'react';
import * as types from '../types/types'

const Input: React.FC<types.placeholderProps> = (props) => { 
    // useEffect(() => {
    //     debugger;
    // })
    return (
    <div><input className="guess" onInput={props.InputHandler}></input></div>
    ) 
}

export default Input;