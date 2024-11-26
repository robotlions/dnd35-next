import { useEffect} from "react";
import { ArmorTable } from "../Equipment/ArmorTables";
import { ShieldTable } from "../Equipment/ArmorTables";
import * as WeaponTables from "../Equipment/WeaponTables";




export function GenerateWeaponsAndArmorQuick({ selectedClass, setArmorArray, setWeaponArray}) {
  
  
    useEffect(() => {
        
       let armorArrayTemp = [];
       let weaponArrayTemp = [];
       
        Object.values(ArmorTable)
          .filter((item) => item.startingEquipment.includes(selectedClass))
          .map((item, index) => armorArrayTemp.push(item));
        Object.values(WeaponTables.weaponsList)
          .filter((item) => item.startingEquipment.includes(selectedClass))
          .map((item, index) => weaponArrayTemp.push(item));
        Object.values(ShieldTable)
          .filter((item) => item.startingEquipment.includes(selectedClass))
          .map((item, index) => armorArrayTemp.push(item));
        setArmorArray(armorArrayTemp);
        setWeaponArray(weaponArrayTemp);
      },[setArmorArray, selectedClass, setWeaponArray])
      
  
    return
  };