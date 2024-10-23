import React from 'react';

export interface Show {
    name: string;
    description: string;
    date: string;
}

export interface PopUpProps {
    num: number;
    text: string;
    color: string;
}

export interface StatProps {
    num: number;
    text: string;
    color: string;
    interations: number;
    width: number;
}

export interface popUpsProps {
    stats: PopUpProps[];
    display: boolean;
    clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
    width: number;
}

export interface ButtonProps {
    text: string;
    clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
    background: string;
}

export interface LifeBarProps {
    num: number;
    width: number
}

export interface placeholderProps {
    InputHandler: (React.FormEventHandler<HTMLInputElement>);
}

export interface showFromResponse {
    name: string,
    overview: string,
    first_air_date: string
}