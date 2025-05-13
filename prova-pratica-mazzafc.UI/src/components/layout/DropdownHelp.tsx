import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../utils/transition/transition';
import { IoIosDocument, IoMdInformationCircleOutline } from 'react-icons/io';
import { FaQuestion } from 'react-icons/fa';

interface DropdownHelpProps {
    align?: 'left' | 'right';
}

function DropdownHelp({ align = 'left' }: DropdownHelpProps) {
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
                className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ${dropdownOpen ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
            >
                <span className="sr-only">Need help?</span>
                <IoMdInformationCircleOutline
                    size={25}
                    className="fill-current text-gray-500/80 dark:text-gray-400/80"
                />

            </button>

            <Transition
                className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
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
                    <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase pt-1.5 pb-2 px-3">Precisa de ajuda?</div>
                    <ul>
                        <li>
                            <Link
                                className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
                                to="/doc"
                                onClick={() => setDropdownOpen(false)}
                            >
                                <IoIosDocument className="text-2xl fill-current text-violet-500 shrink-0 mr-2" />

                                <a href='/'>Documentação</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Transition>
        </div>
    );
}

export default DropdownHelp;
