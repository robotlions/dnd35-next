import {useState} from 'react';
import { RaceInfo } from '../Races/RaceTables';


// title={RaceInfo[thisState].raceName}

 export const RaceSelect = (props) => {
  
    const [thisState, setThisState] = useState("human");
  
  return(
    <select onSelect={(eventkey) => {props.setBasicEdited(true); setThisState(eventkey); props.setSelectedRace(eventkey)}}>
      <option eventkey="human">Human</option>
      <option eventkey="dwarf">Dwarf</option>
      <option eventkey="elf">Elf</option>
      <option eventkey="gnome">Gnome</option>
      <option eventkey="halfElf">Half-elf</option>
      <option eventkey="halfOrc">Half-orc</option>
      <option eventkey="halfling">Halfling</option>
    </select>
  )
  };
  
  

