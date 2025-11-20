import { useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { useMessages } from '../../context/MessagesContext';
import './Message.css';

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
            className={`message-content ${type} ${isLeaving ? 'leaving' : 'entry'}`}
            onAnimationEnd={() => handleAnimationEnd(id)}
        >
            <div className='text-content'>
                <span>{message}</span>
            </div>
            <div className='cancel-container'>
                <button className='cancel-btn' onClick={() => setLeaving(true)}>
                    <IconX size={18} />
                </button>
            </div>
            <div className='progress-bar'>
                <div className='progress-value' onAnimationEnd={() => setLeaving(true)}></div>
            </div>
        </div>
    );
}
