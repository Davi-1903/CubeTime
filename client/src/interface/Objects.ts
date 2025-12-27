import type { Dispatch, SetStateAction } from 'react';

export interface MessageType {
    id: number;
    type: string;
    message: string;
}

export interface AuthenticatedContextType {
    isAuthenticated: boolean;
    setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export interface MessagesContextType {
    messagesList: MessageType[];
    setMessagesList: Dispatch<SetStateAction<MessageType[]>>;
}

export interface User {
    name: string;
    email: string;
}
