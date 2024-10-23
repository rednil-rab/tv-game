import React, { forwardRef } from 'react';
import { placeholderProps } from 'types/types';

const Input = forwardRef<HTMLInputElement,placeholderProps>(
  function Input (props, ref) {
    const { InputHandler } = props;
    return <input ref={ref} className="guess" onInput={InputHandler}></input>;
  });

export default Input;