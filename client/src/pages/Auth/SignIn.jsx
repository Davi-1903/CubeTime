import { useEffect, useRef, useState } from 'react';
import { IconEye, IconEyeOff, IconUser } from '@tabler/icons-react';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';
import { useAuthenticated } from '../../context/AuthContext';
import './Forms.css';

export default function SignIn() {
    const { setOpenSignIn } = useOpenSignIn();
    const { setOpenSignUp } = useOpenSignUp();
    const { setAuthenticated } = useAuthenticated();
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

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setAuthenticated(true);
            setOpenSignIn(false);
            document.body.style.overflow = 'auto';
            alert(data.message);
        } catch (err) {
            alert(`Ocoreu um erro. ${err}`);
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
        }
    }, [setOpenSignIn]);

    return (
        <div
            ref={containerRef}
            className={`form-container ${isClosing ? 'fade-out' : 'fade-in'}`}
            onAnimationEnd={handleAnimationEnd}
        >
            <form ref={formRef} onSubmit={handleSubmit}>
                <h2>SignIn</h2>
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
                            <IconUser />
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
                <button type='submit'>Entrar</button>
                <p>
                    Não tem uma conta?{' '}
                    <span className='link' onClick={handleChangeForm}>
                        SignUp
                    </span>
                </p>
            </form>
        </div>
    );
}
