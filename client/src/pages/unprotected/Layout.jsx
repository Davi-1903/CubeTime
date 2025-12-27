import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

export default function UnprotectedLayout() {
    return (
        <>
            <Header />
            <main className='col-span-2 grid min-h-screen place-items-center p-8'>
                <Outlet />
            </main>
        </>
    );
}
