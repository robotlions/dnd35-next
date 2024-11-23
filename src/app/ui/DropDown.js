export function Dropdown(props) {
  return (
    <div>
      <label htmlFor={props.dropdownName}>{props.dropdownName}</label>
      <select name={props.dropdownName}>
        {props.dropdownItems.map((item, index)=>{
          return(
            <option key={index} value={item.value}>{item.title}</option>
          )
        })}
      </select>
    </div>
  );
};
