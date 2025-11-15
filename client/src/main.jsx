import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthenticatedProvider } from './context/AuthContext.jsx';
import { OpenAuthProvider } from './context/OpenAuth.jsx';
import App from './App.jsx';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'config', element: <h1>Config</h1> },
            { path: 'perfil', element: <h1>Profile</h1> },
            { path: 'cronometro', element: <h1>Cronometro</h1> },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthenticatedProvider>
            <OpenAuthProvider>
                <RouterProvider router={router} />
            </OpenAuthProvider>
        </AuthenticatedProvider>
    </StrictMode>
);
