import { useState } from "react";

export function AccordionMulti(props) {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="w-full">
      {props.accordionItems.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => toggleAccordion(index)}
            className={`border-2 border-solid ${props.borderColor} flex justify-between rounded items-center w-full py-4 px-6 text-left text-zinc-50 bg-gradient-to-b ${props.fromColor} to-gray-900 text-lg hover:bg-gradient-to-b ${props.hoverFrom} ${props.hoverTo} shadow`}
          >
            <span className="text-3xl font-black font-[family-name:var(--font-imFellSC)]">
              {item.title}
            </span>
            <svg
              className={`w-5 h-5 transform transition-transform ${
                openIndexes.includes(index) ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndexes.includes(index) ? "h-auto" : "max-h-0"
            }`}
          >
            <div className="px-6 py-4 text-gray-600 text-base min-h-32 font-[family-name:var(--font-imFell)]">
              {item.content}
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}
