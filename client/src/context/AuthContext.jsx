import { createContext, useContext, useEffect, useState } from 'react';

const AuthenticatedContext = createContext();

export function AuthenticatedProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        fetch('/api/auth/check', { credentials: 'include' })
            .then(res => setAuthenticated(res.status === 200))
            .catch(err => {
                setAuthenticated(false);
                console.error(err);
            });
    }, []);

    return (
        <AuthenticatedContext.Provider value={{ isAuthenticated, setAuthenticated }}>
            {children}
        </AuthenticatedContext.Provider>
    );
}

export function useAuthenticated() {
    return useContext(AuthenticatedContext);
}
