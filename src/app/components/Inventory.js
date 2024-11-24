import { useEffect, useState } from "react";
import { ArmorTable } from "../Equipment/ArmorTables";
import { ShieldTable } from "../Equipment/ArmorTables";
import * as WeaponTables from "../Equipment/WeaponTables";
// import button from "react-bootstrap/button";
// import Modal from "react-bootstrap/Modal";

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

function armorBonusTotal(){
  return armorArray.reduce((a,b) => a + b.armorBonus, 0);
}

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



let armorArray = [];
let weaponArray = [];

export const ArmorMain = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const purchasedArmor = armorArray.map((item, index) => (
    <div key={index} className="row">
      <div className="col">
        <p style={{fontWeight: "bold"}}>{item.armorName}</p>
      </div>
      <div className="col">
        <p>Armor Bonus: {item.armorBonus}</p>
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
        <p>Speed 30': {item.speed30}</p>
      </div>
      <div className="col">
        <p>Speed 20': {item.speed20}</p>
      </div>
      <div className="col">
        <button variant="warning bg-gradient" onClick={() => removeItem(item, index)}>Remove</button>
      </div>
    </div>
  ));

  function removeItem(item, index){
    armorArray.splice(index, 1);
    props.setArmorMoney(props.armorMoney-item.cost);
    props.setTotalSilver(props.totalSilver+item.cost);
    props.setArmorBonusTotal(armorBonusTotal())
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

  function handleCheck(event, item){
    if (event.target.checked === true) {
      if(item.cost < props.totalSilver){
        armorArray.push(item);
        props.setArmorMoney(props.armorMoney+item.cost);
        props.setTotalSilver(props.totalSilver-item.cost);
        props.setArmorBonusTotal(armorBonusTotal());
        }
        else{
          return(
          alert("Not enough money, chump!"),
          event.target.checked = false
          )
        }
  }
  if(event.target.checked===false){
    let i = armorArray.indexOf(item);
    armorArray.splice(i, 1);
    props.setArmorMoney(props.armorMoney-item.cost);
    props.setTotalSilver(props.totalSilver+item.cost);
    props.setArmorBonusTotal(armorBonusTotal())
  }
}

  function armorDisplay(filter){
    return(
   Object.values(ArmorTable).filter((item)=>item.cat===filter).map((item, index) => (
    <div key={index} className="row">
      <div className="col-1">
      <input
        className="form-check-input"
        type="checkbox"
        value={item.featName}
        onChange={(event) => handleCheck(event, item)}
      />
      </div>
      <div className="col-3">
        {item.armorName}
      </div>
      <div className="col-2">
        {item.cost}
      </div>
      <div className="col-2">
        {item.armorBonus}
      </div>
      <div className="col-2">
        {item.maxDexBonus}
      </div>
      <div className="col-2">
        {item.armorCheck}
      </div>
     
    </div>
  )))};

  

  const shieldDisplay = Object.values(ShieldTable).map((item, index) => (
    <div key={index} className="row">
      <div className="col-1">
      <input
        className="form-check-input"
        type="checkbox"
        value={item.featName}
        onChange={(event) => handleCheck(event, item)}
      />
      </div>
      <div className="col-3">
        {item.armorName}
      </div>
      <div className="col-2">
        {item.cost}
      </div>
      <div className="col-2">
        {item.armorBonus}
      </div>
      <div className="col-2">
        {item.maxDexBonus}
      </div>
      <div className="col-2">
        {item.armorCheck}
      </div>
     
    </div>
  ));

useEffect(()=>{ 
  props.setArmorArray(armorArray)
}, [props]);
  

  return (
    <>
     
      <div>{purchasedArmor}</div>
     

      <button variant="secondary rounded-0 bg-gradient" onClick={handleShow}>
        Buy Armor and Shields
      </button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closebutton>
          <Modal.Title>Add Armor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div>Silver: {props.totalSilver}</div>
          <div className="col-1">
              
            </div>
            <div className="col-3">
              <p>Armor</p>
            </div>
            <div className="col-2">
              <p>Cost</p>
            </div>
            <div className="col-2">
              <p>Armor Bonus</p>
            </div>
            <div className="col-2">
              <p>Max Dex Bonus</p>
            </div>
            <div className="col-2">
              <p>Armor Check</p>
            </div>
          </div>
          <h5>Light Armor</h5>
          {armorDisplay("light")}
          <h5>Medium Armor</h5>
          {armorDisplay("medium")}
          <h5>Heavy Armor</h5>
          {armorDisplay("heavy")}
          <h5>Shields</h5>
          {shieldDisplay}
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary rounded-0 bg-gradient" onClick={handleClose}>
            Close
          </button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const WeaponsMain = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleCheck(event, item){
    if (event.target.checked === true) {
      if(item.cost < props.totalSilver){
        weaponArray.push(item);
        props.setWeaponsMoney(props.weaponsMoney+item.cost);
        props.setTotalSilver(props.totalSilver-item.cost);
        }
        else{
          return(
          alert("Not enough money, chump!"),
          event.target.checked = false
          )
        }
  }
  if(event.target.checked===false){
    let i = weaponArray.indexOf(item);
    weaponArray.splice(i, 1);
    props.setWeaponsMoney(props.weaponsMoney-item.cost);
    props.setTotalSilver(props.totalSilver+item.cost);
  }
  }

  const purchasedWeapons = weaponArray.map((item, index) => (
    <div key={index} className="row">
      <div className="col">
        <p style={{fontWeight: "bold"}}>{item.weaponName}</p>
      </div>
      <div className="col">
        <p>Damage, Small: {item.dmgS}</p>
      </div>
      <div className="col">
        <p>Damage, Medium: {item.dmgM}</p>
      </div>
      <div className="col">
        <p>Critical: {item.critical}</p>
      </div>
      <div className="col">
        <p>Range: {item.range}</p>
      </div>
      <div className="col">
        <p>Type: {item.type}</p>
      </div>
      
      <div className="col">
        <button variant="warning bg-gradient" onClick={() => removeItem(item, index)}>Remove</button>
      </div>
    </div>
  ));

  function removeItem(item, index){
    weaponArray.splice(index, 1);
    props.setWeaponsMoney(props.weaponsMoney-item.cost);
    props.setTotalSilver(props.totalSilver+item.cost);
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

  function weaponDisplay(filter){
return(
   Object.values(WeaponTables.weaponsList).filter((item)=>item.cat===filter).map((item, index) => (
    <div key={index} className="row">
      <div className="col-1">
      <input
        className="form-check-input"
        type="checkbox"
        value={item.featName}
        onChange={(event) => handleCheck(event, item)}
      />
      </div>
      <div className="col-3">
        {item.weaponName}
      </div>
      <div className="col-2">
        {item.cost}
      </div>
      <div className="col-2">
        {item.dmgS}
      </div>
      <div className="col-2">
        {item.dmgM}
      </div>
      <div className="col-2">
        {item.range}
      </div>
     
    </div>
  )))};

  useEffect(()=>{
    props.setWeaponArray(weaponArray)
  },[props])

  return (
    <>
     
      <div>{purchasedWeapons}</div>
     

      <button variant="secondary rounded-0 bg-gradient" onClick={handleShow}>
        Buy Weapons
      </button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closebutton>
          <Modal.Title>Add Weapons</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div>Silver: {props.totalSilver}</div>
          <div className="col-1">
              
            </div>
            <div className="col-3">
              <p>Weapon</p>
            </div>
            <div className="col-2">
              <p>Cost</p>
            </div>
            <div className="col-2">
              <p>Damage Small</p>
            </div>
            <div className="col-2">
              <p>Damage Medium</p>
            </div>
            <div className="col-2">
              <p>Range</p>
            </div>
          </div>
          <h5>Simple Weapons</h5>
          {weaponDisplay("simple")}
          <h5>Martial Weapons</h5>
          {weaponDisplay("martial")}
          <h5>Exotic Weapons</h5>
          {weaponDisplay("exotic")}
          <h5>Ammunition</h5>
          {weaponDisplay("ammunition")}
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary rounded-0 bg-gradient" onClick={handleClose}>
            Close
          </button>
         
        </Modal.Footer>
      </Modal>
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

  const normalMoney = props.totalSilver === 0 ? (
    <button variant="secondary rounded-0 bg-gradient" onClick={() => genSilver()}>
      Roll Starting Money
    </button>
  ) : (
    <button
      variant="secondary rounded-0 bg-gradient"
      onClick={() => {
        props.setTotalSilver(0);
        props.setArmorMoney(0);
        props.setWeaponsMoney(0);
        armorArray = [];
        weaponArray = [];
      }}
    >
      Reset money and inventory
    </button>
  );




  return (
    <>
    {!props.munchkinMode && normalMoney}
     
    </>
  );
};


export const WeaponsAndArmorQuick = (props) => {
  // const [show, setShow] = useState(false);

//  function buyArmor(){
//   Object.values(ArmorTable).filter((item)=>item.startingEquipment.includes(props.selectedClass)).map((item, index) => (armorArray.push(item)
//   ))
//   setShow(!show);
//   console.log(armorArray)
//  }


  const purchasedArmor = armorArray.map((item, index) => (
    <div key={index} className="row" style={{fontSize:"small",lineHeight:.9}}>
      <div className="col-4">
        <p style={{fontWeight: "bold"}}>{item.armorName}</p>
      </div>
      <div className="col-4">
        <p>Armor Bonus: {item.armorBonus}</p>
      </div>
     
      <div className="col-4">
        <p>Armor Check: {item.armorCheck}</p>
      </div>
     
      
    </div>
  ));

  

  const purchasedWeapons = weaponArray.map((item, index) => (
    <div key={index} className="row" style={{fontSize:"small",lineHeight:.9}}>
      <div className="col-4">
        <p style={{fontWeight: "bold"}}>{item.weaponName}</p>
      </div>
      <div className="col-4">
        <p>Damage: {item.dmgM}</p>
      </div>
      <div className="col-4">
        <p>Type: {item.type}</p>
      </div>
      
    </div>
  ));


useEffect(()=>{ 
  if(props.quickCreate===true){
    armorArray=[];
    weaponArray=[];
    props.setArmorArray([]);
    props.setWeaponArray([]);
  Object.values(ArmorTable).filter((item)=>item.startingEquipment.includes(props.selectedClass)).map((item, index) => (armorArray.push(item)
))
Object.values(WeaponTables.weaponsList).filter((item)=>item.startingEquipment.includes(props.selectedClass)).map((item, index) => (weaponArray.push(item)
   
))
Object.values(ShieldTable).filter((item)=>item.startingEquipment.includes(props.selectedClass)).map((item, index) => (armorArray.push(item)
   
))
  props.setArmorArray(armorArray);
  props.setWeaponArray(weaponArray);
  props.setArmorBonusTotal(armorBonusTotal());

}
}, [props.quickCreate, props.selectedClass]);
  

  return (
    <>
      <div>{purchasedArmor}</div>
      <div>{purchasedWeapons}</div> 
    </>
  );
};

