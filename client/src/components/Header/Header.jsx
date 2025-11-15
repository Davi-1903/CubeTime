import { IconUser, IconSettings } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useAuthenticated } from '../../context/AuthContext';
import './Header.css';

export default function Header() {
    const { isAuthenticated } = useAuthenticated();

    return (
        <header>
            <div className='header-container'>
                <Link to='/'>
                    <div className='logo'></div>
                </Link>
                <nav>
                    <ul className='menu'>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to='/perfil'>
                                        <IconUser size={32} />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/config'>
                                        <IconSettings size={32} />
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <button id='signin'>SignIn</button>
                                </li>
                                <li>
                                    <button id='signup'>SignUp</button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
