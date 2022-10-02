import React from "react";
import '../styles/button.scss';

export default function Button({message, onClick}) {
  return (<button className="button" onClick={onClick}>{message}</button>)
}
