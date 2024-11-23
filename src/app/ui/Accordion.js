import { useState } from "react";

export function AccordionCustom(props) {
    const [openIndex, setOpenIndex] = useState(null);
  
    const toggleAccordion = (index) => {
      setOpenIndex(index === openIndex ? null : index);
    };
  
    
  
    return (
      <div className="w-full">
        {props.accordionItems.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleAccordion(index)}
              className="flex justify-between rounded items-center w-full py-4 px-6 text-left text-gray-600 hover:bg-gray-200 focus:outline-none text-lg bg-gray-100"
            >
              <span>{item.title}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openIndex === index ? "rotate-180" : ""
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
                openIndex === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="px-6 py-4 text-gray-600 text-base">{item.content}</div>
            </div>
            <br/>
          </div>
        ))}
      </div>
    );
  }
  