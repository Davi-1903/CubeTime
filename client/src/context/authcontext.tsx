import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AuthenticatedContextType } from '../interface/Objects';

const AuthenticatedContext = createContext<AuthenticatedContextType>({
    isAuthenticated: false,
    setAuthenticated: () => {},
});

export function AuthenticatedProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setAuthenticated] = useState(false);

    return (
        <AuthenticatedContext.Provider value={{ isAuthenticated, setAuthenticated }}>
            {children}
        </AuthenticatedContext.Provider>
    );
}

export function useAuthenticated() {
    return useContext(AuthenticatedContext);
}
