import React, { useState } from 'react';
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

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <label className="text-sm text-gray-500">
                {label}
            </label>
            <div
                className={`w-64 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                onClick={() => setIsOpen(prev => !prev)}
            >
                {value ? value : 'Selecione'}
            </div>

            {isOpen && (
                <div
                    className={`absolute z-10 w-64 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                >
                    <Input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar..."
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
                            <li className="px-3 py-2 text-gray-400"></li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
