"use client";
import { useState } from "react";
import { AccordionCustom } from "../ui/Accordion";
import * as CharInfo from "../components/CharInfo";
import { NewScores } from "../components/AbilityScores";
import { BaseAttack } from "../components/BaseAttack";
import { StartingSilver } from "../components/Inventory";
import * as Skills from "../components/Skills";


export default function Standard() {
  const [modeChosen, setModeChosen] = useState(false);
  const [quickMode, setQuickMode] = useState(false);
  const [selectedRace, setSelectedRace] = useState("human");
  const [selectedClass, setSelectedClass] = useState("Fighter");
  const [con, setCon] = useState(10);
  const [dex, setDex] = useState(10);
  const [wis, setWis] = useState(10);
  const [int, setInt] = useState(10);
  const [str, setStr] = useState(10);
  const [chr, setChr] = useState(10);
  const [charName, setCharName] = useState("Basic Info");
  const [level, setLevel] = useState(1);
  const [totalSilver, setTotalSilver] = useState(0);
  const [updated, setUpdated] = useState(false);
  const [armorMoney, setArmorMoney] = useState(0);
  const [ac, setAC] = useState(10);
  const [armorBonusTotal, setArmorBonusTotal] = useState(0);
  const [baseAC, setBaseAC] = useState(0);
  const [weaponsMoney, setWeaponsMoney] = useState(0);
  const [alignment, setAlignment] = useState("Lawful Good");
  const [hp, setHP] = useState(0);
  const [armorArray, setArmorArray] = useState([]);
  const [weaponArray, setWeaponArray] = useState([]);
  const [spellArray, setSpellArray] = useState([]);
  const [learnedSkillsArray, setLearnedSkillsArray] = useState([]);
  const [skillPoints, setSkillPoints] = useState([]);
  const [rolled, setRolled] = useState(false);
  const [featArray, setFeatArray] = useState([]);
  const [featSlots, setFeatSlots] = useState(0);
  const [fontThemeFantasy, setFontThemeFantasy] = useState(false);
  const [munchkinMode, setMunchkinMode] = useState(false);
  const [basicEdited, setBasicEdited] = useState(false);
  const [spellCaster, setSpellCaster] = useState(false);
  const [show, setShow] = useState(false);
  const [baseAttack, setBaseAttack] = useState(0);
  const [quickCreate, setQuickCreate] = useState(false);

  const nameCheck = charName !== "" ? charName : "Basic Info";

  const charInfoHeader = (
    <div className="accTitle">
      <h2>{nameCheck}</h2>
      {basicEdited === true && (
        <div>
          <p className="text-xl">
            {alignment}{" "}
            {selectedRace != "select" &&
              selectedRace.charAt(0).toUpperCase() + selectedRace.slice(1)}{" "}
            {selectedClass}
          </p>
          <div className="text-lg">
            <span style={{ fontWeight: "bold" }}>Level: </span>
            <span style={{ marginRight: 10 }}>{level}</span>

            <span style={{ fontWeight: "bold" }}>Hit Points: </span>
            <span style={{ marginRight: 10 }}>{hp}</span>

            <span style={{ fontWeight: "bold" }}>Armor Class: </span>
            {ac}
          </div>
        </div>
      )}
    </div>
  );

  const charInfoBlock = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="col-span-2">
          <CharInfo.CharName
            setCharName={setCharName}
            setBasicEdited={setBasicEdited}
          />
        </div>
        <CharInfo.AlignmentSelect
          alignment={alignment}
          setAlignment={setAlignment}
        />
        <CharInfo.RaceSelect
          setBasicEdited={setBasicEdited}
          setSelectedRace={setSelectedRace}
        />
        <CharInfo.ClassSelect
          setBasicEdited={setBasicEdited}
          setSelectedClass={setSelectedClass}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div>
          Level
          {munchkinMode === true ? (
            <CharInfo.Level
              setBasicEdited={setBasicEdited}
              setLevel={setLevel}
            />
          ) : (
            <p>1</p>
          )}
        </div>
        <div className="col">
          Hit Points
          <CharInfo.HitPoints
            setHP={setHP}
            level={level}
            selectedClass={selectedClass}
            con={con}
            setCon={setCon}
            selectedRace={selectedRace}
            featArray={featArray}
          />
        </div>
        <div className="col">
          Armor Class
          <CharInfo.ArmorClass
            setAC={setAC}
            armorBonusTotal={armorBonusTotal}
            setBaseAC={setBaseAC}
            dex={dex}
            selectedRace={selectedRace}
          />
        </div>
      </div>
    </>
  );

  const abilitiesHeader = (
    <div className="accTitle">
      <h2>Abilities and Saves</h2>
      {rolled === true && (
        <div className="text-lg">
          <span style={{ fontWeight: "bold" }}>Str </span>
          {str}&nbsp;
          <span style={{ fontWeight: "bold" }}>Dex </span>
          {dex}&nbsp;
          <span style={{ fontWeight: "bold" }}>Con </span>
          {con}&nbsp;
          <span style={{ fontWeight: "bold" }}>Int </span>
          {int}&nbsp;
          <span style={{ fontWeight: "bold" }}>Wis </span>
          {wis}&nbsp;
          <span style={{ fontWeight: "bold" }}>Chr </span>
          {chr}&nbsp;
        </div>
      )}
    </div>
  );

  const abilitiesBlock = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="col-span-3">
          <NewScores
            setStr={setStr}
            setChr={setChr}
            setInt={setInt}
            setWis={setWis}
            setDex={setDex}
            setCon={setCon}
            selectedRace={selectedRace}
            setRolled={setRolled}
            munchkinMode={munchkinMode}
          />
        </div>
        <div>
          <CharInfo.SavingThrows
            level={level}
            selectedClass={selectedClass}
            dex={dex}
            con={con}
            wis={wis}
          />
        </div>
        <div>
          <BaseAttack
            str={str}
            level={level}
            selectedClass={selectedClass}
            setBaseAttack={setBaseAttack}
          />
        </div>
      </div>
    </>
  );

  const moneyHeader = (
    <div className="accTitle">
      <h2>Money</h2>
      <span className="text-lg">{totalSilver > 0 && <div>{totalSilver} silver</div>}</span>
    </div>
  );

  const moneyBlock = (
    <div>
      <p>Silver: {totalSilver}</p>
      <StartingSilver
        setWeaponsMoney={setWeaponsMoney}
        setArmorMoney={setArmorMoney}
        totalSilver={totalSilver}
        selectedClass={selectedClass}
        setTotalSilver={setTotalSilver}
        munchkinMode={munchkinMode}
      />
    </div>
  );

  const skillsHeader = (

    <div className="accTitle">
                  <h2>Skills</h2>

                  {learnedSkillsArray.length > 0 && (
                    <div className="text-base">
                      <div>
                        <span>
                          <em>Class</em>
                        </span>
                        {learnedSkillsArray
                          .filter((item) => item[selectedClass] === true)
                          .map((item, index) => (
                            <span key={index}> - {item.skillName}</span>
                          ))}
                      </div>
                      <div>
                        <span>
                          <em>Cross-class</em>
                        </span>
                        {learnedSkillsArray
                          .filter((item) => item[selectedClass] === false)
                          .map((item, index) => (
                            <span key={index}> - {item.skillName}</span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
  );

  const skillsBlock = (

    <>
     <Skills.SkillsMain
                  level={level}
                  int={int}
                  selectedRace={selectedRace}
                  selectedClass={selectedClass}
                  setLearnedSkillsArray={setLearnedSkillsArray}
                  setSkillPoints={setSkillPoints}
                /></>
  );
  // The accordion component iterates over this array to create the standard page layout

  const accordionItems = [
    { title: charInfoHeader, content: charInfoBlock },
    { title: abilitiesHeader, content: abilitiesBlock },
    { title: moneyHeader, content: moneyBlock },
    {title: skillsHeader, content: skillsBlock},
  ];
  return (
    <div className="justify-items-center">
      <div className="w-10/12 mt-10">
        <AccordionCustom accordionItems={accordionItems} />
      </div>
    </div>
  );
}
