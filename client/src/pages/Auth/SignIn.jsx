import { useEffect, useRef, useState } from 'react';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';
import './Forms.css';
import { useAuthenticated } from '../../context/AuthContext';

export default function SignIn() {
    const { setOpenSignIn } = useOpenSignIn();
    const { setOpenSignUp } = useOpenSignUp();
    const { setAuthenticated } = useAuthenticated();
    const [isClosing, setClosing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
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

    useEffect(() => {
        function handleClick(event) {
            if (!formRef.current?.contains(event.target)) {
                setClosing(true);
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
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
                    <input
                        type='email'
                        id='email'
                        placeholder='exemplo@email.com'
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div className='input-label'>
                    <label htmlFor='password'>Senha</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Sua senha...'
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
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
