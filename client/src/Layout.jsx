import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import Message from './components/Message/Message';
import LandingPage from './pages/LandingPage/LandingPage';
import { useAuthenticated } from './context/AuthContext';
import { useMessages } from './context/MessagesContext';

export default function App() {
    const { isAuthenticated } = useAuthenticated();
    const { messagesList } = useMessages();

    return (
        <div className='wrapper'>
            <div className='pointer-events-none fixed top-4 right-4 z-4 flex flex-col gap-4'>
                {messagesList.map((message, idx) => {
                    const newMessage = { ...message, idx: idx };
                    return <Message key={message.id} {...newMessage} />;
                })}
            </div>
            {isAuthenticated ? <Sidebar /> : <Header />}
            {isAuthenticated ? <Outlet /> : <LandingPage />}
            <Footer />
        </div>
    );
}
