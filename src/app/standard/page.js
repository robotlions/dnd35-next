"use client";
import { useState } from "react";
import { AccordionCustom } from "../ui/Accordion";
import * as CharInfo from "../components/CharInfo";
import { RaceSelect } from "../components/RaceSelect";
import { ClassSelectDropdown } from "../components/ClassSelect";

export default function Standard() {
  const [alignment, setAlignment] = useState("Lawful Good");
  const [basicEdited, setBasicEdited] = useState(false);
  const [charName, setCharName] = useState("Character Name");
  const [selectedRace, setSelectedRace] = useState("human");
  const [selectedClass, setSelectedClass] = useState("Fighter");

  const charInfoBlock = (
    <div className="grid grid-cols-1 md:grid-cols-4">
    <CharInfo.CharName
      setCharName={setCharName}
      setBasicEdited={setBasicEdited}
    />
    <CharInfo.AlignmentSelect alignment={alignment} setAlignment={setAlignment} />
    <RaceSelect setBasicEdited={setBasicEdited} setSelectedRace={setSelectedRace} />
    <ClassSelectDropdown setBasicEdited={setBasicEdited} setSelectedClass={setSelectedClass} />
    </div>
  );
  // The accordion component iterates over this array to create the standard page layout

  const accordionItems = [{ title: "Character Info", content: charInfoBlock }];
  return (
    <div className="justify-items-center">
      <div className="w-10/12 mt-10">
        <AccordionCustom accordionItems={accordionItems} />
      </div>
    </div>
  );
}
