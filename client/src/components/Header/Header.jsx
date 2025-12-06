import { useCallback, useEffect, useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';
import Logo from '/assets/images/logo.svg';

export default function Header() {
    const { setOpenSignIn } = useOpenSignIn();
    const { setOpenSignUp } = useOpenSignUp();
    const [lockScroll, setLockScroll] = useState(false);
    const [isOpenMenu, setOpenMenu] = useState(false);

    function handleOpenSignIn() {
        closeMenu();
        setOpenSignIn(true);
        setLockScroll(true);
    }

    function handleOpenSignUp() {
        closeMenu();
        setOpenSignUp(true);
        setLockScroll(true);
    }

    function toggleMenu() {
        if (!isOpenMenu) {
            setOpenMenu(true);
            setLockScroll(true);
        } else {
            closeMenu();
        }
    }

    const closeMenu = useCallback(() => {
        if (isOpenMenu) {
            setOpenMenu(false);
            setLockScroll(false);
        }
    }, [isOpenMenu]);

    useEffect(() => {
        window.addEventListener('resize', closeMenu);
        return () => window.removeEventListener('resize', closeMenu);
    }, [closeMenu]);

    useEffect(() => {
        document.body.style.overflowY = lockScroll ? 'hidden' : 'auto';
    }, [lockScroll]);

    return (
        <header className='w-header bg-header shadow-basic h-header fixed top-4 left-[calc(50%+1rem)] z-2 -translate-x-[calc(50%+1rem)] rounded-2xl px-8 py-4'>
            <div className='flex h-full items-center justify-between'>
                <Link to='/' className='z-1'>
                    <img src={Logo} alt='Logo' className='aspect-square h-12' />
                </Link>
                <nav className={isOpenMenu ? 'nav-header' : 'hidden sm:block'}>
                    <ul className='flex gap-8'>
                        <li>
                            <button className='signin' onClick={handleOpenSignIn}>
                                SignIn
                            </button>
                        </li>
                        <li>
                            <button className='signup' onClick={handleOpenSignUp}>
                                SignUp
                            </button>
                        </li>
                    </ul>
                </nav>
                <button
                    className='hover:bg-color1-dark z-1 cursor-pointer rounded-lg bg-transparent p-2 transition-all duration-125 sm:hidden'
                    onClick={toggleMenu}
                >
                    {isOpenMenu ? (
                        <IconX size={32} className='stroke-color-text-normal' />
                    ) : (
                        <IconMenu2 size={32} className='stroke-color-text-normal' />
                    )}
                </button>
            </div>
        </header>
    );
}
