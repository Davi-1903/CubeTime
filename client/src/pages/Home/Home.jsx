import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Home() {
    return (
        <>
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </>
    );
}
