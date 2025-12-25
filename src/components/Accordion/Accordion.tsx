import {FC, useState} from "react";
import { ChevronDownCircle } from "lucide-react";

export interface AccordionRow {
    id: string;
    title: string;
    content: string;
}

interface AccordionProps {
    data: AccordionRow[];
}

// OBJECTIVE: implement accessible accordion
// example https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
// important notes:
// use <button> as triggers
// use h2/h3 as a wrapper for button
// use aria-expanded={isExpanded} for Screen readers announce expanded / collapsed state
// use approach <div hidden={!isExpanded}> to hide/show the content
// use aria-controls={panelId} - creates a programmatic relationship between a control element (like a button or tab) and the element it controls (like a panel or tab content).
// use aria-labelledby={buttonId} for the div with content
// use aria-hidden="true" for the chevron icon
// todo: add Arrow keys for navigation (optional but nice)
const Accordion:FC<AccordionProps> = ({data}) => {
    const [expanded, setExpanded] = useState<string[]>([]);

    const handleTitleClick = (id: string) => {
        if (expanded.includes(id)) {
            // collapse
            const updated = expanded.filter(item => item !== id);
            setExpanded(updated);
        } else {
            setExpanded(prev => {
                return [...prev, id];
            })
        }
    }

    return (
        <div className="max-w-3xl w-full border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
            {data.map((row, index) => {
                const isExpanded = expanded.includes(row.id);
                const isLastRow = index === (data.length - 1);
                const buttonId = `accordion-${row.id}`;
                const panelId = `sect-${row.id}`;

                return (
                    <div key={row.id} className={`${!isLastRow ? 'border-b border-gray-200' : ''}`}>
                        <h3>
                            <button
                                type="button"
                                id={buttonId}
                                aria-expanded={isExpanded}
                                aria-controls={panelId}
                                onClick={() => handleTitleClick(row.id)}
                                className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-100 transition-all gap-3"
                            >
                                <span className={`${isExpanded ? 'text-blue-600' : ''}`}>{row.title}</span>
                                <ChevronDownCircle
                                    className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-600' : 'text-gray-500'}`}
                                    aria-hidden="true"
                                />
                            </button>
                        </h3>
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-gray-50/50`}
                        >
                            <div className="p-5 border-t border-gray-100">
                                <p className="text-gray-600 leading-relaxed">{row.content}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Accordion;
