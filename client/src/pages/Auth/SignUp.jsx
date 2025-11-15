import { useEffect, useRef, useState } from 'react';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';
import './Forms.css';

export default function SignUp() {
    const { setOpenSignUp } = useOpenSignUp();
    const { setOpenSignIn } = useOpenSignIn();
    const [isClosing, setClosing] = useState(false);
    const containerRef = useRef(null);
    const formRef = useRef(null);

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
        <div ref={containerRef} className={`form-container ${isClosing ? 'fade-out' : 'fade-in'}`} onAnimationEnd={handleAnimationEnd}>
            <form ref={formRef}>
                <h2>SignUp</h2>
                <div className='input-label'>
                    <label htmlFor='nome'>Nome</label>
                    <input type='text' id='nome' placeholder='Seu nome' required />
                </div>
                <div className='input-label'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' placeholder='exemplo@email.com' required />
                </div>
                <div className='input-label'>
                    <label htmlFor='password'>Senha</label>
                    <input type='password' id='password' placeholder='Sua senha...' required />
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
