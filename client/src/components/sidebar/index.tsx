import { IconUser, IconStopwatch, IconLogout, IconDashboard } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthenticated } from '../../context/authcontext';
import { useMessages } from '../../context/messagescontext';
import getCSRF from '../../api/csrf';

export default function Sidebar() {
    const { setAuthenticated } = useAuthenticated();
    const { setMessagesList } = useMessages();
    const navigate = useNavigate();

    async function handleLogout() {
        if (!confirm('Você realmente deseja sair?')) return;
        const csrf = await getCSRF();

        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: { 'X-CSRFToken': csrf },
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setAuthenticated(false);
            navigate('/');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro desconhecido';
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: message }]);
        }
    }

    return (
        <nav>
            <div className='bg-color1-light shadow-basic sticky top-4 m-2 h-[calc(100vh-1rem)] w-fit rounded-2xl p-4'>
                <div className='flex h-full w-fit flex-col items-center gap-4'>
                    <img src='assets/images/logo.svg' alt='Logo' className='w-4/5' />
                    <ul className='flex h-full flex-col gap-4'>
                        <li>
                            <Link to='/dash'>
                                <button className='hover:bg-color1-dark cursor-pointer rounded-lg bg-transparent p-2 transition-all duration-125'>
                                    <IconDashboard size={24} className='stroke-color-text-normal' />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/cronometro'>
                                <button className='hover:bg-color1-dark cursor-pointer rounded-lg bg-transparent p-2 transition-all duration-125'>
                                    <IconStopwatch size={24} className='stroke-color-text-normal' />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/perfil'>
                                <button className='hover:bg-color1-dark cursor-pointer rounded-lg bg-transparent p-2 transition-all duration-125'>
                                    <IconUser size={24} className='stroke-color-text-normal' />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <button
                                className='hover:bg-color1-dark cursor-pointer rounded-lg bg-transparent p-2 transition-all duration-125'
                                onClick={handleLogout}
                            >
                                <IconLogout size={24} className='stroke-color5-dark' />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
