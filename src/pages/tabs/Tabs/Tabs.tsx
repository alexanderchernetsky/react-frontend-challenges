import React, {FC, useState} from 'react';

// OBJECTIVE
// Build a tabs component that displays one panel of content at a time depending on the active tab element. Some HTML is provided for you as example contents.

// Requirements:
// Clicking on a tab makes it the active tab. Add a visual indication (e.g. using blue text color) for the active tab to differentiate it from the non-active tabs.
// At all times, only one panel's contents should be displayed — the one corresponding to the active tab's.
// Notes:
// The focus of this question is on functionality, not the styling. There's no need to write any custom CSS except for highlighting the active tab.
// You may modify the markup (e.g. adding ids, data attributes, replacing some tags, etc) and use client-side rendering instead.
// You may want to think about ways to improve the user experience of the application and implement them (you get bonus credit for doing that during interviews).

interface Tab {
    id: number;
    title: string;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultActiveTabId?: number;
}

// NOTES:
// Tabs should  use role="tablist" on the container, role="tab" on each button, and role="tabpanel" for the content, with aria-selected for the active tab.
// Tabs should be linked to Panels using aria-controls and aria-labelledby need IDs to reference
// Allow passing a defaultActiveTabId prop instead of always defaulting to the first tab.
// accessible example https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/
// todo: improve - add Keyboard Navigation (ArrowRight, ArrowLeft)
const Tabs: FC<TabsProps> = ({tabs, defaultActiveTabId}) => {
    const [activeTabId, setActiveTabId] = useState<number>(
        defaultActiveTabId ?? tabs[0]?.id
    );

    const activeTab = tabs.find(tab => tab.id === activeTabId);

    const handleTitleClick = (id: number) => {
        const tab = tabs.find((tab) => tab.id === id);
        if (tab) {
            setActiveTabId(id);
        }
    };

    if (!tabs.length) return null;

    return (
       <div className="flex flex-col w-full gap-4 p-4 border rounded-lg shadow-sm bg-white">
           <div className="flex border-b border-gray-200" role="tablist">
               {tabs.map((tab) => {
                   const isActive = activeTab?.id === tab.id;
                   return (
                       <button
                           key={tab.id}
                           role="tab"
                           aria-selected={isActive}
                           aria-controls={`panel-${tab.id}`}
                           id={`tab-${tab.id}`}
                           onClick={() => handleTitleClick(tab.id)}
                           className={`px-4 py-2 text-sm font-medium transition-colors duration-200
                               ${isActive 
                                   ? 'text-blue-600 border-b-2 border-blue-600' 
                                   : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-2 border-transparent'
                               }`}
                       >
                           {tab.title}
                       </button>
                   )
               })}
           </div>

           <div role="tabpanel" id={`panel-${activeTab?.id}`} aria-labelledby={`tab-${activeTab?.id}`} className="p-4 text-gray-700 bg-gray-50 rounded-md min-h-[100px]">
               {activeTab?.content}
           </div>
       </div>
    );
};

export default Tabs;
