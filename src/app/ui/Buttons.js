export function CustomButton(props) {
  let color;

  switch (props.color) {
    case "gray":
      color = "from-gray-600 to-gray-400";
      break;
    case "lawful":
      color = "from-cyan-600 to-lawfulBlue";
      break;
    case "neutral":
      color = "from-emerald-600 to-neutralGreen";
    break;
    case "chaotic":
      color = "from-red-700 to-chaoticRed";
      break;
  }

  return (
    <button
      className={`min-w-52 font-[family-name:var(--font-imFell)] px-4 py-2 text-white font-semibold rounded bg-gradient-to-b ${color} hover:bg-gradient-to-b hover:from-sky-500 hover:to-sky-700`}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
