import { createContext, useContext, useEffect, useState } from 'react';

const AuthenticatedContext = createContext();

export function AuthenticatedProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/auth/check', { credentials: 'include' })
            .then(res => setAuthenticated(res.status === 200))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <AuthenticatedContext.Provider value={{ isAuthenticated, setAuthenticated, isLoading }}>
            {children}
        </AuthenticatedContext.Provider>
    );
}

export function useAuthenticated() {
    return useContext(AuthenticatedContext);
}
