"use client";
import { useState, useRef } from "react";
import * as CharInfo from "../components/CharInfo";
import { BaseAttack } from "../components/BaseAttack";
import * as Skills from "../components/Skills";
import * as Feats from "../components/Feats";
import * as Spells from "../components/Spells";
import * as Inventory from "../components/Inventory";
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import { BannerCard } from "../ui/BannerCard";
import neutralTile from "../../../public/images/neutralTile.png";
import { QuickScores } from "../components/QuickScores";
import { charNames } from "../Data/CharNames";
import Link from "next/link";
import Modal from "../ui/Modal";
import { CustomButton } from "../ui/Buttons";
import { GenerateWeaponsAndArmorQuick } from "../components/QuickInventory";

export default function Quick() {
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
  // const [armorBonusTotal, setArmorBonusTotal] = useState(0);
  const [baseAC, setBaseAC] = useState(0);
  const [weaponsMoney, setWeaponsMoney] = useState(0);
  const [alignment, setAlignment] = useState("Lawful Good");
  const [hp, setHP] = useState(0);
  const [armorArray, setArmorArray] = useState([]);
  const [weaponArray, setWeaponArray] = useState([]);
  const [spellArray, setSpellArray] = useState([]);
  const [learnedSkillsArray, setLearnedSkillsArray] = useState([]);
  const [rolled, setRolled] = useState(false);
  const [featArray, setFeatArray] = useState([]);
  const [basicEdited, setBasicEdited] = useState(false);
  const [baseAttack, setBaseAttack] = useState(0);
  const [quickCreate, setQuickCreate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [characterCreated, setCharacterCreated] = useState(false);

  const nameCheck = charName !== "" ? charName : "Basic Info";
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  function rando(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // function armorBonusTotal() {
  //   return armorArray.reduce((a, b) => a + b.armorBonus, 0);
  // }

  const armorBonusTotal =
    armorArray.reduce((a, b) => a + b.armorBonus, 0);
  

 
  const purchasedArmor = armorArray.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-3 text-xs"
      
    >
      <div>
        <p className="font-semibold">{item.armorName}</p>
      </div>
      <div>
        <p>Armor Bonus: {item.armorBonus}</p>
      </div>

      <div>
        <p>Armor Check: {item.armorCheck}</p>
      </div>
    </div>
  ));

  const purchasedWeapons = weaponArray.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-3 text-xs"
      
    >
      <div>
        <p className="font-semibold">{item.weaponName}</p>
      </div>
      <div>
        <p>Damage: {item.dmgM}</p>
      </div>
      <div>
        <p>Type: {item.type}</p>
      </div>
    </div>
  ));
  
  

  function quickRollStats() {
    let statArray = [];
    let largestInt;
    let abilFunc;
    let abilArray = [setStr, setInt, setWis, setDex, setCon, setChr];
    for (let i = 0; i < 6; i++) {
      let x = rando(3, 6) + rando(3, 6) + rando(3, 6);
      statArray.push(Number(x));
    }
    largestInt = Math.max(...statArray);

    if (["Fighter", "Paladain", "Barbarian"].includes(selectedClass)) {
      abilFunc = setStr;
    } else if (["Rogue", "Ranger"].includes(selectedClass)) {
      abilFunc = setDex;
    } else if (["Sorcerer, Bard"].includes(selectedClass)) {
      abilFunc = setChr;
    } else if (["Druid", "Cleric", "Monk"].includes(selectedClass)) {
      abilFunc = setWis;
    } else if (["Wizard"].includes(selectedClass)) {
      abilFunc = setInt;
    } else {
      abilFunc = setCon;
    }

    abilFunc(largestInt);
    statArray.splice(statArray.indexOf(largestInt), 1);
    abilArray.splice(abilArray.indexOf(abilFunc), 1);

    for (let i = 0; i < abilArray.length; i++) {
      let r = rando(0, abilArray.length - 1);
      abilFunc = abilArray[r];
      abilFunc(statArray[0]);
      statArray.splice(0, 1);
      abilArray.splice(abilArray.indexOf(abilFunc), 1);
    }
  }

  function createInstantCharacter() {
    setLevel(1);
    setCharName(charNames[rando(0, charNames.length - 1)]);
    quickRollStats();
    setQuickCreate(true);
    setTotalSilver(500);
    setCharacterCreated(true);
  }


  const introBlock = (
    <>
      <h5 className="text-center font-semibold text-lg mb-3 font-[family-name:var(--font-imFell)]">
        Choose your race, class and alignment, then hit Go!
      </h5>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-[family-name:var(--font-imFell)]">
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
      <div className="flex justify-center mt-5 mb-5">
        <CustomButton
          label="Go!"
          color="neutral"
          onClick={() => createInstantCharacter()}
        />
      </div>
    </>
  );

  const characterBlock = (
    <>
      <h3 className="text-3xl font-semibold text-center mb-10 font-[family-name:var(--font-imFellSC)]">
        {charName} the{" "}
        {selectedRace.charAt(0).toUpperCase() + selectedRace.slice(1)}{" "}
        {selectedClass}
      </h3>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-4">
          <p className="font-semibold">
            Name:{" "}
            <span className="font-normal">
              {charName !== "Basic Info" ? charName : ""}
            </span>
          </p>
        </div>
        <div className="col-span-6 md:col-span-2">
          <p className="font-semibold">
            Level: <span className="font-normal">{level}</span>
          </p>
        </div>
        <div className="col-span-6 md:col-span-2">
          <p className="font-semibold">
            Race:{" "}
            <span className="font-medium">
              {selectedRace.charAt(0).toUpperCase() + selectedRace.slice(1)}
            </span>
          </p>
        </div>
        <div className="col-span-6 md:col-span-2">
          <p className="font-semibold">
            Class: <span className="font-medium">{selectedClass}</span>
          </p>
        </div>
        <div className="col-span-6 md:col-span-2">
          <p className="font-semibold">
            Alignment: <span className="font-medium">{alignment}</span>
          </p>
        </div>
      </div>
      <br />
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-4">
          <QuickScores
            str={str}
            chr={chr}
            int={int}
            wis={wis}
            dex={dex}
            con={con}
            setStr={setStr}
            setChr={setChr}
            setInt={setInt}
            setWis={setWis}
            setDex={setDex}
            setCon={setCon}
            selectedRace={selectedRace}
            setRolled={setRolled}
          />
          <div className="mt-3">
            <CustomButton
              label="Reroll Stats"
              color="blue"
              onClick={() => quickRollStats()}
            />
          </div>
        </div>

        <div
          className="col-span-6 md:col-span-2"
          style={{ textAlign: "center" }}
        >
          <span style={{ fontWeight: "bold" }}>Hit Points:</span>
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
        <div
          className="col-span-6 md:col-span-2"
          style={{ textAlign: "center" }}
        >
          <span style={{ fontWeight: "bold" }}>Armor Class:</span>
          <CharInfo.ArmorClass
            setAC={setAC}
            armorBonusTotal={armorBonusTotal}
            setBaseAC={setBaseAC}
            dex={dex}
            selectedRace={selectedRace}
          />
        </div>
        <div
          className="col-span-6 md:col-span-2"
          style={{ textAlign: "center" }}
        >
          <CharInfo.SavingThrows
            level={level}
            selectedClass={selectedClass}
            dex={dex}
            con={con}
            wis={wis}
          />
        </div>
        <div
          className="col-span-6 md:col-span-2"
          style={{ textAlign: "center" }}
        >
          <BaseAttack
            str={str}
            level={level}
            selectedClass={selectedClass}
            setBaseAttack={setBaseAttack}
          />
        </div>
      </div>
      <br />
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-3">
          <p style={{ fontWeight: "bold" }}>Weapons and Armor</p>
          {/* <Inventory.WeaponsAndArmorQuick
          setArmorBonusTotal={setArmorBonusTotal}
          totalSilver={totalSilver}
          updated={updated}
          setUpdated={setUpdated}
          setArmorArray={setArmorArray}
          weaponArray={weaponArray}
          setWeaponArray={setWeaponArray}
          selectedClass={selectedClass}
          armorArray={armorArray}
          quickCreate={quickCreate}

        /> */}
        <GenerateWeaponsAndArmorQuick
          // setArmorBonusTotal={setArmorBonusTotal}
          weaponArray={weaponArray}
          selectedClass={selectedClass}
          armorArray={armorArray}
          setArmorArray={setArmorArray}
          setWeaponArray={setWeaponArray}

        />
         {purchasedArmor}{purchasedWeapons}
        </div>

        <div className="col-span-12 md:col-span-3">
          <p style={{ fontWeight: "bold" }}>Skills</p>
          <Skills.SkillsQuick
            learnedSkillsArray={learnedSkillsArray}
            setLearnedSkillsArray={setLearnedSkillsArray}
            selectedClass={selectedClass}
            quickCreate={quickCreate}
            int={int}
            selectedRace={selectedRace}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <p style={{ fontWeight: "bold" }}>Feats</p>
          <Feats.FeatsQuick
            featArray={featArray}
            setFeatArray={setFeatArray}
            selectedClass={selectedClass}
            quickCreate={quickCreate}
            selectedRace={selectedRace}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <p style={{ fontWeight: "bold" }}>Spells(level)</p>
          <Spells.QuickSpellsMain
            level={level}
            selectedClass={selectedClass}
            setSpellArray={setSpellArray}
            int={int}
            wis={wis}
            chr={chr}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-4 mt-14">
        {/* Modal */}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-semibold font-[family-name:var(--font-imFellSC)]">
            {charName}
          </h2>
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
          <div className="mt-5">
            <CustomButton
              color="gray"
              label="Close"
              onClick={() => setIsModalOpen(false)}
            />
            &nbsp;
            <CustomButton
              color="blue"
              label="Print Character"
              onClick={handlePrint}
            />
          </div>
        </Modal>
      </div>
    </>
  );

  return (
    <div className="grid grid-cols-1 justify-items-center mt-10 font-[family-name:var(--font-imFell)]">
      <BannerCard
        title="Neutral"
        text="Choose a race, class and aligment, then create the character with a single click."
        imageUrl={neutralTile.src}
      />

      <div className="w-10/12 mt-10">
        {characterCreated === false ? introBlock : characterBlock}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3 justify-items-center mb-20">
        
        <div>
          <Link href="/">
            <CustomButton color="gray" label="Back to Home" />
          </Link>
        </div>
        <div>
          {characterCreated === true && (
            <CustomButton
              color="blue"
              label="View and Print"
              onClick={() => setIsModalOpen(true)}
            />
          )}
        </div>
        <div>
          <CustomButton
            color="gray"
            label="Start Over"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
      </div>
    </div>
  );
}
