import { forwardRef } from "react";
import dndLogo from "../../../public/images/dndLogo.png";
import * as RaceBonuses from "../Races/AbilBonuses";
import * as CharInfo from "./CharInfo";
import { RaceInfo } from "../Races/RaceTables";
import * as KnownSpells from "../Spells/KnownSpells";
import Image from "next/image";

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
      <div
        style={{ fontSize: "x-small" }}
        className="grid grid-cols-2 md:grid-cols-8"
        key={index}
      >
        <div className="col" style={{ fontWeight: "bold" }}>
          {counts[item.armorName] > 1 && counts[item.armorName]}{" "}
          {item.armorName}
        </div>

        <div className="col">Armor Bonus: {item.armorBonus}</div>
        <div className="col">Max Dex Bonus: {item.maxDexBonus}</div>
        <div className="col">Armor Check: {item.armorCheck}</div>
        <div className="col">Spell Fail: {item.spellFail}</div>
        <div className="col">Speed 30: {item.speed30}</div>
        <div className="col">Speed 20: {item.speed20}</div>
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
      <div
        style={{ fontSize: "x-small" }}
        className="grid grid-cols-2 md:grid-cols-8"
        key={index}
      >
        <div className="col" style={{ fontWeight: "bold" }}>
          {counts[item.weaponName] > 1 && counts[item.weaponName]}{" "}
          {item.weaponName}
        </div>
        <div className="col">Damage, Small: {item.dmgS}</div>
        <div className="col">Damage, Medium: {item.dmgM}</div>
        <div className="col">Critical: {item.critical}</div>
        <div className="col">Range: {item.range}</div>
        <div className="col">Type: {item.type}</div>
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
          <div key={index} className="mb-2">
            {item.spellName}
          </div>
        ));
    }
  }

  function showSpells() {
    if (
      props.selectedClass !== "Barbarian" &&
      props.selectedClass !== "Monk" &&
      props.selectedClass !== "Rogue" &&
      props.selectedClass !== "Fighter"
    ) {
      return (
        <div style={{ fontSize: "small" }}>
          {displayList(0).length > 0 && (
            <>
              <h6 className="font-semibold">Level 0</h6>
              <div className="flex gap-2">{displayList(0)}</div>
            </>
          )}
          {displayList(1).length > 0 && (
            <>
              <br />
              <h6 className="font-semibold">Level 1</h6>
              <div className="flex gap-2">{displayList(1)}</div>
            </>
          )}
          {displayList(2).length > 0 && (
            <>
              <br />
              <h6 className="font-semibold">Level 2</h6>
              <div className="flex gap-2">{displayList(2)}</div>
            </>
          )}
          {displayList(3).length > 0 && (
            <>
              <br />
              <h6 className="font-semibold">Level 3</h6>
              <div className="flex gap-2">{displayList(3)}</div>
            </>
          )}
          {displayList(4).length > 0 && (
            <>
              <br />
              <h6 className="font-semibold">Level 4</h6>
              <div className="flex gap-2">{displayList(4)}</div>
            </>
          )}
          {displayList(5).length > 0 && (
            <>
              <br />
              <h6 className="font-semibold">Level 5</h6>
              <div className="flex gap-2">{displayList(5)}</div>
            </>
          )}
          {displayList(6).length > 0 && (
            <>
              <br />
              <h6 className="font-semibold">Level 6</h6>
              <div className="flex gap-2">{displayList(6)}</div>
            </>
          )}
          {displayList(7).length > 0 && (
            <>
              <br />
              <h6 className="font-semibold">Level 7</h6>
              <div className="grid grid-cols-6 text-xs">{displayList(7)}</div>
            </>
          )}
          {displayList(8).length > 0 && (
            <>
              <br />
              <h6 className="font-semibold">Level 8</h6>
              <div className="flex gap-2">{displayList(8)}</div>
            </>
          )}
          {displayList(9).length > 0 && (
            <>
              <br />
              <h6 className="font-semibold">Level 9</h6>
              <div className="flex gap-2">{displayList(9)}</div>
            </>
          )}
        </div>
      );
    }
  }
