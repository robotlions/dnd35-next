import { useEffect, useState } from "react";
import React from "react";
import { ArmorTable } from "../Equipment/ArmorTables";
import { ShieldTable } from "../Equipment/ArmorTables";
import * as WeaponTables from "../Equipment/WeaponTables";
import { CustomButton } from "../ui/Buttons";

function rando(min, max) {
  return Math.floor(Math.random() * max) + min;
}

//in a previous release, the total silver was calculated by the starting silver minus
//  the sum of these two equations. I've sinced changed the way the silver is calculated,
// but I'm holding on to these two functions just in case.

//   function armorCost() {
//   return armorArray.reduce((a, b) => a + b.cost, 0);
// }

// function weaponCost() {
//   return weaponArray.reduce((a, b) => a + b.cost, 0);
// }

// function armorBonusTotal() {
//   return armorArray.reduce((a, b) => a + b.armorBonus, 0);
// }

const dObj = {
  Barbarian: 4,
  Bard: 4,
  Cleric: 5,
  Druid: 2,
  Fighter: 6,
  Monk: 5,
  Paladin: 6,
  Ranger: 6,
  Rogue: 5,
  Sorcerer: 3,
  Wizard: 3,
};

// let armorArray = [];
// let weaponArray = [];

export const ArmorMain = (props) => {
  let armorArray = props.armorArray;
  function armorBonusTotal() {
    return armorArray.reduce((a, b) => a + b.armorBonus, 0);
  }

  let purchasedArmor = props.armorArray.map((item, index) => (
    <div key={index} className="grid grid-cols-8">
      <div className="col">
        <p style={{ fontWeight: "bold" }}>{item.armorName}</p>
      </div>
      <div className="col">
        <p className="col">Armor Bonus: {item.armorBonus}</p>
      </div>
      <div className="col">
        <p>Max Dex Bonus: {item.maxDexBonus}</p>
      </div>
      <div className="col">
        <p>Armor Check: {item.armorCheck}</p>
      </div>
      <div className="col">
        <p>Spell Fail: {item.spellFail}</p>
      </div>
      <div className="col">
        <p>Speed 30: {item.speed30}</p>
      </div>
      <div className="col">
        <p>Speed 20: {item.speed20}</p>
      </div>
      {/* <div className="col">
        <button
          className="font-[family-name:var(--font-imFell)] px-4 py-2 text-white font-semibold rounded bg-gradient-to-b from-sky-600 to-sky-400"
          onClick={() => removeItem(item, index)}
        >
          Remove
        </button>
      </div> */}
    </div>
  ));

  function removeItem(item, index) {
    armorArray.splice(index, 1);
    props.setArmorMoney(props.armorMoney - item.cost);
    props.setTotalSilver(props.totalSilver + item.cost);
    props.setArmorBonusTotal(armorBonusTotal());
  }

  // function addItem(item){
  //   if(item.cost < props.totalSilver){
  //   armorArray.push(item);
  //   props.setArmorMoney(armorCost());
  //   props.setArmorBonusTotal(armorBonusTotal());
  //   }
  //   else{
  //     alert("Not enough money, chump!")
  //   }
  // }

  function handleCheck(event, item) {
    if (event.target.checked === true) {
      if (item.cost < props.totalSilver) {
        armorArray.push(item);
        props.setArmorMoney(props.armorMoney + item.cost);
        props.setTotalSilver(props.totalSilver - item.cost);
        props.setArmorBonusTotal(armorBonusTotal());
        props.setArmorArray(armorArray);
      } else {
        return (
          alert("Not enough money, chump!"), (event.target.checked = false)
        );
      }
    }
    if (event.target.checked === false) {
      let i = armorArray.indexOf(item);
      armorArray.splice(i, 1);
      props.setArmorMoney(props.armorMoney - item.cost);
      props.setTotalSilver(props.totalSilver + item.cost);
      props.setArmorBonusTotal(armorBonusTotal());
      props.setArmorArray(armorArray);
    }
  }

  function armorDisplay(filter) {
    return Object.values(ArmorTable)
      .filter((item) => item.cat === filter)
      .map((item, index) => (
        <div key={index} className="grid grid-cols-12">
          <div className="col-span-1">
            <input
              className="form-check-input"
              type="checkbox"
              value={item.featName}
              onChange={(event) => handleCheck(event, item)}
            />
          </div>
          <div className="col-span-3">{item.armorName}</div>
          <div className="col-span-2">{item.cost}</div>
          <div className="col-span-2">{item.armorBonus}</div>
          <div className="col-span-2">{item.maxDexBonus}</div>
          <div className="col-span-2">{item.armorCheck}</div>
        </div>
      ));
  }

  const shieldDisplay = Object.values(ShieldTable).map((item, index) => (
    <div key={index} className="grid grid-cols-12">
      <div className="col-span-1">
        <input
          className="form-check-input"
          type="checkbox"
          value={item.featName}
          onChange={(event) => handleCheck(event, item)}
        />
      </div>
      <div className="col-span-3">{item.armorName}</div>
      <div className="col-span-2">{item.cost}</div>
      <div className="col-span-2">{item.armorBonus}</div>
      <div className="col-span-2">{item.maxDexBonus}</div>
      <div className="col-span-2">{item.armorCheck}</div>
    </div>
  ));

  // useEffect(() => {
  //   props.setArmorArray(armorArray);
  // }, [props]);

  return (
    <>
      <div className="row">
        <div className="text-lg">Silver: {props.totalSilver}</div>
      </div>
      {props.armorArray.length > 0 && (
        <h3 className="text-xl font-semibold">Purchased Armor</h3>
      )}
      <div>{purchasedArmor}</div>

      <div>
        <div>
          <h3 className="text-xl font-semibold">Armor Shop</h3>
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="grid grid-cols-12 font-semibold">
              <div className="col-span-1"></div>
              <div className="col-span-3">
                <p>Armor</p>
              </div>
              <div className="col-span-2">
                <p>Cost</p>
              </div>
              <div className="col-span-2">
                <p>Armor Bonus</p>
              </div>
              <div className="col-span-2">
                <p>Max Dex Bonus</p>
              </div>
              <div className="col-span-2">
                <p>Armor Check</p>
              </div>
            </div>
          </div>

          <h5 className="font-semibold">Light Armor</h5>
          <div className="grid grid-cols-1 md:grid-cols-4">
            {armorDisplay("light")}
          </div>
          <br />
          <h5 className="font-semibold">Medium Armor</h5>
          <div className="grid grid-cols-1 md:grid-cols-4">
            {armorDisplay("medium")}
          </div>
          <br />
          <h5 className="font-semibold">Heavy Armor</h5>
          <div className="grid grid-cols-1 md:grid-cols-4">
            {armorDisplay("heavy")}
          </div>
          <br />
          <h5 className="font-semibold">Shields</h5>
          <div className="grid grid-cols-1 md:grid-cols-4">{shieldDisplay}</div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export const WeaponsMain = (props) => {
  const [show, setShow] = useState(false);

  let weaponArray = props.weaponArray;

  function handleCheck(event, item) {
    if (event.target.checked === true) {
      if (item.cost < props.totalSilver) {
        weaponArray.push(item);
        props.setWeaponsMoney(props.weaponsMoney + item.cost);
        props.setTotalSilver(props.totalSilver - item.cost);
      } else {
        return (
          alert("Not enough money, chump!"), (event.target.checked = false)
        );
      }
    }
    if (event.target.checked === false) {
      let i = weaponArray.indexOf(item);
      weaponArray.splice(i, 1);
      props.setWeaponsMoney(props.weaponsMoney - item.cost);
      props.setTotalSilver(props.totalSilver + item.cost);
    }
  }

  const purchasedWeapons = props.weaponArray.map((item, index) => (
    <div key={index} className="grid grid-cols-2 md:grid-cols-8">
      <div>
        <p style={{ fontWeight: "bold" }}>{item.weaponName}</p>
      </div>
      <div>
        <p>Damage, Small: {item.dmgS}</p>
      </div>
      <div>
        <p>Damage, Medium: {item.dmgM}</p>
      </div>
      <div>
        <p>Critical: {item.critical}</p>
      </div>
      <div>
        <p>Range: {item.range}</p>
      </div>
      <div>
        <p>Type: {item.type}</p>
      </div>

      {/* <div>
        <button
          className="font-[family-name:var(--font-imFell)] px-4 py-2 text-white font-semibold rounded bg-gradient-to-b from-sky-600 to-sky-400"
          onClick={() => removeItem(item, index)}
        >
          Remove
        </button>
      </div> */}
    </div>
  ));

  function removeItem(item, index) {
    weaponArray.splice(index, 1);
    props.setWeaponsMoney(props.weaponsMoney - item.cost);
    props.setTotalSilver(props.totalSilver + item.cost);
  }

  // function addItem(item){
  //   if(item.cost < props.totalSilver){
  //   weaponArray.push(item);
  //   props.setWeaponsMoney(weaponCost());
  //   }
  //   else{
  //     alert("Not enough money, chump!")
  //   }
  // }

  function weaponDisplay(filter) {
    return Object.values(WeaponTables.weaponsList)
      .filter((item) => item.cat === filter)
      .map((item, index) => (
        <div key={index} className="grid grid-cols-12">
          <div className="col-span-1">
            <input
              className="form-check-input"
              type="checkbox"
              value={item.featName}
              onChange={(event) => handleCheck(event, item)}
            />
          </div>
          <div className="col-span-3">{item.weaponName}</div>
          <div className="col-span-2">{item.cost}</div>
          <div className="col-span-2">{item.dmgS}</div>
          <div className="col-span-2">{item.dmgM}</div>
          <div className="col-span-2">{item.range}</div>
        </div>
      ));
  }

  useEffect(() => {
    props.setWeaponArray(weaponArray);
  }, [props, weaponArray]);

  return (
    <>
      <div>Silver: {props.totalSilver}</div>
      {weaponArray.length > 0 && (
        <h3 className="text-xl font-semibold">Purchased Weapons</h3>
      )}
      <div>{purchasedWeapons}</div>
      <br />
      <div className="">
        <h3 className="text-xl font-semibold">Weapons Shop</h3>
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="grid grid-cols-12 font-semibold">
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <p>Weapon</p>
            </div>
            <div className="col-span-2">
              <p>Cost</p>
            </div>
            <div className="col-span-2">
              <p>Damage Small</p>
            </div>
            <div className="col-span-2">
              <p>Damage Medium</p>
            </div>
            <div className="col-span-2">
              <p>Range</p>
            </div>
          </div>
        </div>
        <h5 className="font-semibold">Simple Weapons</h5>
        <div className="grid grid-cols-1 md:grid-cols-4">
          {weaponDisplay("simple")}
        </div>
        <br />
        <h5 className="font-semibold">Martial Weapons</h5>
        <div className="grid grid-cols-1 md:grid-cols-4">
          {weaponDisplay("martial")}
        </div>
        <br />
        <h5 className="font-semibold">Exotic Weapons</h5>
        <div className="grid grid-cols-1 md:grid-cols-4">
          {weaponDisplay("exotic")}
        </div>
        <br />
        <h5 className="font-semibold">Ammunition</h5>
        <div className="grid grid-cols-1 md:grid-cols-4">
          {weaponDisplay("ammunition")}
        </div>
      </div>
    </>
  );
};

export const StartingSilver = (props) => {
  function genSilver() {
    let rolledGold = 0;
    for (let i = 0; i < dObj[props.selectedClass]; i++) {
      rolledGold = rolledGold + rando(1, 4);
    }
    return props.selectedClass === "Monk"
      ? props.setTotalSilver(rolledGold * 10)
      : props.setTotalSilver(rolledGold * 100);
  }

  const normalMoney =
    props.totalSilver === 0 ? (
      <CustomButton
        color="blue"
        label="Roll Starting Money"
        onClick={() => genSilver()}
      />
    ) : null;

  // (
  //   <button
  //     className="min-w-52 font-[family-name:var(--font-imFell)] px-4 py-2 text-white font-semibold rounded bg-gradient-to-b from-sky-600 to-sky-400"
  //     onClick={() => {
  //       props.setTotalSilver(0);
  //       props.setArmorMoney(0);
  //       props.setWeaponsMoney(0);
  //       props.setArmorArray([]);
  //       props.setWeaponArray([]);
  //     }}
  //   >
  //     Reset money and inventory
  //   </button>
  // );

  return <>{!props.munchkinMode && normalMoney}</>;
};

// export const WeaponsAndArmorQuick = ({
//   armorArray,
//   weaponArray,
//   quickCreate,
//   selectedClass,
//   setArmorArray,
//   setArmorBonusTotal,
//   setWeaponArray,
// }) => {
//   // let armorArrayTemp = armorArray;
//   // let weaponArrayTemp = weaponArray;

//   function armorBonusTotal() {
//     return armorArray.reduce((a, b) => a + b.armorBonus, 0);
//   }

//   const purchasedArmor = armorArray.map((item, index) => (
//     <div key={index} className="grid grid-cols-3 text-xs">
//       <div>
//         <p className="font-semibold">{item.armorName}</p>
//       </div>
//       <div>
//         <p>Armor Bonus: {item.armorBonus}</p>
//       </div>

//       <div>
//         <p>Armor Check: {item.armorCheck}</p>
//       </div>
//     </div>
//   ));

//   const purchasedWeapons = weaponArray.map((item, index) => (
//     <div key={index} className="grid grid-cols-3 text-xs">
//       <div>
//         <p className="font-semibold">{item.weaponName}</p>
//       </div>
//       <div>
//         <p>Damage: {item.dmgM}</p>
//       </div>
//       <div>
//         <p>Type: {item.type}</p>
//       </div>
//     </div>
//   ));

//   useEffect(() => {
//     if (quickCreate === true) {
//       let armorArrayTemp = [];
//       let weaponArrayTemp = [];
//       // setArmorArray([]);
//       // setWeaponArray([]);
//       Object.values(ArmorTable)
//         .filter((item) => item.startingEquipment.includes(selectedClass))
//         .map((item, index) => armorArrayTemp.push(item));
//       Object.values(WeaponTables.weaponsList)
//         .filter((item) => item.startingEquipment.includes(selectedClass))
//         .map((item, index) => weaponArrayTemp.push(item));
//       Object.values(ShieldTable)
//         .filter((item) => item.startingEquipment.includes(selectedClass))
//         .map((item, index) => armorArrayTemp.push(item));
//       setArmorArray(armorArrayTemp);
//       setWeaponArray(weaponArrayTemp);
//       setArmorBonusTotal(armorBonusTotal());
//     }
//   }, [quickCreate]);

//   return (
//     <>
//       <div>{purchasedArmor}</div>
//       <div>{purchasedWeapons}</div>
//     </>
//   );
// };
