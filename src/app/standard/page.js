"use client";

import { AccordionCustom } from "../ui/Accordion";
import { Dropdown } from "../ui/DropDown";



export default function Standard() {
  // The accordion component iterates over this array to create the standard page layout
  const CharacterInfo = () => {
    return (
     
      <Dropdown dropdownItems={dropdownItems} dropdownName={"Class Select"}/>
   
    );
  };
  
  const accordionItems = [
    { title: "Character Info", content: <CharacterInfo /> },
  ];

  const dropdownItems = [{title: "item 1", value: 1},{title: "item 2", value: 2}];


  return (
    <div className="justify-items-center">
      <div className="w-10/12 mt-10">
        <AccordionCustom accordionItems={accordionItems} />
      </div>
    </div>
  );
}
