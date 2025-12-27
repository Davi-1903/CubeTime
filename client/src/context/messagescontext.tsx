import { createContext, useContext, useState, type ReactNode } from 'react';
import type { MessagesContextType, MessageType } from '../interface/Objects';

const MessagesContext = createContext<MessagesContextType>({ messagesList: [], setMessagesList: () => {} });

export function MessagesProvider({ children }: { children: ReactNode }) {
    const [messagesList, setMessagesList] = useState<MessageType[]>([]);

    return <MessagesContext.Provider value={{ messagesList, setMessagesList }}>{children}</MessagesContext.Provider>;
}

export function useMessages() {
    return useContext(MessagesContext);
}
