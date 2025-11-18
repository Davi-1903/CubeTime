import { useEffect, useRef, useState } from 'react';
import { IconEye, IconEyeOff, IconMail, IconUser } from '@tabler/icons-react';
import { useAuthenticated } from '../../context/AuthContext';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';
import './Forms.css';

export default function SignUp() {
    const { setOpenSignUp } = useOpenSignUp();
    const { setOpenSignIn } = useOpenSignIn();
    const { setAuthenticated } = useAuthenticated();
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
            alert(data.message);
        } catch (err) {
            alert(`Ocorreu um erro. ${err}`);
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

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [setOpenSignUp]);

    return (
        <div
            ref={containerRef}
            className={`form-container ${isClosing ? 'fade-out' : 'fade-in'}`}
            onAnimationEnd={handleAnimationEnd}
        >
            <form ref={formRef} onSubmit={handleSubmit}>
                <h2>SignUp</h2>
                <div className='input-label'>
                    <label htmlFor='nome'>Nome</label>
                    <div className='input-content'>
                        <input
                            type='text'
                            id='nome'
                            placeholder='Seu nome'
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <label htmlFor='nome' className='icon-container'>
                            <IconUser size={26} />
                        </label>
                    </div>
                </div>
                <div className='input-label'>
                    <label htmlFor='email'>Email</label>
                    <div className='input-content'>
                        <input
                            type='email'
                            id='email'
                            placeholder='exemplo@email.com'
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <label htmlFor='email' className='icon-container'>
                            <IconMail size={26} />
                        </label>
                    </div>
                </div>
                <div className='input-label'>
                    <label htmlFor='password'>Senha</label>
                    <div className='input-content'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            placeholder='Sua senha...'
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <button type='button' className='icon-container' onClick={toggleShowPassword}>
                            {showPassword ? <IconEye size={26} /> : <IconEyeOff size={26} />}
                        </button>
                    </div>
                </div>
                <button type='submit'>Cadastrar-se</button>
                <p>
                    Já tem uma conta?{' '}
                    <span className='link' onClick={handleChangeForm}>
                        SignIn
                    </span>
                </p>
            </form>
        </div>
    );
}
