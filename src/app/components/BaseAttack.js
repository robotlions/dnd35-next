import { useEffect, useState } from 'react';
import * as BaseAttackTables from '../Classes/BaseAttackTables';

export const BaseAttack = (props) => {

    const [baseAttackDisplay, setBaseAttackDisplay] = useState(0);

    function calculateModifier(abil){
        return -5 + Math.floor(1*(abil/2))
      }



useEffect(()=>{
    let attackMod = calculateModifier(props.str);
    let baseAttackBase = parseInt(BaseAttackTables[props.selectedClass][props.level])+attackMod;
    setBaseAttackDisplay(baseAttackBase);
    props.setBaseAttack(baseAttackBase);
},[props.level, props.selectedClass, props.str]);


    return(<div style={{textAlign: "center"}}>
<h6 style={{fontWeight: "bold"}}>Base Attack Bonus</h6>
        {baseAttackDisplay}
        </div>
    )
};