import { useEffect, useRef, useState } from 'react';
import { IconPlayerPause, IconPlayerPlay, IconRefresh } from '@tabler/icons-react';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import './Stopwatcher.css';

export default function Stopwatcher() {
    const [isStart, setStart] = useState(false);
    const [time, setTime] = useState(0); // Tempo em milissegundos
    const startTime = useRef(null);
    const pausedTime = useRef(0);

    function formatTime(time) {
        const hours = String(Math.floor((time / 3600000) % 60)).padStart(2, '0');
        const minutes = String(Math.floor((time / 600000) % 60)).padStart(2, '0');
        const secunds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
        const millisecunds = String(Math.floor(time % 1000)).padStart(3, '0');
        return `${hours}:${minutes}:${secunds}.${millisecunds}`;
    }

    function handleRefresh() {
        if (!isStart) {
            setTime(0);
            pausedTime.current = 0;
            startTime.current = null;
        }
    }

    function handleStart() {
        setStart(true);
    }

    function handleStop() {
        setStart(false);
        pausedTime.current = time;
    }

    useEffect(() => {
        let animationId;

        if (isStart) {
            startTime.current = performance.now() - pausedTime.current;

            const update = currentTime => {
                setTime(currentTime - startTime.current);
                animationId = requestAnimationFrame(update);
            };

            animationId = requestAnimationFrame(update);
        }

        return () => cancelAnimationFrame(animationId);
    }, [isStart]);

    return (
        <PrivateRoute>
            <div className='stopwatcher-container'>
                <article className='stopwatcher-content'>
                    <h1 id='stopwatcher'>{formatTime(time)}</h1>
                    <div className='functions-container'>
                        {isStart ? (
                            <button id='stop' onClick={handleStop}>
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
        </PrivateRoute>
    );
}
