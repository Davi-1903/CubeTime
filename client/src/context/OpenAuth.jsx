import { createContext, useContext, useState } from 'react';

const openSignInContext = createContext();
const openSignUpContext = createContext();

export function OpenAuthProvider({ children }) {
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);

    return (
        <openSignUpContext.Provider value={{ openSignUp, setOpenSignUp }}>
            <openSignInContext.Provider value={{ openSignIn, setOpenSignIn }}>{children}</openSignInContext.Provider>
        </openSignUpContext.Provider>
    );
}

export function useOpenSignIn() {
    return useContext(openSignInContext);
}

export function useOpenSignUp() {
    return useContext(openSignUpContext);
}
