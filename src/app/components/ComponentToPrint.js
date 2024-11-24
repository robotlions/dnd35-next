import { forwardRef } from "react";
import dndLogo from "../images/dndLogo.png";
import * as RaceBonuses from "../Races/AbilBonuses";
import * as CharInfo from './CharInfo';
import { RaceInfo } from "../Races/RaceTables";
import * as KnownSpells from "../Spells/KnownSpells";

export const ComponentToPrint = forwardRef((props, ref) => {
  function calculateModifier(abil) {
    return -5 + Math.floor(1 * (abil / 2));
  }

  function armorHeaderDisplay() {
    let counts = {};
    props.armorArray.forEach(function (x) {
      counts[x.armorName] = (counts[x.armorName] || 0) + 1;
    });
    let armorSet = [...new Set(props.armorArray)];

    return armorSet.map((item, index) => (
      <div style={{fontSize: "x-small"}}className="row" key={index}>
        
          <div className="col" style={{ fontWeight: "bold" }}>
            {counts[item.armorName] > 1 && counts[item.armorName]}{" "}
            {item.armorName}
          </div>
        

        <div className="col">
          Armor Bonus: {item.armorBonus}
        </div>
        <div className="col">
          Max Dex Bonus: {item.maxDexBonus}
        </div>
        <div className="col">
          Armor Check: {item.armorCheck}
        </div>
        <div className="col">
          Spell Fail: {item.spellFail}
        </div>
        <div className="col">
          Speed 30': {item.speed30}
        </div>
        <div className="col">
          Speed 20': {item.speed20}
        </div>
        </div>
        
    ));
  }

  function weaponHeaderDisplay() {
    let counts = {};
    props.weaponArray.forEach(function (x) {
      counts[x.weaponName] = (counts[x.weaponName] || 0) + 1;
    });
    let weaponSet = [...new Set(props.weaponArray)];

    return weaponSet.map((item, index) => (
      <div style={{fontSize: "x-small"}} className="row" key={index}>
        <div className="col" style={{ fontWeight: "bold" }}>
          {counts[item.weaponName] > 1 && counts[item.weaponName]}{" "}
          {item.weaponName}
        </div>
        <div className="col">
          Damage, Small: {item.dmgS}
        </div>
        <div className="col">
          Damage, Medium: {item.dmgM}
        </div>
        <div className="col">
          Critical: {item.critical}
        </div>
        <div className="col">
          Range: {item.range}
        </div>
        <div className="col">
          Type: {item.type}
        </div>
      </div>
    ));
  }

  const racialBonus = RaceBonuses[props.selectedRace];

  function displayList(lvlFilter) {

    if (
      props.selectedClass !== "Barbarian" &&
      props.selectedClass !== "Monk" &&
      props.selectedClass !== "Rogue" &&
      props.selectedClass !== "Fighter"
    ) {
    let lvlCheck = KnownSpells[props.selectedClass][props.level];

    return props.spellArray
      .filter((item) => lvlCheck[item.level] > 0)
      .filter((item) => item.level === lvlFilter)
      .map((item, index) => (
        <div key={index} className="col-2">{item.spellName}</div>
      ));
  }};

  function showSpells() { 

  

  if (
    props.selectedClass !== "Barbarian" &&
    props.selectedClass !== "Monk" &&
    props.selectedClass !== "Rogue" &&
    props.selectedClass !== "Fighter"
  ) {
    return(

  <div style={{fontSize:"small"}}>
      {displayList(0).length > 0 && (
        <>
      <h6>Level 0</h6>
      <div className="d-flex flex-row flex-wrap">{displayList(0)}</div>
      </>
      )}
      {displayList(1).length > 0 && (
        <>
        <br/>
          <h6>Level 1</h6>
          <div className="d-flex flex-row flex-wrap">{displayList(1)}</div>
        </>
      )}
      {displayList(2).length > 0 && (
        <>
        <br/>
          <h6>Level 2</h6>
          <div className="d-flex flex-row flex-wrap">{displayList(2)}</div>
        </>
      )}
      {displayList(3).length > 0 && (
        <>
        <br/>
          <h6>Level 3</h6>
          <div className="d-flex flex-row flex-wrap">{displayList(3)}</div>
        </>
      )}
      {displayList(4).length > 0 && (
        <>
        <br/>
          <h6>Level 4</h6>
          <div className="d-flex flex-row flex-wrap">{displayList(4)}</div>
        </>
      )}
      {displayList(5).length > 0 && (
        <>
        <br/>
          <h6>Level 5</h6>
          <div className="d-flex flex-row flex-wrap">{displayList(5)}</div>
        </>
      )}
      {displayList(6).length > 0 && (
        <>
        <br/>
          <h6>Level 6</h6>
          <div className="d-flex flex-row flex-wrap">{displayList(6)}</div>
        </>
      )}
      {displayList(7).length > 0 && (
        <>
        <br/>
          <h6>Level 7</h6>
          <div className="d-flex flex-row flex-wrap">{displayList(7)}</div>
        </>
      )}
      {displayList(8).length > 0 && (
        <>
        <br/>
          <h6>Level 8</h6>
          <div className="d-flex flex-row flex-wrap">{displayList(8)}</div>
        </>
      )}
      {displayList(9).length > 0 && (
        <>
        <br/>
          <h6>Level 9</h6>
          <div className="d-flex flex-row flex-wrap">{displayList(9)}</div>
        </>
      )}
    </div>);
  }};

  

  return (
    <div className="container" ref={ref}>
      <div className="row">
        <div
          className="col-12"
          style={{ textAlign: "center", marginBottom: 10, paddingTop: 20 }}
        >
          <img
            alt="vintage d&d logo"
            style={{ maxWidth: "30%" }}
            src={dndLogo}
          ></img>
          <h4 style={{ marginTop: 10 }}>Character Record Sheet</h4>
        </div>
      </div>
      <div className="row" style={{fontSize: "small"}}>
        <div className="col-4">Name: {props.charName}</div>
        <div className="col-4">Class: {props.selectedClass}</div>
        <div className="col-4">Race: {RaceInfo[props.selectedRace].raceName}</div>
      </div>
      <div className="row" style={{ fontSize: "small", marginBottom: 10 }}>
        <div className="col-4">Alignment: {props.alignment}</div>
        <div className="col-4">Hit Points: {props.hp}</div>
        <div className="col-4">Level: {props.level}</div>
      </div>
      <div className="row" style={{fontSize: "small"}}>
        <div className="col-6">
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
      <div className="col-3">
      <CharInfo.SavingThrows
                    level={props.level}
                    selectedClass={props.selectedClass}
                    dex={props.dex}
                    con={props.con}
                    wis={props.wis}
                  />
      </div>
      <div style={{textAlign: "center"}}className="col-3">
        <h6>Base Attack</h6>
      <p>{props.baseAttack}</p>
      <h6>Armor Class</h6>
      <p>{props.ac}</p>
      </div>
      </div>
      <div className="row" style={{ fontSize:"small", marginTop: 10 }}>
        <div className="col">
            <span><span style={{fontSize:"1rem",fontWeight:700}}>Silver:</span> {props.silver}</span>
        </div>
      </div>
      <br/>
      <h6>Armor</h6>

      <div className="row inventoryBox">
        {armorHeaderDisplay()}
      </div>
      <h6>Weapons</h6>

      <div className="row inventoryBox">
        {weaponHeaderDisplay()}
      </div>
      <div className="pagebreak"></div>
      <h6>Skills</h6>

      <div className="row skillsBox">
        {props.learnedSkillsArray.length > 0 && (
          <div>
            <div>
              <span>
                <em>Class</em>
              </span>
              {props.learnedSkillsArray
                .filter((item) => item[props.selectedClass] === true)
                .map((item, index) => (
                  <span style={{fontSize:"small"}}key={index}> - {item.skillName} ({item.skillLevel})</span>
                ))}
            </div>
            <div>
              <span>
                <em>Cross-class</em>
              </span>
              {props.learnedSkillsArray
                .filter((item) => item[props.selectedClass] === false)
                .map((item, index) => (
                  <span key={index}> - {item.skillName} ({item.skillLevel})</span>
                ))}
            </div>
          </div>
        )}
      </div>
      <h6>Feats</h6>

      <div className="row skillsBox">
        {props.featArray.map((item, index) => (
                  <div style={{fontSize:"small"}}key={index}>{item.featName}</div>
                ))}
      </div>
      <div className="row d-flex flex-row flex-wrap">
        <h6>Spells</h6>
      {showSpells()}
    </div>
    </div>
  );
});
