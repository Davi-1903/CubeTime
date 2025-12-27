import Message from '../Message/Message';
import { useMessages } from '../../context/MessagesContext';

export default function RenderMessages() {
    const { messagesList } = useMessages();

    return (
        <div className='pointer-events-none fixed top-4 right-4 z-4 flex flex-col gap-4'>
            {messagesList.map((message, idx) => {
                const newMessage = { ...message, idx: idx };
                return <Message key={message.id} {...newMessage} />;
            })}
        </div>
    );
}
