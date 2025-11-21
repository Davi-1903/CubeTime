import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconStopwatch } from '@tabler/icons-react';
import { useMessages } from '../../context/MessagesContext';
import './Home.css';

export default function Home() {
    const { setMessagesList } = useMessages();
    const [bestTime, setBestTime] = useState(null);

    function prettierTime(time) {
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
                setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: err.message }])
            );
    }, [setMessagesList]);

    return (
        <div className='home-container'>
            {bestTime ? <h1 className='message'>Best time: <span>{prettierTime(bestTime)}</span></h1> : <h1 className='message'>Não há tempo registrado</h1>}
            <div className='buttons-content'>
                <Link to='/cronometro'>
                    <button>
                        <IconStopwatch size={36}/>
                    </button>
                </Link>
            </div>
        </div>
    );
}
