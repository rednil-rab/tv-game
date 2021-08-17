export interface Show {
    name: string;
    description: string;
    date: string;
}

export interface PopUpProps {
    number: number;
    text: string;
    color: string;
}

export interface StatProps {
    number: number;
    text: string;
    color: string;
    interations: number;
}

export interface popUpsProps {
    stats: PopUpProps[];
    display: boolean;
    clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface ButtonProps {
    text: string;
    clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
    background: string;

}