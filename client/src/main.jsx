import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WrapperProvider from './context/WrapperProvider.jsx';

import Layout from './Layout.jsx';
import LandingPage from './pages/unprotected/LandingPage/LandingPage.jsx';
import SignIn from './pages/unprotected/SignIn/SignIn.jsx';
import SignUp from './pages/unprotected/SignUp/SignUp.jsx';
import Dash from './pages/protected/Dash/Dash.jsx';
import Profile from './pages/protected/Profile/Profile.jsx';
import Stopwatcher from './pages/protected/Stopwatcher/Stopwatcher.jsx';
import Error404 from './pages/Errors/Error404.jsx';

import './globals.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: 'signin', element: <SignIn /> },
            { path: 'signup', element: <SignUp /> },
            { path: 'dash', element: <Dash /> },
            { path: 'perfil', element: <Profile /> },
            { path: 'cronometro', element: <Stopwatcher /> },
        ],
    },
    { path: '*', element: <Error404 /> },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <WrapperProvider>
            <RouterProvider router={router} />
        </WrapperProvider>
    </StrictMode>,
);
