import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import LandingPage from './pages/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
import { useAuthenticated } from './context/AuthContext';

export default function App() {
    const { isAuthenticated } = useAuthenticated();

    return (
        <div className='wrapper'>
            <Header />
            {isAuthenticated ? <Home /> : <LandingPage />}
            <Footer />
        </div>
    );
}
