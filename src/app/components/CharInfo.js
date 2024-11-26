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
      className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
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
    <div className="text-xl">
      <button
      className="pt-3"
        onClick={() => setEditing(true)}
      >
        {thisState}
      </button>
    </div>
  );

  return <div>{editing === true ? nameInput : nameDisplay}</div>;
};

export const Level = (props) => {
  const [thisState, setThisState] = useState(1);
  const [editing, setEditing] = useState(true);

  const levelInput = (
    <select
    
      onChange={(e) => {
        setThisState(e.target.value);
        props.setLevel(parseInt(e.target.value));
        props.setBasicEdited(true);
      }}
    >
      
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
        <option value={11}>11</option>
        <option value={12}>12</option>
        <option value={13}>13</option>
        <option value={14}>14</option>
        <option value={15}>15</option>
        <option value={16}>16</option>
        <option value={17}>17</option>
        <option value={18}>18</option>
        <option value={19}>19</option>
        <option value={20}>20</option>
      
    </select>
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
    { eventkey: "Lawful Good", value: "Lawful Good" },
    { eventkey: "Neutral Good", value: "Neutral Good" },
    { eventkey: "Chaotic Good", value: "Chaotic Good" },
    { eventkey: "Lawful Neutral", value: "Lawful Neutral" },
    { eventkey: "True Neutral", value: "True Neutral" },
    { eventkey: "Chaotic Neutral", value: "Chaotic Neutral" },
    { eventkey: "Lawful Evil", value: "Lawful Evil" },
    { eventkey: "Neutral Evil", value: "Neutral Evil" },
    { eventkey: "Chaotic Evil", value: "Chaotic Evil" },
  ];

  return (
    <select
      value={props.alignment}
      onChange={(e) => handleSelect(e)}
      id="alignments"
      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="Choose" disabled>
        Choose Alignment
      </option>
      {alignmentDropdownItems.map((item, index) => {
        return (
          <option key={index} value={item.value}>
            {item.value}
          </option>
        );
      })}
    </select>
  );
};

export const ClassSelect = (props) => {
  const [thisState, setThisState] = useState("Fighter");

  return (
    <select
      defaultValue={"Fighter"}
      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={(e) => {
        setThisState(e.target.value);
        props.setBasicEdited(true);
        props.setSelectedClass(e.target.value);
      }}
    >
      <option value="Barbarian">Barbarian</option>
      <option value="Bard">Bard</option>
      <option value="Cleric">Cleric</option>
      <option value="Druid">Druid</option>
      <option value="Fighter">Fighter</option>
      <option value="Monk">Monk</option>
      <option value="Paladin">Paladin</option>
      <option value="Ranger">Ranger</option>
      <option value="Rogue">Rogue</option>
      <option value="Sorcerer">Sorcerer</option>
      <option value="Wizard">Wizard</option>
    </select>
  );
};

export const RaceSelect = (props) => {
  const [thisState, setThisState] = useState("human");

  return (
    <select
      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={(e) => {
        props.setBasicEdited(true);
        setThisState(e.target.value);
        props.setSelectedRace(e.target.value);
      }}
    >
      <option value="human">Human</option>
      <option value="dwarf">Dwarf</option>
      <option value="elf">Elf</option>
      <option value="gnome">Gnome</option>
      <option value="halfElf">Half-elf</option>
      <option value="halfOrc">Half-orc</option>
      <option value="halfling">Halfling</option>
    </select>
  );
};
