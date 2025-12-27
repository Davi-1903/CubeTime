import type { ReactNode } from 'react';
import { AuthenticatedProvider } from './authcontext';
import { MessagesProvider } from './messagescontext';

export default function WrapperProvider({ children }: { children: ReactNode }) {
    return (
        <AuthenticatedProvider>
            <MessagesProvider>{children}</MessagesProvider>
        </AuthenticatedProvider>
    );
}
