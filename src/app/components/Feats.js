import { featsTable } from "../Classes/Skills/FeatsTables";
import { useEffect, useState } from "react";

let featArray = [];

export const FeatsMain = (props) => {
  const [featSlots, setFeatSlots] = useState(1);
  let lvlCheck = Math.floor(props.level/3);


  useEffect(() => {
    if (props.selectedRace === "human") {
      setFeatSlots(2+lvlCheck-featArray.length);
    } else {
      if (featSlots > 0) {
        setFeatSlots(1+lvlCheck-featArray.length);
      }
    }
  }, [props.selectedRace, featSlots, props.level, lvlCheck]);


  const maxFeats = props.selectedRace==='human' ? 2+lvlCheck : 1+lvlCheck

  //right now you can game the system by maxing out your feats, then changing the race to something else then back to human to get an extra slot

  useEffect(() => {
    props.setFeatSlots(featSlots);
  }, [featSlots, props]);

  useEffect(()=>{
    featArray = [];
    props.setFeatSlots(1);
    props.setFeatArray([]);
  }, [props.selectedRace])


  function handleCheck(event, item) {
    if (event.target.checked === true) {
      if(featSlots<=0){
        return(event.target.checked=false,alert("Your feats are maxed out"))
      }
      featArray.push(item);
      props.setFeatArray(featArray);

      // setFeatSlots(featSlots - 1);
      setFeatSlots(maxFeats - featArray.length);
    }
    if (event.target.checked === false) {
      let i = featArray.indexOf(item);
      featArray.splice(i, 1);
      props.setFeatArray(featArray);
      // setFeatSlots(featSlots + 1);
      setFeatSlots(maxFeats - featArray.length);

    }
  }

  function featDisplay(filter) {
    return Object.values(featsTable)
      .sort((a, b) => a.featName.localeCompare(b.featName))
      .filter((item) => item.cat === filter)
      .map((item, index) => (
        <div key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            value={item.featName}
            onChange={(event) => handleCheck(event, item)}
          />&nbsp;
          <label
            style={{ fontWeight: "bold" }}
            className="form-check-label"
            htmlFor="flexCheckDefault"
          >
            {item.featName}
          </label>
          <br/>
          <span style={{ fontSize: "small" }}>{item.effect}</span>
          {item.pre ? (
            <p style={{ fontSize: "small" }}>
              <em>Prerequisite: {item.pre}</em>
            </p>
          ) : null}
        </div>
      ));
  }

  return (
    <div className="text-xs">
      <h2 className="text-xl font-semibold">Available feats: {featSlots}</h2>
      <h5 className="text-lg font-semibold">General Feats</h5>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">{featDisplay("general")}</div>
      <br/>
      <h5 className="text-lg font-semibold">Item Creation Feats</h5>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">{featDisplay("item")}</div>
      <br/>
      <h5 className="text-lg font-semibold">Metamagic Feats</h5>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {featDisplay("metamagic")}
      </div>
    </div>
  );
};

export const FeatsQuick = (props) => {
  function rando(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  useEffect(() => {
    if (props.quickCreate === true) {
      featArray = [];
      props.setFeatArray([]);
      Object.values(featsTable)
        .filter((item) =>item.startingFeat.includes(props.selectedClass))
        .map((item, index) => featArray.push(item));
        let featSlots = props.selectedRace==="human" ? 2 : 1
      let difference =
        featArray.length - featSlots
      for (let i = 0; i < difference; i++) {
        let v = rando(0, featArray.length - 1);
        featArray.splice(v, 1);
      }

      props.setFeatArray(featArray);
    }
  }, [props.quickCreate, props.selectedClass, props.selectedRace, props.int]);

  const quickSkillsDisplay = featArray.map((item, index) => (
    <span style={{fontSize:"small"}} key={index}>
      {item.featName}<br/>
    </span>
  ));

  return <>{quickSkillsDisplay}</>;
};

