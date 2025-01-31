import Image from "next/image";

import dnd2000Logo from "../../../public/images/dnd2000Logo.png";

export default function About() {
  return (
    <div className="flex justify-center font-[family-name:var(--font-imFell)] mb-20">
      <div className="w-11/12 justify-items-center mt-20 text-center">
        <Image
          src={dnd2000Logo}
          alt="vintage dungeons and dragons shield"
          width={400}
        />
        <h2 className="font-[family-name:var(--font-imFellSC)] text-3xl font-semibold mt-10">
          Rolled School
        </h2>
        <br />
        <h5 className="text-lg font-semibold text-center">
          Character Creator for Dungeons and Dragons edition 3.5
        </h5>

        <br />
        <p className="text-center">
          Based on
          <em>Dungeons and Dragons Players Handbook Core Rulebook 1 v3.5</em>
        </p>
        <p>by</p>
        <p className="text-center">Monte Cook, Jonathan Tweet and Skip Williams</p>

        <p>Copyright 2003 by Wizards of the Coast, Inc</p>
        <br />
        <p>
          Based on the original Dungeons and Dragons game created by E. Gary
          Gygax and Dave Arneson
        </p>
        <br />
        <p>Logo copyright Wizards of the Coast, Inc</p>
        <br/>
        <p>
          Email: <a href="mailto:info@robotlions.com" className="font-semibold text-lawfulBlue">info@robotlions.com</a>
        </p>
        <p>
          Website: <a href="https://robotlions.com/" className="font-semibold text-lawfulBlue">robotlions.com</a>
        </p>
      </div>
    </div>
  );
}
