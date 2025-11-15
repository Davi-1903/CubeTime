import { useEffect, useRef } from 'react';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';
import './Forms.css';

export default function SignIn() {
    const { setOpenSignIn } = useOpenSignIn();
    const { setOpenSignUp } = useOpenSignUp();
    const formRef = useRef(null);

    function handleChangeForm() {
        setOpenSignIn(false);
        setOpenSignUp(true);
    }

    useEffect(() => {
        function handleClick(event) {
            if (!formRef.current?.contains(event.target)) {
                setOpenSignIn(false);
                document.body.style.overflow = 'auto';
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [setOpenSignIn]);

    return (
        <div className='form-container'>
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
                    Não tem uma conta? <span className='link' onClick={handleChangeForm}>SignUp</span>
                </p>
            </form>
        </div>
    );
}
