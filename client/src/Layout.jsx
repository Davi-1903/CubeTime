import Footer from './components/Footer/Footer';
import ProtectedLayout from './pages/protected/Layout';
import UnprotectedLayout from './pages/unprotected/Layout';
import RenderMessages from './components/RenderMessages/RenderMessages';
import { useAuthenticated } from './context/AuthContext';

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
