import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import { useOpenSignIn, useOpenSignUp } from '../../context/OpenAuth';

export default function LandingPage() {
    const { openSignIn } = useOpenSignIn();
    const { openSignUp } = useOpenSignUp();

    return (
        <>
            {openSignIn && <SignIn />}
            {openSignUp && <SignUp />}
            <div className='col-span-2 grid min-h-screen place-items-center p-8'>
                <div className='animate-title translate-y-1/4 opacity-0'>
                    <h1 className='font-primary title-cliptext mb-5 text-center text-4xl  font-bold text-transparent lg:text-8xl'>
                        Seja bem-vindo(a)
                    </h1>
                    <p className='font-secundary text-color-text-normal hidden text-center text-2xl sm:block lg:text-4xl'>
                        Sistema para registrar seu tempo no cubo mágico!
                    </p>
                </div>
            </div>
        </>
    );
}
