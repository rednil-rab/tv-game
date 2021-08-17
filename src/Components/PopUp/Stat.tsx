import React from "react";
import * as types from '../../types/types';


const Stat: React.FC<types.StatProps> = (props) => <div className="stat" style={{width: `${100/props.interations*0.9}%`}}><h1>{props.number}</h1><div className="stat-label" style={{background: props.color}}>{props.text}</div></div>;

export default Stat;