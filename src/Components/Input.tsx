import React, { forwardRef } from 'react';
import { placeholderProps } from 'types/types';

const Input = forwardRef<HTMLInputElement,placeholderProps>(
  function Input (props, ref) {
    return <input ref={ref} className="guess" onInput={props.InputHandler}></input>;
  });

export default Input;