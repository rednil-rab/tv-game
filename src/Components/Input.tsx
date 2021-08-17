import React from 'react';

interface placeholderProps {
    InputHandler: ( React.FormEventHandler<HTMLInputElement>)
}


const Input: React.FC<placeholderProps> = (props) => <input className="guess" onInput={props.InputHandler}></input>

export default Input;