import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export type User = {
    name: string;
    token: string;
};

type UserContextType = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const login = (userData: User) => {
        setUser(userData);
        sessionStorage.setItem('user', userData.name);
        sessionStorage.setItem('access_token', userData.token);
    };
    
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('user');
        window.location.href = "/login"
    };

    useEffect(() => {
        const name = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('access_token');

        if (name && token) {
            setUser({ name, token });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a LoginProvider');
    }
    return context;
};
