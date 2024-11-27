import { useEffect, useState } from "react";
import { skillTables } from "../Classes/Skills/SkillsTables";
import * as RaceBonuses from "../Races/AbilBonuses";

const classSkillPoints = {
  Barbarian: 4,
  Bard: 6,
  Cleric: 2,
  Druid: 4,
  Fighter: 2,
  Monk: 4,
  Paladin: 2,
  Ranger: 6,
  Rogue: 8,
  Sorcerer: 2,
  Wizard: 2,
};

const quickClassSkillPoints = {
  Barbarian: 4,
  Bard: 6,
  Cleric: 3,
  Druid: 4,
  Fighter: 2,
  Monk: 4,
  Paladin: 2,
  Ranger: 6,
  Rogue: 8,
  Sorcerer: 2,
  Wizard: 2,
};

function calculateModifier(abil) {
  return -5 + Math.floor(1 * (abil / 2));
}

let learnedSkills = [];

export const SkillEntry = (props) => {
  let classSkill = props.item[props.selectedClass];
  const [skillRank, setSkillRank] = useState(0);

  function addSkillRank() {
    if (props.skillPoints === 0) {
      return alert("Not enough skill points");
    }

    if (props.skillPoints < 2 && classSkill === false) {
      return alert("Not enough skill points");
    }

    if (classSkill === true && skillRank === props.level + 3) {
      return alert("This skill is maxed out.");
    }

    if (classSkill === false && skillRank === props.level + 1) {
      return alert("This skill is maxed out.");
    }

    if (props.skillPoints <= -1) {
      return alert(
        "Not enough skill points. Did you remember to roll your character's abilities?"
      );
    }

    if (skillRank === 0) {
      learnedSkills.push(props.item);
      props.triggerArray();
    }

    if (classSkill === true) {
      let iOfA = learnedSkills.indexOf(props.item);

      setSkillRank(skillRank + 1);
      props.setSkillPoints(props.skillPoints - 1);
      learnedSkills[iOfA].skillLevel = skillRank + 1;
    } else {
      let iOfA = learnedSkills.indexOf(props.item);

      setSkillRank(skillRank + 1);
      props.setSkillPoints(props.skillPoints - 2);
      learnedSkills[iOfA].skillLevel = skillRank + 1;
    }
  }

  function subtractSkillRank() {
    if (skillRank === 0) {
      return alert("This skill can't go any lower.");
    }
    if (classSkill === true) {
      let iOfA = learnedSkills.indexOf(props.item);

      setSkillRank(skillRank - 1);
      props.setSkillPoints(props.skillPoints + 1);
      learnedSkills[iOfA].skillLevel = skillRank - 1;
    } else {
      let iOfA = learnedSkills.indexOf(props.item);

      setSkillRank(skillRank - 1);
      props.setSkillPoints(props.skillPoints + 2);
      learnedSkills[iOfA].skillLevel = skillRank - 1;
    }
    if (skillRank === 1) {
      let i = learnedSkills.indexOf(props.item);
      learnedSkills.splice(i, 1);
      props.triggerArray();
    }
  }

  return (
    <div>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => addSkillRank()}
      >
        +
      </button>{" "}
      {skillRank}{" "}
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => subtractSkillRank()}
      >
        -
      </button>{" "}
      {props.item.skillName}
    </div>
  );
};

export const SkillsMain = ({setLearnedSkillsArray, int, selectedClass, level, selectedRace, setSkillPoints}) => {
  const [skillPointsTemp, setSkillPointsTemp] = useState(
    classSkillPoints[selectedClass] + calculateModifier(int)
  );

  let raceSkillBonus = selectedRace === "human" ? 4 : 0;

  useEffect(() => {
    setSkillPointsTemp(
      4 *
        ((classSkillPoints[selectedClass] +
          calculateModifier(int)) *
          level) +
        raceSkillBonus
    );
  }, [
    int,
    selectedClass,
    selectedRace,
    raceSkillBonus,
    level,
  ]);

  useEffect(() => {
    setSkillPoints(skillPointsTemp);
  }, [skillPointsTemp, setSkillPoints]);
 

  function triggerArray() {
    setLearnedSkillsArray(learnedSkills);
  }

  // this is a test of a function to reset the skills array when the user changes the character's class
  useEffect(()=>{
    learnedSkills=[];
    setLearnedSkillsArray([]);
  },[selectedClass, setLearnedSkillsArray])

  const skillDisplayClass = Object.values(skillTables)
    .filter((item) => item[selectedClass] === true)
    .map((item, index) => (
      <div key={index} className="col-4">
        <SkillEntry
          triggerArray={triggerArray}
          level={level}
          selectedClass={selectedClass}
          item={item}
          skillPoints={skillPointsTemp}
          setSkillPoints={setSkillPointsTemp}
        />
      </div>
    ));

  const skillDisplayCrossClass = Object.values(skillTables)
    .filter((item) => item[selectedClass] === false)
    .map((item, index) => (
      <div key={index} className="col-4">
        <SkillEntry
          triggerArray={triggerArray}
          level={level}
          selectedClass={selectedClass}
          item={item}
          skillPoints={skillPointsTemp}
          setSkillPoints={setSkillPointsTemp}
        />
      </div>
    ));

  return (
    <>
      <div style={{ fontSize: "large", fontWeight: "bold" }}>
        Skill Points Remaining: {skillPointsTemp}
      </div>
      <br />
      <h5>
        Class Skills <em>(Spend 1 point)</em>
      </h5>
      <div className="grid grid-cols-2 md:grid-cols-4">{skillDisplayClass}</div>
      <br />
      <h5>
        Cross-Class Skills <em>(Spend 2 points)</em>
      </h5>
      <br />
      <div style={{ fontSize: "large", fontWeight: "bold" }}>
        Skill Points Remaining: {skillPointsTemp}
      </div>
      <br />
      <div className="grid grid-cols-2 md:grid-cols-4">
        {skillDisplayCrossClass}
      </div>
    </>
  );
};

export const SkillsQuick = ({selectedRace, quickCreate, selectedClass, int, setLearnedSkillsArray}) => {
  function rando(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const racialBonus = RaceBonuses[selectedRace];

  useEffect(() => {
    if (quickCreate === true) {
      learnedSkills = [];
      setLearnedSkillsArray([]);
      Object.values(skillTables)
        // .filter((item) => item.startingSkill.includes(props.selectedClass))
        .filter((item) => item[selectedClass] === true)
        .map((item, index) => learnedSkills.push(item));
      learnedSkills.map((item) => (item.skillLevel = 4));
      let difference =
        learnedSkills.length -
        (quickClassSkillPoints[selectedClass] +
          calculateModifier(int + racialBonus.bonusInt));
      for (let i = 0; i < difference; i++) {
        let v = rando(0, learnedSkills.length - 1);
        learnedSkills.splice(v, 1);
      }

      setLearnedSkillsArray(learnedSkills);
    }
  }, [quickCreate, selectedClass, selectedRace, int, racialBonus.bonusInt, setLearnedSkillsArray]);

  const quickSkillsDisplay = learnedSkills.map((item, index) => (
    <span style={{ fontSize: "small" }} key={index}>
      {item.skillName} ({item.skillLevel})<br />
    </span>
  ));

  return <>{quickSkillsDisplay}</>;
};
