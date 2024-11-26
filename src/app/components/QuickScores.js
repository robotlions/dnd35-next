import { useEffect, useState } from "react";
import * as RaceBonuses from "../Races/AbilBonuses";




function calculateModifier(abil) {
  return -5 + Math.floor(1 * (abil / 2));
}

export const QuickScores = (props) => {
 

 const [netRoll, setNewRoll] = useState(false);

  const rerollButton = (
    <button variant="secondary rounded-0 bg-gradient" onClick={() => rollButton()}>
      Roll Abilities
    </button>
  );
  const racialBonus = RaceBonuses[props.selectedRace];

  function rollButton() {
    if (props.selectedRace === "select") {
      return alert("Please select a race first");
    } else {
      setNewRoll(true);
      props.setRolled(true);
    }
  }

  return (
    <div style={{fontSize:"small"}}>
      <table>
        <thead>
          <tr>
            <th>Ability</th>
            <th>Roll</th>
            <th>Racial Bonus</th>
            <th>Total Score</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>STR</td>
            
              <td>{props.str}</td>
            
            <td>
              {racialBonus.bonusStr <= 0
                ? racialBonus.bonusStr
                : racialBonus.bonusStr}
            </td>
            <td className="totalScore">{props.str + racialBonus.bonusStr}</td>

            <td>{calculateModifier(props.str + racialBonus.bonusStr)}</td>
          </tr>
          <tr>
            <td>DEX</td>
           
              <td>{props.dex}</td>
            
            <td>
              {racialBonus.bonusDex <= 0
                ? racialBonus.bonusDex
                : racialBonus.bonusDex}
            </td>
            <td className="totalScore">{props.dex + racialBonus.bonusDex}</td>

            <td>{calculateModifier(props.dex + racialBonus.bonusDex)}</td>
          </tr>
          <tr>
            <td>CON</td>
            
              <td>{props.con}</td>
           
            <td>
              {racialBonus.bonusCon <= 0
                ? racialBonus.bonusCon
                : racialBonus.bonusCon}
            </td>
            <td className="totalScore">{props.con + racialBonus.bonusCon}</td>

            <td>{calculateModifier(props.con + racialBonus.bonusCon)}</td>
          </tr>
          <tr>
            <td>INT</td>
            
              <td>{props.int}</td>
            
            <td>
              {racialBonus.bonusInt <= 0
                ? racialBonus.bonusInt
                : racialBonus.bonusInt}
            </td>
            <td className="totalScore">{props.int + racialBonus.bonusInt}</td>

            <td>{calculateModifier(props.int + racialBonus.bonusInt)}</td>
          </tr>
          <tr>
            <td>WIS</td>
            
              <td>{props.wis}</td>
            
            <td>
              {racialBonus.bonusWis <= 0
                ? racialBonus.bonusWis
                : racialBonus.bonusWis}
            </td>
            <td className="totalScore">{props.wis + racialBonus.bonusWis}</td>

            <td>{calculateModifier(props.wis + racialBonus.bonusWis)}</td>
          </tr>

          <tr>
            <td>CHR</td>
            
              <td>{props.chr}</td>
            
            <td>
              {racialBonus.bonusChr <= 0
                ? racialBonus.bonusChr
                : racialBonus.bonusChr}
            </td>
            <td className="totalScore">{props.chr + racialBonus.bonusChr}</td>

            <td>{calculateModifier(props.chr + racialBonus.bonusChr)}</td>
          </tr>
        </tbody>
      </table>
   
    </div>
  );
};
