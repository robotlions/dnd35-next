"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
import dndBanner from "../../../public/images/dnd2000Logo.png";
import lawfulTile from "../../../public/images/lawfulTile.png"
import { BannerCard } from "../ui/BannerCard";
import neutralTile from "../../../public/images/neutralTile.png";
import { QuickScores } from "../components/QuickScores";
import { charNames } from "../Data/CharNames";
import Modal from "../ui/Modal";
import Link from "next/link";




export default function Quick(){

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

    function rando(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    
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
      }

    return(
        
        <div className="justify-items-center mt-10">
        <BannerCard
            title="Neutral"
            text="Choose a race, class and aligment, then create the character with a single click."
            imageUrl={neutralTile.src}
          />
          
        <div className="w-10/12 mt-10">
        <h5 className="text-center font-semibold text-lg mb-3 font-[family-name:var(--font-imFell)]">Choose your race, class and alignment, then hit Go!</h5>

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
      <div className="flex justify-center mt-5">
      <button className="min-w-52 font-[family-name:var(--font-imFell)] px-4 py-2 text-white font-semibold rounded bg-gradient-to-b from-neutralGreen to-emerald-700 hover:bg-gradient-to-b hover:from-emerald-700 hover:to-emerald-500"
      onClick={()=>createInstantCharacter()}
      >

        Go!</button>
      </div>
      <>
              <div className="row">
                <div className="col-2">
                  <p>Name: {charName !== "Basic Info" ? charName : ""}</p>
                </div>
                <div className="col-2">
                  <p>Level: {level}</p>
                </div>
                <div className="col-2">
                  <p>
                    Race:{" "}
                    {selectedRace.charAt(0).toUpperCase() +
                      selectedRace.slice(1)}
                  </p>
                </div>
                <div className="col-2">
                  <p>Class: {selectedClass}</p>
                </div>
                <div className="col-2">
                  <p>Alignment: {alignment}</p>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3">
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
                    munchkinMode={munchkinMode}
                  />
                  <div style={{ textAlign: "center", marginTop: 20 }}>
                    <button
                      className="btn btn-secondary rounded-0"
                      onClick={() => quickRollStats()}
                    >
                      Reroll Stats
                    </button>
                  </div>
                </div>

                <div className="col-2 col-md-2" style={{ textAlign: "center" }}>
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
                <div className="col-3 col-md-2" style={{ textAlign: "center" }}>
                  <span style={{ fontWeight: "bold" }}>Armor Class:</span>
                  <CharInfo.ArmorClass
                    setAC={setAC}
                    armorBonusTotal={armorBonusTotal}
                    setBaseAC={setBaseAC}
                    dex={dex}
                    selectedRace={selectedRace}
                  />
                </div>
                <div className="col-4 col-md-2" style={{ textAlign: "center" }}>
                  <CharInfo.SavingThrows
                    level={level}
                    selectedClass={selectedClass}
                    dex={dex}
                    con={con}
                    wis={wis}
                  />
                </div>
                <div className="col-3 col-md-1" style={{ textAlign: "center" }}>
                  <BaseAttack
                    str={str}
                    level={level}
                    selectedClass={selectedClass}
                    setBaseAttack={setBaseAttack}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3">
                  <p style={{ fontWeight: "bold" }}>Weapons and Armor</p>
                  <Inventory.WeaponsAndArmorQuick
                    setArmorBonusTotal={setArmorBonusTotal}
                    totalSilver={totalSilver}
                    setArmorMoney={setArmorMoney}
                    updated={updated}
                    setUpdated={setUpdated}
                    setArmorArray={setArmorArray}
                    weaponsMoney={weaponsMoney}
                    weaponArray={weaponArray}
                    setWeaponArray={setWeaponArray}
                    selectedClass={selectedClass}
                    quickCreate={quickCreate}
                  />
                </div>

                <div className="col-2">
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
                <div className="col-1">
                  <p style={{ fontWeight: "bold" }}>Feats</p>
                  <Feats.FeatsQuick
                    featArray={featArray}
                    setFeatArray={setFeatArray}
                    selectedClass={selectedClass}
                    quickCreate={quickCreate}
                    selectedRace={selectedRace}
                  />
                </div>
                <div className="col-6">
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
              <div
                className="row justify-content-center"
                style={{ marginTop: 20 }}
              >
                <div className="col-auto">
                  <button
                    name="printCharacterButton"
                    variant="secondary rounded-0 bg-gradient"
                    onClick={(e) => handleShow()}
                  >
                    {/* <Button name="printCharacterButton" variant="secondary rounded-0" onClick={(e)=>{console.log(e)}}> */}
                    View and Print Character
                  </button>
                </div>
              </div>
              <div
                className="row justify-content-center"
                style={{ marginTop: 20 }}
              >
                <div className="col-auto">
                  <button
                    variant="info rounded-0 bg-gradient"
                    onClick={() => window.location.reload()}
                  >
                    Start Over
                  </button>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <p style={{ marginTop: 50 }}>
                    &copy;2024 by{" "}
                    <a
                      style={{
                        textDecoration: "none",
                        color: "#779241",
                        fontWeight: "bold",
                      }}
                      href="https://chadmusick.com"
                    >
                      Chad Musick
                    </a>
                  </p>
                </div>
              </div>
            </>
      </div>
      </div>
    )
}