// This constant draws an SVG shield shape and places the armor class (props.ac) in the center
  const shieldSVG = (
    <svg
      width="150"
      height="150"
      viewBox="0 0 200 250"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 45 
         L150 50 
         Q175 120 100 200 
         Q25 120 50 50 
         Z"
        fill="white"
        stroke="#000000"
        strokeWidth="2"
      />
      <text
        x="100"
        y="80"
        textAnchor="middle"
        fontSize="20"
        className="font-semibold"
        fill="#000000"
      >
        Armor
      </text>
      <text
        x="100"
        y="100"
        textAnchor="middle"
        fontSize="20"
        className="font-semibold"
        fill="#000000"
      >
        Class
      </text>
      <text x="100" y="130" textAnchor="middle" fontSize="30" fill="#000000">
        {props.ac}
      </text>
    </svg>
  );

  return (
    <div className="mx-10 font-[family-name:var(--font-imFell)]" ref={ref}>
      <div className="flex justify-center">
        <Image
          alt="vintage d&d logo"
          style={{ maxWidth: "30%" }}
          src={dndLogo}
        ></Image>
      </div>
      <br />
      <div className="grid grid-cols-3" style={{ fontSize: "small" }}>
        <div className="font-semibold">
          Name: <span className="font-normal">{props.charName}</span>
        </div>
        <div className="font-semibold">
          Class: <span className="font-normal">{props.selectedClass}</span>
        </div>
        <div className="font-semibold">
          Race:{" "}
          <span className="font-normal">
            {RaceInfo[props.selectedRace].raceName}
          </span>
        </div>
      </div>
      <div
        className="grid grid-cols-3"
        style={{ fontSize: "small", marginBottom: 10 }}
      >
        <div className="font-semibold">
          Alignment: <span className="font-normal">{props.alignment}</span>
        </div>
        <div className="font-semibold">
          Hit Points: <span className="font-normal">{props.hp}</span>
        </div>
        <div className="font-semibold">
          Level: <span className="font-normal">{props.level}</span>
        </div>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-12"
        style={{ fontSize: "small" }}
      >
        <div className="col-span-6">
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
              <tr className="bg-gray-200">
                <td>STR</td>
                <td>{props.str}</td>
                <td>
                  {racialBonus.bonusStr <= 0
                    ? racialBonus.bonusStr
                    : racialBonus.bonusStr}
                </td>
                <td className="totalScore">
                  {props.str + racialBonus.bonusStr}
                </td>

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
                <td className="totalScore">
                  {props.dex + racialBonus.bonusDex}
                </td>

                <td>{calculateModifier(props.dex + racialBonus.bonusDex)}</td>
              </tr>
              <tr className="bg-gray-200">
                <td>CON</td>
                <td>{props.con}</td>
                <td>
                  {racialBonus.bonusCon <= 0
                    ? racialBonus.bonusCon
                    : racialBonus.bonusCon}
                </td>
                <td className="totalScore">
                  {props.con + racialBonus.bonusCon}
                </td>

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
                <td className="totalScore">
                  {props.int + racialBonus.bonusInt}
                </td>

                <td>{calculateModifier(props.int + racialBonus.bonusInt)}</td>
              </tr>
              <tr className="bg-gray-200">
                <td>WIS</td>
                <td>{props.wis}</td>
                <td>
                  {racialBonus.bonusWis <= 0
                    ? racialBonus.bonusWis
                    : racialBonus.bonusWis}
                </td>
                <td className="totalScore">
                  {props.wis + racialBonus.bonusWis}
                </td>

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
                <td className="totalScore">
                  {props.chr + racialBonus.bonusChr}
                </td>

                <td>{calculateModifier(props.chr + racialBonus.bonusChr)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-span-2">
          <CharInfo.SavingThrows
            level={props.level}
            selectedClass={props.selectedClass}
            dex={props.dex}
            con={props.con}
            wis={props.wis}
          />
        </div>
        <div style={{ textAlign: "center" }} className="col-span-1">
          <h6 className="font-semibold">Base Attack</h6>
          <p>{props.baseAttack}</p>
          {/* <h6 className="font-semibold">Armor Class</h6>
          <p>{props.ac}</p> */}
        </div>
        <div>{shieldSVG}</div>
      </div>
      <div className="row" style={{ fontSize: "small", marginTop: 10 }}>
        <div className="col">
          <span>
            <span style={{ fontSize: "1rem", fontWeight: 700 }}>Silver:</span>{" "}
            {props.silver}
          </span>
        </div>
      </div>
      <br />
      <div className="text-sm font-semibold">Armor</div>

      <div className="border-solid border-2 border-gray-500 p-1">
        {armorHeaderDisplay()}
      </div>
      <div className="text-sm font-semibold">Weapons</div>

      <div className="border-solid border-2 border-gray-500 p-1">
        {weaponHeaderDisplay()}
      </div>
     
      <div className="text-sm font-semibold">Skills</div>

      <div className="border-solid border-2 border-gray-500 p-1">
        {props.learnedSkillsArray.length > 0 && (
          <>
            <em className="text-sm">Class</em>
            <div className="grid grid-cols-3 sm:grid-cols-7">
              {props.learnedSkillsArray
                .filter((item) => item[props.selectedClass] === true)
                .map((item, index) => (
                  <span className="text-xs" key={index}>
                    {" "}
                    - {item.skillName} ({item.skillLevel})
                  </span>
                ))}
            </div>

            <em className="text-sm">Cross-class</em>
            <div className="grid grid-cols-3 sm:grid-cols-7">
              {props.learnedSkillsArray
                .filter((item) => item[props.selectedClass] === false)
                .map((item, index) => (
                  <span className="text-xs" key={index}>
                    {" "}
                    - {item.skillName} ({item.skillLevel})
                  </span>
                ))}
            </div>
          </>
        )}
      </div>
      <div className="text-sm font-semibold">Feats</div>
      <div className="border-solid border-2 border-gray-500 p-1">
        <div className="grid grid-cols-3 sm:grid-cols-7">
          {props.featArray.map((item, index) => (
            <div className="text-xs" key={index}>
              {item.featName}
            </div>
          ))}
        </div>
      </div>
      {/* <div className="pagebreak"></div> */}
      <div className="text-sm font-semibold">Spells</div>
      <div className="border-solid border-2 border-gray-500">
        {showSpells()}
      </div>
    </div>
  );
});

ComponentToPrint.displayName = "CharacterPrint"
