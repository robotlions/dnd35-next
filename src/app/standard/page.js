"use client";

import { AccordionCustom } from "../ui/Accordion";
import { Dropdown } from "../ui/DropDown";


const CharacterInfo = () => {
  return <p>Char Info</p>;
};

export default function Standard() {
  // The accordion component iterates over this array to create the standard page layout
  const accordionItems = [
    { title: "Character Info", content: <CharacterInfo /> },
  ];

  return (
    <div className="justify-items-center">
      <div className="w-10/12 mt-10">
        <AccordionCustom accordionItems={accordionItems} />
      </div>
    </div>
  );
}
