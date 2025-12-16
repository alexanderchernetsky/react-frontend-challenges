import {FC, useEffect, useRef, useState} from "react";


interface CustomSelectProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

// accessible custom select
const CustomSelect:FC<CustomSelectProps> = ({label, options, value, onChange}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(value ?? null);
    const [activeIndex, setActiveIndex] = useState(0);
    const dropdownContainerRef = useRef<HTMLFieldSetElement | null>(null);
    const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);


    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    }

    const handleSelection = (value: string) => {
        setSelectedOption(value);
        onChange(value);
        setIsDropdownOpen(false);
    }

    const onKeyDownTrigger = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        switch (event.key) {
            case "Enter":
            case ' ': // space
                event.preventDefault();
                setIsDropdownOpen(prev => !prev);
                setActiveIndex(0);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        // closing dropdown on outside click
        const handleDocumentMouseDown = (event: MouseEvent) => {
            const target = event.target as Node | null;
            const container = dropdownContainerRef.current;
            if (!container) return;
            if (target && !container.contains(target)) {
                setIsDropdownOpen(false);
            }
        };

        // Use mousedown so the outside click is handled before any click logic toggles state
        window.addEventListener('mousedown', handleDocumentMouseDown);
        return () => {
            window.removeEventListener('mousedown', handleDocumentMouseDown);
        };
    }, [])

    // When dropdown opens, move focus to the list so Enter can select
    useEffect(() => {
        if (isDropdownOpen) {
            // Defer to next tick to ensure element is in DOM
            setTimeout(() => {
                listRef.current?.focus();
            }, 0);
        }
    }, [isDropdownOpen]);

    // Keep the active option visible when navigating with arrows
    useEffect(() => {
        if (!isDropdownOpen) return;
        const el = document.getElementById(`category-option-${activeIndex}`);
        el?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex, isDropdownOpen]);

    return (
        <fieldset className="form-group" ref={dropdownContainerRef}>
            <label htmlFor="category">{label}</label>
            <button
                ref={triggerButtonRef}
                aria-haspopup="listbox"
                aria-labelledby="category"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
                onKeyDown={onKeyDownTrigger}
                type='button'
            >
                {selectedOption ??  '-- Select a category --'}
            </button>

            {isDropdownOpen && (
                (() => {
                    const activeOptionId = `category-option-${activeIndex}`;
                    const handleListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
                        if (e.key === 'Escape') {
                            e.preventDefault();
                            setIsDropdownOpen(false);
                            // Restore focus to trigger
                            setTimeout(() => triggerButtonRef.current?.focus(), 0);
                            return;
                        }
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            const value = options[activeIndex];
                            if (value) {
                                handleSelection(value);
                                // Focus returns to button naturally since list is removed
                                setTimeout(() => triggerButtonRef.current?.focus(), 0);
                            }
                            return;
                        }
                        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
                            e.preventDefault();
                            setActiveIndex((prev) => {
                                const last = options.length - 1;
                                if (e.key === 'Home') return 0;
                                if (e.key === 'End') return last;
                                if (e.key === 'ArrowDown') return Math.min(prev + 1, last);
                                if (e.key === 'ArrowUp') return Math.max(prev - 1, 0);
                                return prev;
                            });
                            return;
                        }
                    };
                    return (
                        <ul
                            id="dropdown"
                            role="listbox"
                            aria-labelledby="category"
                            className="custom-select-dropdown"
                            tabIndex={-1}
                            ref={listRef}
                            aria-activedescendant={activeOptionId}
                            onKeyDown={handleListKeyDown}
                        >
                            {options.map((opt, i) => (
                                <li
                                    key={opt}
                                    id={`category-option-${i}`}
                                    className={`custom-select-option${i === activeIndex ? ' active' : ''}`}
                                    role="option"
                                    aria-selected={selectedOption === opt}
                                    onMouseEnter={() => setActiveIndex(i)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleSelection(opt)}
                                >
                                    {opt}
                                </li>
                            ))}
                        </ul>
                    );
                })()
            )}
        </fieldset>
    )
};

export default CustomSelect;
