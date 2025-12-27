import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconEye, IconEyeOff, IconUser } from '@tabler/icons-react';
import { useAuthenticated } from '../../../context/AuthContext';
import { useMessages } from '../../../context/MessagesContext';
import getCSRF from '../../../api/csrf';
import ProtectedRoute from '../../../components/ProtectedRoute/ProtectedRoute';

export default function SignIn() {
    const { setAuthenticated } = useAuthenticated();
    const { setMessagesList } = useMessages();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

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
            document.body.style.overflow = 'auto';
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'ok', message: data.message }]);
            navigate('/dash');
        } catch (err) {
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: err.message }]);
        }
    }

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <ProtectedRoute isPrivate={false}>
            <form className='form' onSubmit={handleSubmit}>
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
                    <Link to='/signup' className='text-color-text-normal cursor-pointer hover:underline'>
                        SignUp
                    </Link>
                </p>
            </form>
        </ProtectedRoute>
    );
}
