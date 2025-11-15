import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import LandingPage from './pages/LandingPage/LandingPage';

export default function App() {
    const isAuthenticated = true;

    return (
        <div className='wrapper'>
            <Header />
            {isAuthenticated ? <Home /> : <LandingPage />}
        </div>
    );
}
