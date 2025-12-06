import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthenticatedProvider } from './context/AuthContext.jsx';
import { OpenAuthProvider } from './context/OpenAuth.jsx';
import { MessagesProvider } from './context/MessagesContext.jsx';
import Layout from './Layout.jsx';
import Home from './pages/Home/Home.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Stopwatcher from './pages/Stopwatcher/Stopwatcher.jsx';
import Error404 from './pages/Errors/Error404.jsx';
import './globals.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'perfil', element: <Profile /> },
            { path: 'cronometro', element: <Stopwatcher /> },
        ],
    },
    { path: '*', element: <Error404 /> },
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
