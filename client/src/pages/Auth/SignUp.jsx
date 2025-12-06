import { useEffect, useRef, useState } from 'react';
import { IconEye, IconEyeOff, IconMail, IconUser } from '@tabler/icons-react';
import { useAuthenticated } from '../../context/AuthContext';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';
import { useMessages } from '../../context/MessagesContext';

export default function SignUp() {
    const { setOpenSignUp } = useOpenSignUp();
    const { setOpenSignIn } = useOpenSignIn();
    const { setAuthenticated } = useAuthenticated();
    const { setMessagesList } = useMessages();
    const [isClosing, setClosing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const containerRef = useRef(null);
    const formRef = useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setAuthenticated(true);
            setOpenSignUp(false);
            document.body.style.overflow = 'auto';
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'ok', message: data.message }]);
        } catch (err) {
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: err.message }]);
        }
    }

    function handleChangeForm() {
        setOpenSignUp(false);
        setOpenSignIn(true);
    }

    function handleAnimationEnd() {
        if (isClosing) {
            setOpenSignUp(false);
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
    }, [setOpenSignUp]);

    return (
        <div
            ref={containerRef}
            className={`bg-background-blur fixed inset-0 z-3 grid place-items-center opacity-0 backdrop-blur-lg ${isClosing ? 'fade-out' : 'fade-in'}`}
            onAnimationEnd={handleAnimationEnd}
        >
            <form ref={formRef} className='form' onSubmit={handleSubmit}>
                <h2 className='font-primary text-color-text-normal text-4xl font-bold'>SignUp</h2>
                <div className='input-label'>
                    <label htmlFor='nome' className='text-md font-secundary text-color-text-normal block'>
                        Nome
                    </label>
                    <div className='relative'>
                        <input
                            type='text'
                            id='nome'
                            placeholder='Seu nome'
                            className='bg-color1-dark text-md font-secundary min-h-12 w-full rounded-lg pr-12 pl-4 outline-0'
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <label
                            htmlFor='nome'
                            className='hover:bg-color1-normal absolute top-1/10 right-[0.3rem] grid aspect-square h-8/10 cursor-pointer place-items-center rounded-sm bg-transparent transition-all duration-125'
                        >
                            <IconUser size={26} className='stroke-color-text-normal' />
                        </label>
                    </div>
                </div>
                <div className='input-label'>
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
                            <IconMail size={26} className='stroke-color-text-normal' />
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
                    Cadastrar-se
                </button>
                <p>
                    Já tem uma conta?{' '}
                    <span className='text-color-text-normal cursor-pointer hover:underline' onClick={handleChangeForm}>
                        SignIn
                    </span>
                </p>
            </form>
        </div>
    );
}
