import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { InputTypes } from '../../types/ui/Inputs';
import { NumericFormat } from "react-number-format";

type InputProps = {
    value: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    placeholder?: string;
    type?: InputTypes;
    label?: string;
    min?: number | null;
    max?: number | null;
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

type InputPriceProps = {
    value?: number;
    onChangeValue?: (value: number) => void;
    prefix: string;
    label?: string
};
export const InputPrice: React.FC<InputPriceProps> = ({ prefix, onChangeValue, value, label }) => (
    <div className="flex flex-col space-y-1">
        {label && <label htmlFor="category" className="text-sm text-gray-500">
            {label}
        </label>}
        <NumericFormat
            value={value}
            thousandSeparator="."
            decimalSeparator=","
            prefix={`${prefix} `}
            decimalScale={2}
            onValueChange={({ floatValue }) => onChangeValue?.(floatValue || 0)}
            placeholder="Digite o valor"
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);