import * as SpellLists from "../Spells/SpellLists";
import * as KnownSpells from "../Spells/KnownSpells";
import { useEffect, useState } from "react";

let spArray = [];

function calculateModifier(abil) {
  return -5 + Math.floor(1 * (abil / 2));
}

function rando(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const SpellListing = (props) => {
  /* eslint-disable no-eval */

  function handleCheck(event, item) {
    let func = eval(`props.setLevel${item.level}`);
    let tar = eval(`props.level${item.level}`);

    if (event.target.checked === true) {
      if (tar === 0) {
        return event.preventDefault(), alert("No more spell slots");
      } else {
        func(tar - 1);
        spArray.push(item);
        props.triggerUpdate();
      }
    }
    if (event.target.checked === false) {
      func(tar + 1);
    }
  }

  let lvlCheck = KnownSpells[props.selectedClass][props.level];
  let spellObject = SpellLists[props.selectedClass];

  function displayList(lvlFilter) {
    return Object.values(spellObject)
      .filter((item) => lvlCheck[item.level] > 0)
      .filter((item) => item.level === lvlFilter)
      .map((item, index) => (
        <div key={index} className="form-check col-4">
          <input
            className="form-check-input"
            type="checkbox"
            value={item.spellName}
            onChange={(event) => handleCheck(event, item)}
          />&nbsp;
          <label
            
            className="form-check-label"
            htmlFor="flexCheckDefault"
          >
            {item.spellName}
          </label>
        </div>
      ));
  };


  return (
    <div className="text-xs">
      <h6 className="font-semibold">Level 0 - {props.level0} slots remaining</h6>
      <div className="grid grid-cols-2 md:grid-cols-5 mb-1">{displayList(0)}</div>

      {displayList(1).length > 0 && (
        <>
          <h6 className="font-semibold">Level 1 - {props.level1} slots remaining</h6>
          <div className="grid grid-cols-2 md:grid-cols-5 mb-1">{displayList(1)}</div>
        </>
      )}
      {displayList(2).length > 0 && (
        <>
          <h6 className="font-semibold">Level 2 - {props.level2} slots remaining</h6>
          <div className="grid grid-cols-2 md:grid-cols-5 mb-1">{displayList(2)}</div>
        </>
      )}
      {displayList(3).length > 0 && (
        <>
          <h6 className="font-semibold">Level 3 - {props.level3} slots remaining</h6>
          <div className="grid grid-cols-2 md:grid-cols-5 mb-1">{displayList(3)}</div>
        </>
      )}
      {displayList(4).length > 0 && (
        <>
          <h6 className="font-semibold">Level 4 - {props.level4} slots remaining</h6>
          <div className="grid grid-cols-2 md:grid-cols-5 mb-1">{displayList(4)}</div>
        </>
      )}
      {displayList(5).length > 0 && (
        <>
          <h6 className="font-semibold">Level 5 - {props.level5} slots remaining</h6>
          <div className="grid grid-cols-2 md:grid-cols-5 mb-1">{displayList(5)}</div>
        </>
      )}
      {displayList(6).length > 0 && (
        <>
          <h6 className="font-semibold">Level 6 - - {props.level6} slots remaining</h6>
          <div className="grid grid-cols-2 md:grid-cols-5 mb-1">{displayList(6)}</div>
        </>
      )}
      {displayList(7).length > 0 && (
        <>
          <h6 className="font-semibold">Level 7 - {props.level7} slots remaining</h6>
          <div className="grid grid-cols-2 md:grid-cols-5 mb-1">{displayList(7)}</div>
        </>
      )}
      {displayList(8).length > 0 && (
        <>
          <h6 className="font-semibold">Level 8 - {props.level8} slots remaining</h6>
          <div className="grid grid-cols-2 md:grid-cols-5 mb-1">{displayList(8)}</div>
        </>
      )}
      {displayList(9).length > 0 && (
        <>
          <h6 className="font-semibold">Level 9 - {props.level9} slots remaining</h6>
          <div className="grid grid-cols-2 md:grid-cols-5 mb-1">{displayList(9)}</div>
        </>
      )}
    </div>
  );
};

export const SpellsMain = ({setSpellArray, setUpdated, updated, selectedClass, int, wis, chr, level, spellCaster}) => {
  const [level0, setLevel0] = useState(null);
  const [level1, setLevel1] = useState(null);
  const [level2, setLevel2] = useState(null);
  const [level3, setLevel3] = useState(null);
  const [level4, setLevel4] = useState(null);
  const [level5, setLevel5] = useState(null);
  const [level6, setLevel6] = useState(null);
  const [level7, setLevel7] = useState(null);
  const [level8, setLevel8] = useState(null);
  const [level9, setLevel9] = useState(null);

  function setSpellSlotsInState(key, value) {
    /* eslint-disable no-eval */
    let input = eval(key);
    input(value);
  }

  function triggerUpdate() {
    setSpellArray(spArray);
    setUpdated(!updated);
  }

 

  useEffect(()=>{
    spArray=[];
    setSpellArray([]);
  },[selectedClass, int, wis, chr, setSpellArray])

  useEffect(() => {
    // let mod = calculateModifier(props.int);
    let classMod;
    if (
      selectedClass !== "Barbarian" &&
      selectedClass !== "Monk" &&
      selectedClass !== "Rogue" &&
      selectedClass !== "Fighter"
    ) {
      if (
        selectedClass === "Sorcerer" ||
        selectedClass === "Bard"
      ) {
        classMod = chr;
      }
      if (selectedClass === "Wizard") {
        classMod = int;
      }
      if (
        selectedClass === "Cleric" ||
        selectedClass === "Druid" ||
        selectedClass === "Paladin" ||
        selectedClass === "Ranger"
      ) {
        classMod = wis;
      }
      let mod = calculateModifier(classMod);
      Object.entries(KnownSpells[selectedClass][level]).map(
        ([key, value], index) =>
          value != null && setSpellSlotsInState(`setLevel${key}`, value + mod)
      );
    }
  }, [level, selectedClass, int, chr, wis]);

  

  function checkLevel(lvlFilter) {
    if(selectedClass !== "Barbarian" &&
          
      selectedClass !== "Monk" &&
      selectedClass !== "Rogue" &&
      selectedClass !== "Fighter"){
    let lvlCheck = KnownSpells[selectedClass][level];
    let spellObject = SpellLists[selectedClass];

    let check = Object.values(spellObject)
      .filter((item) => lvlCheck[item.level] > 0)
      .filter((item) => item.level === lvlFilter)
      return(check)
      }
      else{
        return;
      }
  }
  if( selectedClass == "Barbarian" ||
          
    selectedClass == "Monk" ||
    selectedClass == "Rogue" ||
    selectedClass == "Fighter"){
      return <p>{selectedClass} is not a spellcasting class.</p>
    }
else{
  return (
    <div>
      <div className="font-semibold mb-2">
        Available Spells:</div>
        <div className="flex gap-3 mb-2">
        <div>{checkLevel(0).length>0 && `Level 0: ${level0}`}</div>
        <div> {checkLevel(1).length>0 && `Level 1: ${level1}`}</div>
        <div>{checkLevel(2).length>0 && `Level 2: ${level2}`}</div>
        <div>{checkLevel(3).length>0 && `Level 3: ${level3}`}</div>
        <div>{checkLevel(4).length>0 && `Level 4: ${level4}`}</div>
        <div>{checkLevel(5).length>0 && `Level 5: ${level5}`}</div>
        <div>{checkLevel(6).length>0 && `Level 6: ${level6}`}</div>
        <div>{checkLevel(7).length>0 && `Level 7: ${level7}`}</div>
       <div>{checkLevel(8).length>0 && `Level 8: ${level8}`}</div>
       <div>{checkLevel(9).length>0 && `Level 9: ${level9}`}</div>
      </div>
      <div>
        
            <SpellListing
              level0={level0}
              setLevel0={setLevel0}
              level1={level1}
              setLevel1={setLevel1}
              level2={level2}
              setLevel2={setLevel2}
              level3={level3}
              setLevel3={setLevel3}
              level4={level4}
              setLevel4={setLevel4}
              level5={level5}
              setLevel5={setLevel5}
              level6={level6}
              setLevel6={setLevel6}
              level7={level7}
              setLevel7={setLevel7}
              level8={level8}
              setLevel8={setLevel8}
              level9={level9}
              setLevel9={setLevel9}
              selectedClass={selectedClass}
              level={level}
              triggerUpdate={triggerUpdate}
              spellCaster={spellCaster}
            />
          
      </div>
    </div>
  )};
};

export const QuickSpellsMain = ({setSpellArray, selectedClass, chr, int, wis, level}) => {
  const [loaded, setLoaded] = useState(false);
  let classMod;



  

  
    if (
      !["Barbarian", "Monk", "Rogue", "Fighter"].includes(selectedClass)
    ) {
      if (["Sorcerer", "Bard"].includes(selectedClass)) {
        classMod = chr;
      } else if (selectedClass === "Wizard") {
        classMod = int;
      } else if (
        ["Cleric", "Druid", "Paladin", "Ranger"].includes(selectedClass)
      ) {
        classMod = wis;
      }
    }
 

  useEffect(() => {
    if(loaded===true){
      return;
    }
    function calculateModifier() {
      return -5 + Math.floor(1 * (classMod / 2));
    }
    let tempArray = [];
    spArray = [];
    if (
      ["Fighter", "Monk", "Barbarian", "Rogue"].includes(selectedClass)
    ) {
      return;
    } else {
      let spellSlots = KnownSpells[selectedClass][level];
      let spellObject = SpellLists[selectedClass];
      Object.entries(spellSlots).forEach(([key, value]) => {
        if (value != null) {
          Object.values(spellObject)
            .filter((item) => item.level === Number(key))
            .map((item) => tempArray.push(item));
          if (
            ["Bard", "Wizard", "Sorcerer", "Ranger", "Paladin"].includes(
              selectedClass
            )
          ) {
            let difference =
              tempArray.length - (Number(value) + calculateModifier());
            for (let i = 0; i < difference; i++) {
              let x = rando(0, difference.length - 1);
              tempArray.splice(x, 1);
            }
          }
          tempArray.forEach((item) => spArray.push(item));
        }
      });
      setSpellArray(spArray);
      setLoaded(true);
    }
  }, [classMod, loaded, selectedClass, wis, chr, int, level, setSpellArray]);

  const spellDisplay = spArray.map((item, index) => (
    <div className="text-xs" key={index}>
      {item.spellName}({item.level})
    </div>
  ));

  if (loaded) {
    return <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{spellDisplay}</div>;
  } else {
    return <div></div>;
  }
};
