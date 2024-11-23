export const Dropdown = (props) => {
  return (
    <div>
      <label htmlFor={props.dropdownName}></label>
      <select name="test">
        <option value="rigatoni">Rigatoni</option>
        <option value="dave">Dave</option>
        <option value="pumpernickel">Pumpernickel</option>
        <option value="reeses">Reeses</option>
      </select>
    </div>
  );
};
