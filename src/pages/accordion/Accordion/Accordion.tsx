import {FC, useState} from "react";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";

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
// use aria-expanded={isExpanded} for Screen readers announce expanded / collapsed state
// use approach <div hidden={!isExpanded}> to hide/show the content
// use aria-controls={panelId} -it creates a programmatic relationship between a control element (like a button or tab) and the element it controls (like a panel or tab content).
// todo: add transition for smooth expand/collapse
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
        <div className="w-[800px] border-2 rounded-xl border-black">
            {data.map((row, index) => {
                const isExpanded = expanded.includes(row.id);
                const isLastRow = index === (data.length - 1);
                const buttonId = `accordion-${row.id}`;
                const panelId = `sect-${row.id}`;

                return (
                    <div key={row.id} className={`p-4 ${!isLastRow && 'border-b-[1px] border-black'}`}>
                        <h2>
                            <button
                                type="button"
                                id={buttonId}
                                aria-expanded={isExpanded}
                                aria-controls={panelId}
                                onClick={() => handleTitleClick(row.id)}
                                className="flex flex-row gap-2 w-full"
                            >
                                <span>{row.title}</span>
                                <span className="ml-auto" aria-hidden="true">{isExpanded ? <ChevronUpCircle/> : <ChevronDownCircle />}</span>
                            </button>
                        </h2>
                        <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isExpanded}>
                            <p>{row.content}</p>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}

export default Accordion;
