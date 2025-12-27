import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar';

export default function ProtectedLayout() {
    return (
        <>
            <Sidebar />
            <main className='flex h-full flex-col items-center justify-center gap-8'>
                <Outlet />
            </main>
        </>
    );
}
