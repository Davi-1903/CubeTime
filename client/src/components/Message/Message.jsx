import { useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { useMessages } from '../../context/MessagesContext';

export default function Message({ id, type, message }) {
    const { setMessagesList } = useMessages();
    const [isLeaving, setLeaving] = useState(false);

    function deleteMessage(id) {
        setMessagesList(prev => prev.filter(message => message.id !== id));
    }

    function handleAnimationEnd(id) {
        if (isLeaving) {
            deleteMessage(id);
            setLeaving(false);
        }
    }

    return (
        <div
            key={id}
            className={`pointer-events-auto relative flex w-80 justify-between gap-4 overflow-x-hidden rounded-lg p-4 backdrop-blur-lg ${type === 'ok' ? 'bg-ok' : 'bg-danger'} ${isLeaving ? 'animate-message-leaving' : 'animate-message-entry'}`}
            onAnimationEnd={() => handleAnimationEnd(id)}
        >
            <div className='text-md font-secundary text-color1-normal text-center'>
                <span>{message}</span>
            </div>
            <div>
                <button
                    className='hover:bg-color5-dark cursor-pointer rounded-sm bg-transparent p-1 transition-all duration-125'
                    onClick={() => setLeaving(true)}
                >
                    <IconX size={18} className='stroke-color1-normal' />
                </button>
            </div>
            <div className='absolute bottom-0 left-0 h-1 w-full'>
                <div
                    className='bg-color1-light animate-progress h-full w-1/2 rounded-lg'
                    onAnimationEnd={() => setLeaving(true)}
                ></div>
            </div>
        </div>
    );
}
