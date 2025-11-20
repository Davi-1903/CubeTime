import Home from './pages/Home/Home';
import LandingPage from './pages/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
import { useAuthenticated } from './context/AuthContext';
import { useMessages } from './context/MessagesContext';
import Message from './components/Message/Message';

export default function App() {
    const { isAuthenticated } = useAuthenticated();
    const { messagesList } = useMessages();

    return (
        <div className='wrapper'>
            <div className='messages-container'>
                {messagesList.map((message, idx) => {
                    const newMessage = { ...message, idx: idx };
                    return <Message {...newMessage} />;
                })}
            </div>
            {isAuthenticated ? <Home /> : <LandingPage />}
            <Footer />
        </div>
    );
}
