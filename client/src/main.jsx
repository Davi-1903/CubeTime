import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { AuthenticatedProvider } from './context/AuthContext.jsx';
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
            <RouterProvider router={router} />
        </AuthenticatedProvider>
    </StrictMode>
);
