export function CustomButton(props) {
  let color;

  switch (props.color) {
    case "gray":
      color = "from-gray-500 to-gray-800";
      break;
    case "lawful":
      color = "from-cyan-600 to-lawfulBlue";
      break;
    case "neutral":
      color = "from-emerald-400 to-emerald-800";
      break;
    case "chaotic":
      color = "from-red-700 to-chaoticRed";
      break;
    case "blue":
      color = "from-buttonBlue to-buttonBlue";
      break;
  }

  return (
    <button
      className={`min-w-52 font-[family-name:var(--font-imFell)] px-4 py-2 text-white font-semibold rounded bg-gradient-to-b ${color} hover:bg-gradient-to-b hover:from-zinc-400 hover:to-zinc-500`}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
