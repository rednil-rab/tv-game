import React, {useState} from "react";
import Stat from './Stat';
import { X } from 'react-bootstrap-icons';
import * as types from '../../types/types';
import './popup.css';


const PopUp:React.FunctionComponent<types.popUpsProps> = (props) => {
    const iterations: number = props.stats.length;
    const popUps:  JSX.Element[] =   props.stats.map(stat => <Stat interations={iterations} number={stat.number} text={stat.text} color={stat.color}></Stat>)

    return (
        <div style={{display: props.display ? "flex" : "none"}} className="pop-up">
            <div onClick={props.ClickHandler}> <X className="x"/></div>

            {popUps}
            
        </div>
    )

}

export default PopUp;