import { useEffect, useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';
import Logo from '/assets/images/logo.svg';
import './Header.css';

export default function Header() {
    const { setOpenSignIn } = useOpenSignIn();
    const { setOpenSignUp } = useOpenSignUp();
    const [isOpenSidebar, setOpenSidebar] = useState(false);

    function handleOpenSignIn() {
        setOpenSidebar(false);
        setOpenSignIn(true);
        document.body.style.overflow = 'hidden';
    }

    function handleOpenSignUp() {
        setOpenSidebar(false);
        setOpenSignUp(true);
        document.body.style.overflow = 'hidden';
    }

    function toggleSidebar() {
        setOpenSidebar(!isOpenSidebar);
    }

    useEffect(() => {
        function handleResize() {
            setOpenSidebar(false);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header>
            <div className='header-container'>
                <Link to='/'>
                    <img src={Logo} alt='Logo' className='logo' />
                </Link>
                <nav className={isOpenSidebar ? 'open' : ''}>
                    <ul className='menu'>
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
                    </ul>
                </nav>
                <button className='menu-btn' onClick={toggleSidebar}>
                    {isOpenSidebar ? <IconX size={32} /> : <IconMenu2 size={32} />}
                </button>
            </div>
        </header>
    );
}
