import { useEffect, useState } from "react";
import * as RaceBonuses from "../Races/AbilBonuses";
import * as ClassTables from "../Classes/ClassTables";
import * as RaceTables from "../Races/RaceTables";
import * as SavingThrowTables from "../Classes/SavingThrowsTables";

function rando(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function calculateModifier(abil) {
  return -5 + Math.floor(1 * (abil / 2));
}

export const CharName = (props) => {
  const [thisState, setThisState] = useState("");
  const [editing, setEditing] = useState(true);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
      props.setBasicEdited(true);
    }
  };

  const nameInput = (
    <input
      type="text"
      placeholder="Character Name"
      onChange={(e) => {
        setThisState(e.target.value);
        props.setCharName(e.target.value);
      }}
      onKeyDown={handleKeyDown}
    />
  );

  const nameDisplay = (
    <button className="nameDisplay" onClick={() => setEditing(true)}>
      {thisState}
    </button>
  );

  return <div>{editing === true ? nameInput : nameDisplay}</div>;
};

export const Level = (props) => {
  const [thisState, setThisState] = useState(1);
  const [editing, setEditing] = useState(true);

  const levelInput = (
    <Dropdown
      onSelect={(eventKey) => {
        setThisState(eventKey);
        props.setLevel(parseInt(eventKey));
        props.setBasicEdited(true);
      }}
    >
      <DropdownButton
        variant="secondary rounded-0 bg-gradient"
        title={thisState}
      >
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
        <Dropdown.Item eventKey={3}>3</Dropdown.Item>
        <Dropdown.Item eventKey={4}>4</Dropdown.Item>
        <Dropdown.Item eventKey={5}>5</Dropdown.Item>
        <Dropdown.Item eventKey={6}>6</Dropdown.Item>
        <Dropdown.Item eventKey={7}>7</Dropdown.Item>
        <Dropdown.Item eventKey={8}>8</Dropdown.Item>
        <Dropdown.Item eventKey={9}>9</Dropdown.Item>
        <Dropdown.Item eventKey={10}>10</Dropdown.Item>
        <Dropdown.Item eventKey={11}>11</Dropdown.Item>
        <Dropdown.Item eventKey={12}>12</Dropdown.Item>
        <Dropdown.Item eventKey={13}>13</Dropdown.Item>
        <Dropdown.Item eventKey={14}>14</Dropdown.Item>
        <Dropdown.Item eventKey={15}>15</Dropdown.Item>
        <Dropdown.Item eventKey={16}>16</Dropdown.Item>
        <Dropdown.Item eventKey={17}>17</Dropdown.Item>
        <Dropdown.Item eventKey={18}>18</Dropdown.Item>
        <Dropdown.Item eventKey={19}>19</Dropdown.Item>
        <Dropdown.Item eventKey={20}>20</Dropdown.Item>
      </DropdownButton>
    </Dropdown>
  );

  const levelDisplay = (
    <button className="nameDisplay" onClick={() => setEditing(true)}>
      {thisState}
    </button>
  );

  return <div>{editing === true ? levelInput : levelDisplay}</div>;
};

export const HitPoints = (props) => {
  const racialBonus = RaceBonuses[props.selectedRace];
  const hpDice = ClassTables.hitDice[props.selectedClass];
  const mod = calculateModifier(props.con + racialBonus.bonusCon);
  const [printHP, setPrintHP] = useState(1);
  const [toughnessBonus, setToughnessBonus] = useState(0);

  useEffect(() => {
    if (props.featArray.some((item) => item.featName === "Toughness")) {
      setToughnessBonus(3);
    } else {
      setToughnessBonus(0);
    }
  }, [props.featArray]);

  useEffect(() => {
    let loading = true;
    if (loading === true) {
      let total = 0;
      for (let i = 1; i <= props.level; i++) {
        if (i === 1) {
          total = parseInt(total) + hpDice + mod;
        } else {
          total = parseInt(total) + parseInt(rando(1, hpDice) + mod);
        }
      }
      setPrintHP(total + toughnessBonus);
      props.setHP(total + toughnessBonus);
    }
    return () => {
      loading = false;
    };
  }, [props.level, hpDice, mod, props.featArray, toughnessBonus]);

  return <div>{printHP}</div>;
};

export const ArmorClass = (props) => {
  const dexModifier = calculateModifier(props.dex);
  const sizeModifier = RaceTables.sizeModifier[props.selectedRace].ac;
  // const printAC = 10 + props.armorBonus + props.shieldBonus + props.dexModifier + props.sizeModifier
  const printAC = 10 + sizeModifier + dexModifier + props.armorBonusTotal;
  useEffect(() => {
    props.setAC(printAC);
  }, [printAC, props]);
  return <p>{printAC}</p>;
};

export const SavingThrows = (props) => {
  const fortSave =
    SavingThrowTables[props.selectedClass][props.level].f +
    calculateModifier(props.con);
  const reflexSave =
    SavingThrowTables[props.selectedClass][props.level].r +
    calculateModifier(props.dex);
  const willSave =
    SavingThrowTables[props.selectedClass][props.level].w +
    calculateModifier(props.wis);

  return (
    <div style={{ textAlign: "center" }}>
      <table>
        <thead>
          <tr>
            <th>Saving Throws</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fortitude: {fortSave}</td>
          </tr>
          <tr>
            <td>Reflex: {reflexSave}</td>
          </tr>
          <tr>
            <td>Will: {willSave}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const AlignmentSelect = (props) => {
  function handleSelect(e) {
    props.setAlignment(e.target.value);
  }

  const alignmentDropdownItems = [
    { eventKey: "Lawful Good", value: "Lawful Good" },
    { eventKey: "Neutral Good", value: "Neutral Good" },
    { eventKey: "Chaotic Good", value: "Chaotic Good" },
    { eventKey: "Lawful Neutral", value: "Lawful Neutral" },
    { eventKey: "True Neutral", value: "True Neutral" },
    { eventKey: "Chaotic Neutral", value: "Chaotic Neutral" },
    { eventKey: "Lawful Evil", value: "Lawful Evil" },
    { eventKey: "Neutral Evil", value: "Neutral Evil" },
    { eventKey: "Chaotic Evil", value: "Chaotic Evil" },
  ];

  return (
    <select
      value={props.alignment}
      onChange={(e) => handleSelect(e)}
      id="alignments"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="Choose" disabled>
        Choose Alignment
      </option>
      {alignmentDropdownItems.map((item, index) => {
        return (
          <option key={index} value={item.value}>
            {item.eventKey}
          </option>
        );
      })}
    </select>
  );
};
