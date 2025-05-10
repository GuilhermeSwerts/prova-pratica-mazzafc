import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Transition from '../../utils/transition/transition'

type SelectTransitionProps = {
    ButtonIcon: React.ElementType,
    ButtonName: string,
    children: ReactNode,
}

export const SelectTransition: React.FC<SelectTransitionProps> = ({ ButtonIcon, ButtonName, children }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null);
    const dropdown = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            const target = e.target as Node;
            if (!dropdown.current || !trigger.current) return;
            if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [dropdownOpen]);

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (!dropdownOpen || e.key !== 'Escape') return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, [dropdownOpen]);


    return (
        <div className="relative inline-flex">
            <button
                ref={trigger}
                className="border border-gray-400 text-gray-800 bg-white hover:bg-gray-100 focus:ring-gray-400 p-2 border border-gray-300 rounded-lg flex items-center justify-center w-20"
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
            >
                <ButtonIcon /> {ButtonName}
            </button>

            <Transition
                className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 left-0`}
                show={dropdownOpen}
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
            >
                <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                >
                    {children}
                </div>
            </Transition>
        </div>
    );
};
