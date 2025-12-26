import { useEffect, useRef, useState } from 'react';
import { IconEye, IconEyeOff, IconUser } from '@tabler/icons-react';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';
import { useAuthenticated } from '../../context/AuthContext';
import { useMessages } from '../../context/MessagesContext';
import getCSRF from '../../api/csrf';

export default function SignIn() {
    const { setOpenSignIn } = useOpenSignIn();
    const { setOpenSignUp } = useOpenSignUp();
    const { setAuthenticated } = useAuthenticated();
    const { setMessagesList } = useMessages();
    const [isClosing, setClosing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const containerRef = useRef(null);
    const formRef = useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();
        const csrf = await getCSRF();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrf,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setAuthenticated(true);
            setOpenSignIn(false);
            document.body.style.overflow = 'auto';
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'ok', message: data.message }]);
        } catch (err) {
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: err.message }]);
        }
    }

    function handleChangeForm() {
        setClosing(true);
        setOpenSignUp(true);
    }

    function handleAnimationEnd() {
        if (isClosing) {
            setOpenSignIn(false);
            document.body.style.overflow = 'auto';
        }
    }

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        function handleClick(event) {
            if (!formRef.current?.contains(event.target)) {
                setClosing(true);
            }
        }

        function handleKeydown(event) {
            if (event.key == 'Escape') {
                setClosing(true);
            }
        }

        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [setOpenSignIn]);

    return (
        <div
            ref={containerRef}
            className={`bg-background-blur fixed inset-0 z-3 grid place-items-center opacity-0 backdrop-blur-lg ${isClosing ? 'fade-out' : 'fade-in'}`}
            onAnimationEnd={handleAnimationEnd}
        >
            <form ref={formRef} className='form' onSubmit={handleSubmit}>
                <h2 className='font-primary text-color-text-normal text-4xl font-bold'>SignIn</h2>
                <div>
                    <label htmlFor='email' className='text-md font-secundary text-color-text-normal block'>
                        Email
                    </label>
                    <div className='relative'>
                        <input
                            type='email'
                            id='email'
                            placeholder='exemplo@email.com'
                            className='bg-color1-dark text-md font-secundary min-h-12 w-full rounded-lg pr-12 pl-4 outline-0'
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <label
                            htmlFor='email'
                            className='hover:bg-color1-normal absolute top-1/10 right-[0.3rem] grid aspect-square h-8/10 cursor-pointer place-items-center rounded-sm bg-transparent transition-all duration-125'
                        >
                            <IconUser className='stroke-color-text-normal' />
                        </label>
                    </div>
                </div>
                <div className='input-label'>
                    <label htmlFor='password' className='text-md font-secundary text-color-text-normal block'>
                        Senha
                    </label>
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            placeholder='Sua senha...'
                            className='bg-color1-dark text-md font-secundary min-h-12 w-full rounded-lg pr-12 pl-4 outline-0'
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <button
                            type='button'
                            className='hover:bg-color1-normal absolute top-1/10 right-[0.3rem] grid aspect-square h-8/10 cursor-pointer place-items-center rounded-sm bg-transparent transition-all duration-125'
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? (
                                <IconEye size={26} className='stroke-color-text-normal' />
                            ) : (
                                <IconEyeOff size={26} className='stroke-color-text-normal' />
                            )}
                        </button>
                    </div>
                </div>
                <button
                    type='submit'
                    className='font-primary bg-color-text-normal text-color1-normal hover:shadow-text-color min-h-12 cursor-pointer rounded-lg text-lg transition-all duration-125'
                >
                    Entrar
                </button>
                <p className='text-md font-secundary'>
                    Não tem uma conta?{' '}
                    <span className='text-color-text-normal cursor-pointer hover:underline' onClick={handleChangeForm}>
                        SignUp
                    </span>
                </p>
            </form>
        </div>
    );
}
