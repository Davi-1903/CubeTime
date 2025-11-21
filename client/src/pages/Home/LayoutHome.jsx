import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function HomeLayout() {
    return (
        <>
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </>
    );
}
