import Image from "next/image";
import Link from "next/link";

import lawfulTile from "../../public/images/lawfulPortrait.png";
import neutralTile from "../../public/images/neutralPortrait.png";
import chaoticTile from "../../public/images/chaoticPortrait.png";


export default function Home() {
  
  const CardWithBackground = ({
    imageUrl,
    title,
    text,
    buttonText,
    subtitle,
    fromColor,
    toColor,
    href,
  }) => {
    return (
      <div className="relative h-screen w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-2 font-[family-name:var(--font-imFellSC)]">
            {title}
          </h2>
          <h4 className="text-2xl font-bold mb-2 font-[family-name:var(--font-imFell)]">
            {subtitle}
          </h4>

          <p className="text-lg font-semibold mb-4 font-[family-name:var(--font-imFell)]">
            {text}
          </p>
          <Link href={href}>
            <button
              className={`font-[family-name:var(--font-imFell)] px-4 py-2 text-white font-semibold rounded bg-gradient-to-b ${fromColor} ${toColor} shadow`}
            >
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    );
  };

  const CardRow = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-2 justify-center mt-32 mx-6 mb-20">
        <CardWithBackground
          title="Lawful"
          subtitle="(Standard Character)"
          text="Roll a first-level character in accordance with the D&D 3.5 Player's Handbook"
          buttonText="Create Character"
          href="/standard"
          fromColor="from-sky-400"
          toColor="to-sky-600"
          imageUrl={lawfulTile.src}
        />
        <CardWithBackground
          title="Neutral"
          subtitle="(Quick Character)"
          text="Choose a race, class and aligment, then create the character with a single click."
          buttonText="Create Character"
          href="/quick"
          fromColor="from-emerald-400"
          toColor="to-emerald-600"
          imageUrl={neutralTile.src}
        />
        <CardWithBackground
          title="Chaotic"
          subtitle="(Custom Character)"
          text="Manually input level and ability scores, start with a million silver. Pure chaos."
          buttonText="Create Character"
          href="/custom"
          fromColor="from-rose-400"
          toColor="to-rose-600"
          imageUrl={chaoticTile.src}
        />
      </div>
    );
  };

  return (
    <div>
      <CardRow />
    </div>
  );
}
