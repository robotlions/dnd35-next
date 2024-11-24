import { useState } from "react";

export function Dropdown(props) {
const [thisState, setThisState] = useState("")

  return (
    <div>
      <label htmlFor={props.dropdownName}>{props.dropdownName}</label>
      <select value={thisState} name={props.dropdownName} onChange={(e)=>{props.setState(e.target.value),setThisState(e.target.value)}}>
        {props.dropdownItems.map((item, index)=>{
          return(
            <option key={index} value={item.value}>{item.displayName}</option>
          )
        })}
      </select>
    </div>
  );
};
