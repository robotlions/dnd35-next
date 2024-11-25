"use client";
import { useState, useEffect, useRef } from "react";
import { AccordionMulti } from "../ui/Accordion";
import * as CharInfo from "../components/CharInfo";
import { NewScores } from "../components/AbilityScores";
import { BaseAttack } from "../components/BaseAttack";
import { StartingSilver } from "../components/Inventory";
import * as Skills from "../components/Skills";
import * as Feats from "../components/Feats";
import * as Spells from "../components/Spells";
import * as Inventory from "../components/Inventory";
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import Modal from "../ui/Modal";
import Link from "next/link";

export default function Standard() {
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
  const [munchkinMode, setMunchkinMode] = useState(false);
  const [basicEdited, setBasicEdited] = useState(false);
  const [spellCaster, setSpellCaster] = useState(false);
  const [show, setShow] = useState(false);
  const [baseAttack, setBaseAttack] = useState(0);
  const [quickCreate, setQuickCreate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nameCheck = charName !== "" ? charName : "Basic Info";
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  useEffect(() => {
    if (
      selectedClass === "Wizard" ||
      selectedClass === "Bard" ||
      selectedClass === "Paladin" ||
      selectedClass === "Sorcerer" ||
      selectedClass === "Druid" ||
      selectedClass === "Ranger" ||
      selectedClass === "Cleric"
    ) {
      setSpellCaster(true);
    } else {
      setSpellCaster(false);
    }
  }, [selectedClass]);

  function weaponHeaderDisplay() {
    let counts = {};
    weaponArray.forEach(function (x) {
      counts[x.weaponName] = (counts[x.weaponName] || 0) + 1;
    });
    let weaponSet = [...new Set(weaponArray)];

    return weaponSet.map((item, index) => (
      <div key={index}>
        <p className="text-lg font-semibold">
          {counts[item.weaponName] > 1 && counts[item.weaponName]}{" "}
          {item.weaponName} -{" "}
          <span style={{ fontWeight: "normal" }}>
            Damage: {item.dmgS}/{item.dmgM}
          </span>
        </p>
      </div>
    ));
  }

  function armorHeaderDisplay() {
    let counts = {};
    armorArray.forEach(function (x) {
      counts[x.armorName] = (counts[x.armorName] || 0) + 1;
    });
    let armorSet = [...new Set(armorArray)];

    return armorSet.map((item, index) => (
      <div key={index}>
        <p className="text-lg font-semibold">
          {counts[item.armorName] > 1 && counts[item.armorName]}{" "}
          {item.armorName} -{" "}
          <span style={{ fontWeight: "normal" }}>
            Armor Bonus: {item.armorBonus}
          </span>
        </p>
      </div>
    ));
  }

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

  const charInfoContent = (
    <div className="text-lg">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <div className="col-span-1 md:col-span-2">
          <CharInfo.CharName
            setCharName={setCharName}
            setBasicEdited={setBasicEdited}
          />
        </div>
        <div className="col-span-1 ">
          <CharInfo.AlignmentSelect
            alignment={alignment}
            setAlignment={setAlignment}
          />
        </div>
        <div className="col-span-1">
          <CharInfo.RaceSelect
            setBasicEdited={setBasicEdited}
            setSelectedRace={setSelectedRace}
          />
        </div>
        <div className="col-span-1">
          <CharInfo.ClassSelect
            setBasicEdited={setBasicEdited}
            setSelectedClass={setSelectedClass}
          />
        </div>
      </div>
      <br />
      <div className="grid grid-cols-3 md:grid-cols-3">
        <div>
          <span className="font-semibold">Level</span>
          {munchkinMode === true ? (
            <CharInfo.Level
              setBasicEdited={setBasicEdited}
              setLevel={setLevel}
            />
          ) : (
            <p>1</p>
          )}
        </div>
        <div>
          <span className="font-semibold">Hit Points</span>
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
          <span className="font-semibold">Armor Class</span>
          <CharInfo.ArmorClass
            setAC={setAC}
            armorBonusTotal={armorBonusTotal}
            setBaseAC={setBaseAC}
            dex={dex}
            selectedRace={selectedRace}
          />
        </div>
      </div>
    </div>
  );

  const abilitiesHeader = (
    <div>
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

  const abilitiesContent = (
    <div className="text-lg">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-8">
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
        <div className="col-span-2">
          <CharInfo.SavingThrows
            level={level}
            selectedClass={selectedClass}
            dex={dex}
            con={con}
            wis={wis}
          />
        </div>
        <div className="col-span-2">
          <BaseAttack
            str={str}
            level={level}
            selectedClass={selectedClass}
            setBaseAttack={setBaseAttack}
          />
        </div>
      </div>
    </div>
  );

  const moneyHeader = (
    <div className="accTitle">
      <h2>Money</h2>
      <span className="text-lg">
        {totalSilver > 0 && <div>{totalSilver} silver</div>}
      </span>
    </div>
  );

  const moneyContent = (
    <div>
      <p className="text-xl font-semibold">Silver: {totalSilver}</p>
      <br />
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

  const skillsContent = (
    <>
      <Skills.SkillsMain
        level={level}
        int={int}
        selectedRace={selectedRace}
        selectedClass={selectedClass}
        setLearnedSkillsArray={setLearnedSkillsArray}
        setSkillPoints={setSkillPoints}
        key={[selectedClass,int]}
      />
    </>
  );

  const featsHeader = (
    <div className="accTitle">
      <h2>Feats</h2>
      {featArray.map((item, index) => (
        <div key={index}>{item.featName}</div>
      ))}
    </div>
  );

  const featsContent = (
    <div>
      <Feats.FeatsMain
        featsSlots={featSlots}
        setFeatSlots={setFeatSlots}
        setFeatArray={setFeatArray}
        selectedRace={selectedRace}
        level={level}
      />
    </div>
  );

  const spellsContent = (
    <div>
      {spellCaster === true ? (
        <Spells.SpellsMain
          level={level}
          updated={updated}
          setUpdated={setUpdated}
          selectedClass={selectedClass}
          setSpellArray={setSpellArray}
          int={int}
          wis={wis}
          chr={chr}
          key={[selectedClass, int, wis, chr]}
        />
      ) : (
        `${selectedClass} is not a spellcasting class.`
      )}
    </div>
  );

  const armorHeader = (
    <div>
      <div className="accTitle">
        <h2>Armor</h2>

        {armorHeaderDisplay()}
      </div>
    </div>
  );

  const armorContent = (
    <div className="text-xs">
      <Inventory.ArmorMain
        setArmorBonusTotal={setArmorBonusTotal}
        totalSilver={totalSilver}
        setTotalSilver={setTotalSilver}
        setArmorMoney={setArmorMoney}
        updated={updated}
        setUpdated={setUpdated}
        setArmorArray={setArmorArray}
        weaponsMoney={weaponsMoney}
      />
    </div>
  );

  const weaponsHeader = (
    <div>
      <div className="accTitle">
        <h2>Weapons</h2>

        {weaponHeaderDisplay()}
      </div>
    </div>
  );

  const weaponsContent = (
    <div className="text-xs">
      <Inventory.WeaponsMain
        totalSilver={totalSilver}
        setTotalSilver={setTotalSilver}
        setWeaponsMoney={setWeaponsMoney}
        updated={updated}
        setUpdated={setUpdated}
        setWeaponArray={setWeaponArray}
        armorMoney={armorMoney}
      />
    </div>
  );

  // The accordion component iterates over this array to create the standard page layout

  const accordionItems = [
    { title: charInfoHeader, content: charInfoContent },
    { title: abilitiesHeader, content: abilitiesContent },
    { title: moneyHeader, content: moneyContent },
    { title: armorHeader, content: armorContent },
    { title: weaponsHeader, content: weaponsContent },
    { title: skillsHeader, content: skillsContent },
    { title: featsHeader, content: featsContent },
    { title: "Spells", content: spellsContent },
  ];
  return (
    <div className="justify-items-center">
      <div className="w-10/12 mt-10">
        <AccordionMulti accordionItems={accordionItems} />
      </div>

      {/* start modal test */}
      <div className="flex flex-col items-center justify-center p-4">
        {/* Button to open modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="min-w-52 font-[family-name:var(--font-imFell)] px-4 py-2 text-white font-semibold rounded bg-gradient-to-b from-sky-600 to-sky-400"
        >
          View and Print
        </button>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-semibold font-[family-name:var(--font-imFellSC)]">{charName}</h2>
          <div>
            <ComponentToPrint
              ref={contentRef}
              charName={charName}
              selectedClass={selectedClass}
              selectedRace={selectedRace}
              level={level}
              ac={ac}
              str={str}
              int={int}
              wis={wis}
              dex={dex}
              con={con}
              chr={chr}
              alignment={alignment}
              hp={hp}
              silver={totalSilver}
              armorArray={armorArray}
              weaponArray={weaponArray}
              learnedSkillsArray={learnedSkillsArray}
              featArray={featArray}
              spellArray={spellArray}
              baseAttack={baseAttack}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 mt-4 text-white bg-gradient-to-b from-sky-600 to-sky-400 rounded hover:bg-gradient-to-b hover:from-sky-400 hover:to-sky-300"
          >
            Close
          </button>
          &nbsp;
          <button
            onClick={handlePrint}
            className="px-4 py-2 mt-4 text-white bg-gradient-to-b from-emerald-600 to-emerald-400 rounded hover:bg-gradient-to-b hover:from-emerald-400 hover:to-emerald-300"
          >
            Print Character
          </button>
        </Modal>
      </div>
      <div className="mb-32 mt-10">
        <Link href="/">
          <button className="min-w-52 font-[family-name:var(--font-imFell)] px-4 py-2 text-white font-semibold rounded bg-gradient-to-b from-gray-600 to-gray-400">
            Start Over
          </button>
        </Link>
      </div>
    </div>
  );
}
