import { useCallback, useEffect, useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import Logo from '/assets/images/logo.svg';

export default function Header() {
    const [lockScroll, setLockScroll] = useState(false);
    const [isOpenMenu, setOpenMenu] = useState(false);

    function toggleMenu() {
        if (!isOpenMenu) {
            setOpenMenu(true);
            setLockScroll(true);
        } else {
            closeMenu();
        }
    }

    const closeMenu = useCallback(() => {
        setOpenMenu(false);
        setLockScroll(false);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', closeMenu);
        return () => window.removeEventListener('resize', closeMenu);
    }, [closeMenu]);

    useEffect(() => {
        document.body.style.overflowY = lockScroll ? 'hidden' : 'auto';
    }, [lockScroll]);

    return (
        <header className='w-header bg-header shadow-basic h-header fixed top-2 left-[calc(50%+0.5rem)] z-2 -translate-x-[calc(50%+0.5rem)] rounded-2xl px-8 py-4'>
            <div className='flex h-full items-center justify-between'>
                <Link to='/' className='z-1'>
                    <img src={Logo} alt='Logo' className='aspect-square h-10' />
                </Link>
                <nav className={isOpenMenu ? 'nav-header' : 'hidden sm:block'}>
                    <ul className='flex gap-8'>
                        <li>
                            <Link to='/signin'>
                                <button className='signin'>SignIn</button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/signup'>
                                <button className='signup'>SignUp</button>
                            </Link>
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
