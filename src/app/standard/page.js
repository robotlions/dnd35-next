"use client";
import { useState } from "react";
import { AccordionCustom } from "../ui/Accordion";
import { Dropdown } from "../ui/DropDown";
import { AlignmentSelect } from "../components/CharInfo";



export default function Standard() {
  // The accordion component iterates over this array to create the standard page layout
  const [alignment, setAlignment] = useState("Lawful Good")
  
  const CharacterInfo = () => {
    return (
     
      <AlignmentSelect setAlignment={setAlignment} alignment={alignment}/>
   
    );
  };
  
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
