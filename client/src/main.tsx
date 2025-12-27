import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WrapperProvider from './context/wrapperprovider.tsx';

import Layout from './layout.tsx';
const LandingPage = lazy(() => import('./pages/unprotected/landingpage'));
const SignIn = lazy(() => import('./pages/unprotected/signin'));
const SignUp = lazy(() => import('./pages/unprotected/signup'));
const Dash = lazy(() => import('./pages/protected/dash'));
const Profile = lazy(() => import('./pages/protected/profile'));
const Stopwatcher = lazy(() => import('./pages/protected/stopwatcher'));
const Error404 = lazy(() => import('./pages/errors/error404'));

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

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <WrapperProvider>
            <RouterProvider router={router} />
        </WrapperProvider>
    </StrictMode>,
);
