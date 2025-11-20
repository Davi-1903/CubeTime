import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthenticatedProvider } from './context/AuthContext.jsx';
import { OpenAuthProvider } from './context/OpenAuth.jsx';
import { MessagesProvider } from './context/MessagesContext.jsx';
import App from './App.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Stopwatcher from './pages/Stopwatcher/Stopwatcher.jsx';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'perfil', element: <Profile /> },
            { path: 'cronometro', element: <Stopwatcher /> },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthenticatedProvider>
            <OpenAuthProvider>
                <MessagesProvider>
                    <RouterProvider router={router} />
                </MessagesProvider>
            </OpenAuthProvider>
        </AuthenticatedProvider>
    </StrictMode>
);
