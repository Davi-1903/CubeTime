import { useEffect, useRef, useState } from 'react';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';
import './Forms.css';

export default function SignIn() {
    const { setOpenSignIn } = useOpenSignIn();
    const { setOpenSignUp } = useOpenSignUp();
    const [isClosing, setClosing] = useState(false);
    const containerRef = useRef(null);
    const formRef = useRef(null);

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
            <form ref={formRef}>
                <h2>SignIn</h2>
                <div className='input-label'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' placeholder='exemplo@email.com' required />
                </div>
                <div className='input-label'>
                    <label htmlFor='password'>Senha</label>
                    <input type='password' id='password' placeholder='Sua senha...' required />
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
