import { useState } from 'react';
import { IconPlayerPause, IconPlayerPlay, IconRefresh } from '@tabler/icons-react';
import './Stopwatcher.css';

export default function Stopwatcher() {
    const [isStart, setStart] = useState(false);
    const [time, setTime] = useState(0); // Tempo em milissegundos

    function formatTime(time) {
        const hours = String(Math.floor((time / 3600000) % 60)).padStart(2, '0');
        const minutes = String(Math.floor((time / 600000) % 60)).padStart(2, '0');
        const secunds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
        const millisecunds = String(Math.floor(time % 1000)).padStart(3, '0');
        return `${hours}:${minutes}:${secunds}.${millisecunds}`;
    }

    function handleRefresh() {
        if (!isStart) setTime(0);
    }

    function handleStart() {
        setStart(!isStart);
    }

    return (
        <div className='stopwatcher-container'>
            <article className='stopwatcher-content'>
                <h1 id='stopwatcher'>{formatTime(time)}</h1>
                <div className='functions-container'>
                    {isStart ? (
                        <button id='stop' onClick={handleStart}>
                            <IconPlayerPause size={36} />
                        </button>
                    ) : (
                        <button id='start' onClick={handleStart}>
                            <IconPlayerPlay size={36} />
                        </button>
                    )}
                    <button id='refresh' onClick={handleRefresh} disabled={isStart}>
                        <IconRefresh size={36} />
                    </button>
                </div>
            </article>
        </div>
    );
}
