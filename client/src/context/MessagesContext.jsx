import { createContext, useContext, useState } from 'react';

const MessagesContext = createContext();

export function MessagesProvider({ children }) {
    const [messagesList, setMessagesList] = useState([
        { id: 1, type: 'danger', message: 'Senha inválida' },
        { id: 2, type: 'ok', message: 'Novo recorde do usuário 2831923791238 com o tempo de 10s 500ms' },
        { id: 3, type: 'danger', message: 'Este email já existe' },
    ]);

    return <MessagesContext.Provider value={{ messagesList, setMessagesList }}>{children}</MessagesContext.Provider>;
}

export function useMessages() {
    return useContext(MessagesContext);
}
