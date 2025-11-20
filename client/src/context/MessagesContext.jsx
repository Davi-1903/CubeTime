import { createContext, useContext, useState } from 'react';

const MessagesContext = createContext();

export function MessagesProvider({ children }) {
    const [messagesList, setMessagesList] = useState([]);

    return <MessagesContext.Provider value={{ messagesList, setMessagesList }}>{children}</MessagesContext.Provider>;
}

export function useMessages() {
    return useContext(MessagesContext);
}
