import ProtectedRoute from '../../../components/ProtectedRoute/ProtectedRoute';

export default function LandingPage() {
    return (
        <ProtectedRoute isPrivate={false}>
            <div className='animate-title translate-y-1/4 opacity-0'>
                <h1 className='font-primary mb-5 bg-linear-to-r from-(--base-color2) via-(--base-color3) to-(--base-color4) bg-clip-text text-center text-4xl font-bold text-transparent lg:text-8xl'>
                    Seja bem-vindo(a)
                </h1>
                <p className='font-secundary text-color-text-normal hidden text-center text-2xl sm:block lg:text-4xl'>
                    Sistema para registrar seu tempo no cubo mágico!
                </p>
            </div>
        </ProtectedRoute>
    );
}
