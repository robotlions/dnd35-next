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