import { Link } from 'react-router-dom';

export default function Error404() {
    return (
        <div className='bg-color1-normal flex min-h-screen flex-col items-center justify-center gap-8'>
            <h1 className='font-primary text-color-text-normal text-5xl font-bold'>
                404 | Página não encontrada :{'('}
            </h1>
            <Link to='/'>
                <button className='bg-color2-dark font-primary hover:shadow-color2 text-color1-normal cursor-pointer rounded-lg px-16 py-4 text-xl transition-all duration-250'>
                    Inicio
                </button>
            </Link>
        </div>
    );
}
