import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { InputTypes } from '../../types/ui/Inputs';

type InputProps = {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    placeholder?: string;
    type?: InputTypes;
    label?: string
};

export const SearchInput: React.FC<InputProps> = ({ onChange, placeholder = "", value, onClick }) => {
    return (
        <div className="relative">
            <Input
                type="text"
                value={value}
                onChange={onChange}
                onClick={onClick}
                placeholder={placeholder}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FaSearch size={25} />
            </button>
        </div>
    );
};

export const Input: React.FC<InputProps> = ({
    value,
    onChange,
    placeholder = '',
    type = 'text',
    label = "",
}) => {
    return (
        <div className="flex flex-col space-y-1">
            {label && <label htmlFor="category" className="text-sm text-gray-500">
                {label}
            </label>}
            <input
                onChange={onChange}
                type={type}
                value={value}
                placeholder={placeholder}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};
