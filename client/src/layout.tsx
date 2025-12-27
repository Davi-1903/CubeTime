import Footer from './components/footer';
import ProtectedLayout from './pages/protected/layout';
import UnprotectedLayout from './pages/unprotected/layout';
import RenderMessages from './components/rendermessages';
import { useAuthenticated } from './context/authcontext';

export default function App() {
    const { isAuthenticated } = useAuthenticated();

    return (
        <div className='wrapper'>
            <RenderMessages />
            {isAuthenticated ? <ProtectedLayout /> : <UnprotectedLayout />}
            <Footer />
        </div>
    );
}
