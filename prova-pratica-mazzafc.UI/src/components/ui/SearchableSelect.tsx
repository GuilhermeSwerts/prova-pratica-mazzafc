import React, { useEffect, useRef, useState } from 'react';
import { Input } from './Input';
import { OptionType } from '../../types/ui/SearchableSelect';

type SearchableSelectProps = {
    options: OptionType[],
    value: string,
    onChange: (value: string) => void;
    className?: string
    label: string
}
export default function SearchableSelect({ options, onChange, value, className, label }: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    const getTitle = () => {
        if (!value) return 'Selecione';
        return options.find(x => x.value === value)?.label;
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearch('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            <label className="text-sm text-gray-500">{label}</label>
            <div
                className={`w-64 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                onClick={() => setIsOpen(prev => !prev)}
            >
                {getTitle()}
            </div>

            {isOpen && (
                <div
                    className={`absolute z-10 w-64 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm ${className}`}
                >
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar..."
                        className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
                    />
                    <ul className="max-h-40 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <li
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                        setSearch('');
                                    }}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {option.label}
                                </li>
                            ))
                        ) : (
                            <li className="px-3 py-2 text-gray-400">Nenhum resultado</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}