import { IconUser, IconStopwatch, IconLogout, IconDashboard } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthenticated } from '../../context/AuthContext';
import { useMessages } from '../../context/MessagesContext';
import './Sidebar.css';

export default function Sidebar() {
    const { setAuthenticated } = useAuthenticated();
    const { setMessagesList } = useMessages();
    const navigate = useNavigate();

    async function handleLogout() {
        if (!confirm('Você realmente deseja sair?')) return;

        try {
            const response = await fetch('/api/auth/logout', { credentials: 'include' });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setAuthenticated(false);
            navigate('/');
        } catch (err) {
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: err.message }]);
        }
    }

    return (
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-content'>
                    <img src='assets/images/logo.svg' alt='Logo' className='logo' />
                    <ul className='menu'>
                        <li>
                            <Link to='/'>
                                <button>
                                    <IconDashboard size={24} />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/cronometro'>
                                <button>
                                    <IconStopwatch size={24} />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/perfil'>
                                <button>
                                    <IconUser size={24} />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <button id='logout-btn' onClick={handleLogout}>
                                <IconLogout size={24} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
