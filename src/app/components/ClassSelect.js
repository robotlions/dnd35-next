import {useState} from 'react';

 export const ClassSelectDropdown = (props) => {
  
    const [thisState, setThisState] = useState("Fighter");
  
  return(
    <select onSelect={(eventkey) => {setThisState(eventkey); props.setBasicEdited(true); props.setSelectedClass(eventkey)}}>
      <option eventkey="Barbarian">Barbarian</option>
      <option eventkey="Bard">Bard</option>
      <option eventkey="Cleric">Cleric</option>
      <option eventkey="Druid">Druid</option>
      <option eventkey="Fighter">Fighter</option>
      <option eventkey="Monk">Monk</option>
      <option eventkey="Paladin">Paladin</option>
      <option eventkey="Ranger">Ranger</option>
      <option eventkey="Rogue">Rogue</option>
      <option eventkey="Sorcerer">Sorcerer</option>
      <option eventkey="Wizard">Wizard</option>
    </select>
  )
  }