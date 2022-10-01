import React from "react";
import '../styles/button.scss';

export default function Button({message}) {
  return (<button className="button">{message}</button>)
}
