import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';
import './LandingPage.css';

export default function LandingPage() {
    const { openSignIn } = useOpenSignIn();
    const { openSignUp } = useOpenSignUp();

    return (
        <>
            {openSignIn && <SignIn />}
            {openSignUp && <SignUp />}
            <div className='welcome-container'>
                <div className='text-container'>
                    <h1>Seja bem-vindo(a)</h1>
                    <p>Sistema para registrar seu tempo no cubo mágico!</p>
                </div>
            </div>
        </>
    );
}
