import React from 'react';
import clsx from 'clsx';
import { ButtonVariant } from '../../types/ui/Button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    className,
    disabled,
    ...props
}) => {
    const baseClasses =
        'px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants: Record<ButtonVariant, string> = {
        primary:
            'cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary:
            'cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
        danger:
            'cursor-pointer bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        outline:
            'cursor-pointer border border-gray-400 text-gray-800 bg-white hover:bg-gray-100 focus:ring-gray-400',
        ghost:
            'cursor-pointer bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
    };

    const disabledClasses = 'opacity-50 cursor-not-allowed';

    return (
        <button
            className={clsx(
                baseClasses,
                variants[variant],
                disabled && disabledClasses,
                className
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
