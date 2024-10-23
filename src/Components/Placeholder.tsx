import React from 'react';

interface PlaceholderProps {
    text: string;
}

const Placeholder: React.FC<PlaceholderProps> = (props) => <h1 className="placeholder" >{props.text}</h1>;

export default Placeholder;