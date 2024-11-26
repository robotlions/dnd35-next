import { useEffect, useState } from "react";
import * as BaseAttackTables from "../Classes/BaseAttackTables";

export const BaseAttack = ({ str, selectedClass, level, setBaseAttack }) => {
  const [baseAttackDisplay, setBaseAttackDisplay] = useState(0);

  function calculateModifier(abil) {
    return -5 + Math.floor(1 * (abil / 2));
  }

  useEffect(() => {
    let attackMod = calculateModifier(str);
    let baseAttackBase =
      parseInt(BaseAttackTables[selectedClass][level]) + attackMod;
    setBaseAttackDisplay(baseAttackBase);
    setBaseAttack(baseAttackBase);
  }, [level, selectedClass, str, setBaseAttack]);

  return (
    <div style={{ textAlign: "center" }}>
      <h6 style={{ fontWeight: "bold" }}>Base Attack Bonus</h6>
      {baseAttackDisplay}
    </div>
  );
};
