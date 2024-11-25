import { useEffect, useState } from "react";
import * as RaceBonuses from "../Races/AbilBonuses";

function rando(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roll() {
  return [rando(2, 6), rando(2, 6), rando(2, 6), rando(2, 6)]
    .sort((a, b) => a - b)
    .slice(1)
    .reduce((a, b) => a + b, 0);
}

function calculateModifier(abil) {
  return -5 + Math.floor(1 * (abil / 2));
}

export const NewScores = (props) => {
  useEffect(() => {
    if (newRoll === true) {
      let conRoll = roll();
      let dexRoll = roll();
      let wisRoll = roll();
      let intRoll = roll();
      let chrRoll = roll();
      let strRoll = roll();
      setStr(strRoll);
      setInt(intRoll);
      setWis(wisRoll);
      setDex(dexRoll);
      setCon(conRoll);
      setChr(chrRoll);
      props.setStr(strRoll);
      props.setChr(chrRoll);
      props.setInt(intRoll);
      props.setCon(conRoll);
      props.setDex(dexRoll);
      props.setWis(wisRoll);
      setNewRoll(false);
    }
  });

  const [newRoll, setNewRoll] = useState(false);
  const [str, setStr] = useState(10);
  const [int, setInt] = useState(10);
  const [wis, setWis] = useState(10);
  const [con, setCon] = useState(10);
  const [dex, setDex] = useState(10);
  const [chr, setChr] = useState(10);

  const rerollButton = (
    <button
      className="font-[family-name:var(--font-imFell)] px-4 py-2 text-white font-semibold rounded bg-gradient-to-b from-sky-600 to-sky-400"
      onClick={() => rollButton()}
    >
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
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ paddingRight: 10 }}>Ability</th>
            <th style={{ paddingRight: 10 }}>Roll</th>
            <th style={{ paddingRight: 10 }}>Racial Bonus</th>
            <th style={{ paddingRight: 10 }}>Total Score</th>
            <th style={{ paddingRight: 10 }}>Modifier</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>STR</td>
            {props.munchkinMode === true ? (
              <td>
                <input
                  className="attInput"
                  onChange={(e) => {
                    setStr(parseInt(e.target.value));
                    props.setStr(parseInt(e.target.value));
                  }}
                  placeholder={str || 0}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = str)}
                ></input>
              </td>
            ) : (
              <td>{str}</td>
            )}
            <td>
              {racialBonus.bonusStr <= 0
                ? racialBonus.bonusStr
                : racialBonus.bonusStr}
            </td>
            <td className="totalScore">{str + racialBonus.bonusStr}</td>

            <td>{calculateModifier(str + racialBonus.bonusStr)}</td>
          </tr>
          <tr>
            <td>DEX</td>
            {props.munchkinMode === true ? (
              <td>
                <input
                  className="attInput"
                  onChange={(e) => {
                    setDex(parseInt(e.target.value));
                    props.setDex(parseInt(e.target.value));
                  }}
                  placeholder={dex || 0}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = dex)}
                ></input>
              </td>
            ) : (
              <td>{dex}</td>
            )}
            <td>
              {racialBonus.bonusDex <= 0
                ? racialBonus.bonusDex
                : racialBonus.bonusDex}
            </td>
            <td className="totalScore">{dex + racialBonus.bonusDex}</td>

            <td>{calculateModifier(dex + racialBonus.bonusDex)}</td>
          </tr>
          <tr>
            <td>CON</td>
            {props.munchkinMode === true ? (
              <td>
                <input
                  className="attInput"
                  onChange={(e) => {
                    setCon(parseInt(e.target.value));
                    props.setCon(parseInt(e.target.value));
                  }}
                  placeholder={con || 0}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = con)}
                ></input>
              </td>
            ) : (
              <td>{con}</td>
            )}
            <td>
              {racialBonus.bonusCon <= 0
                ? racialBonus.bonusCon
                : racialBonus.bonusCon}
            </td>
            <td className="totalScore">{con + racialBonus.bonusCon}</td>

            <td>{calculateModifier(con + racialBonus.bonusCon)}</td>
          </tr>
          <tr>
            <td>INT</td>
            {props.munchkinMode === true ? (
              <td>
                <input
                  className="attInput"
                  onChange={(e) => {
                    setInt(parseInt(e.target.value));
                    props.setInt(parseInt(e.target.value));
                  }}
                  placeholder={int || 0}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = int)}
                ></input>
              </td>
            ) : (
              <td>{int}</td>
            )}
            <td>
              {racialBonus.bonusInt <= 0
                ? racialBonus.bonusInt
                : racialBonus.bonusInt}
            </td>
            <td className="totalScore">{int + racialBonus.bonusInt}</td>

            <td>{calculateModifier(int + racialBonus.bonusInt)}</td>
          </tr>
          <tr>
            <td>WIS</td>
            {props.munchkinMode === true ? (
              <td>
                <input
                  className="attInput"
                  onChange={(e) => {
                    setWis(parseInt(e.target.value));
                    props.setWis(parseInt(e.target.value));
                  }}
                  placeholder={wis || 0}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = wis)}
                ></input>
              </td>
            ) : (
              <td>{wis}</td>
            )}
            <td>
              {racialBonus.bonusWis <= 0
                ? racialBonus.bonusWis
                : racialBonus.bonusWis}
            </td>
            <td className="totalScore">{wis + racialBonus.bonusWis}</td>

            <td>{calculateModifier(wis + racialBonus.bonusWis)}</td>
          </tr>

          <tr>
            <td>CHR</td>
            {props.munchkinMode === true ? (
              <td>
                <input
                  className="attInput"
                  onChange={(e) => {
                    setChr(parseInt(e.target.value));
                    props.setChr(parseInt(e.target.value));
                  }}
                  placeholder={chr || 0}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = ChannelSplitterNode)}
                ></input>
              </td>
            ) : (
              <td>{chr}</td>
            )}
            <td>
              {racialBonus.bonusChr <= 0
                ? racialBonus.bonusChr
                : racialBonus.bonusChr}
            </td>
            <td className="totalScore">{chr + racialBonus.bonusChr}</td>

            <td>{calculateModifier(chr + racialBonus.bonusChr)}</td>
          </tr>
        </tbody>
      </table>
      <p style={{ textAlign: "center", marginTop: 10 }}>
        {props.munchkinMode === true
          ? "Chaos Mode. Set abilities manually."
          : rerollButton}
      </p>
    </div>
  );
};
