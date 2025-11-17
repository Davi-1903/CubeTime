import { IconUser, IconStopwatch, IconLogout, IconDashboard } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <img src='assets/images/logo.svg' alt='Logo' className='logo' />
                <div className='sidebar-content'>
                    <ul className='menu'>
                        <li>
                            <Link to='/'>
                                <IconDashboard />
                            </Link>
                        </li>
                        <li>
                            <Link to='/cronometro'>
                                <IconStopwatch />
                            </Link>
                        </li>
                        <li>
                            <Link to='/perfil'>
                                <IconUser />
                            </Link>
                        </li>
                        <li>
                            <button>
                                <IconLogout />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
