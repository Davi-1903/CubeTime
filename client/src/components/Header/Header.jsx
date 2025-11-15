import { IconUser, IconSettings, IconStopwatch } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useAuthenticated } from '../../context/AuthContext';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';
import Logo from '/assets/images/logo.svg';
import './Header.css';

export default function Header() {
    const { isAuthenticated } = useAuthenticated();
    const { setOpenSignIn } = useOpenSignIn();
    const { setOpenSignUp } = useOpenSignUp();

    function handleOpenSignIn() {
        setOpenSignIn(true);
        document.body.style.overflow = 'hidden';
    }

    function handleOpenSignUp() {
        setOpenSignUp(true);
        document.body.style.overflow = 'hidden';
    }

    return (
        <header>
            <div className='header-container'>
                <Link to='/'>
                    <img src={Logo} alt='Logo' className='logo' />
                </Link>
                <nav>
                    <ul className='menu'>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to='/cronometro'>
                                        <IconStopwatch size={32} />
                                    </Link>
                                </li>
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
                                    <button id='signin' onClick={handleOpenSignIn}>
                                        SignIn
                                    </button>
                                </li>
                                <li>
                                    <button id='signup' onClick={handleOpenSignUp}>
                                        SignUp
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
