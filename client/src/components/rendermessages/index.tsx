import Message from '../message';
import { useMessages } from '../../context/messagescontext';

export default function RenderMessages() {
    const { messagesList } = useMessages();

    return (
        <div className='pointer-events-none fixed top-4 right-4 z-4 flex flex-col gap-4'>
            {messagesList.map(message => {
                return <Message key={message.id} {...message} />;
            })}
        </div>
    );
}
