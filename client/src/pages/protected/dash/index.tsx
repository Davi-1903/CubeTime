import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconStopwatch } from '@tabler/icons-react';
import { useMessages } from '../../../context/messagescontext';
import ProtectedRoute from '../../../components/protectedroute';

export default function Dash() {
    const { setMessagesList } = useMessages();
    const [bestTime, setBestTime] = useState(null);

    function prettierTime(time: number): string {
        const hours = String(Math.floor((time / 3600000) % 60));
        const minutes = String(Math.floor((time / 60000) % 60));
        const secunds = String(Math.floor((time / 1000) % 60));
        const millisecunds = String(Math.floor(time % 1000));
        if (+hours) return `${hours}h ${minutes}min ${secunds}s ${millisecunds}ms`;
        if (+minutes) return `${minutes}min ${secunds}s ${millisecunds}ms`;
        if (+secunds) return `${secunds}s ${millisecunds}ms`;
        return `${millisecunds}ms`;
    }

    useEffect(() => {
        fetch('/api/time/', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setBestTime(data.time))
            .catch(err =>
                setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: err.message }]),
            );
    }, [setMessagesList]);

    return (
        <ProtectedRoute isPrivate={true}>
            {bestTime ? (
                <h1 className='font-primary text-color-text-normal text-4xl font-bold'>
                    Best time: <span className='text-color6-dark'>{prettierTime(bestTime)}</span>
                </h1>
            ) : (
                <h1 className='font-primary text-color-text-normal text-4xl font-bold'>Não há tempo registrado</h1>
            )}
            <Link to='/cronometro'>
                <button className='bg-color2-dark hover:shadow-color2 cursor-pointer rounded-2xl px-16 py-4 transition-all duration-250'>
                    <IconStopwatch size={36} className='stroke-color1-normal' />
                </button>
            </Link>
        </ProtectedRoute>
    );
}
