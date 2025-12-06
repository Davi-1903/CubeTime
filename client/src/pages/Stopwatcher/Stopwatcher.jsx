import { useCallback, useEffect, useRef, useState } from 'react';
import { IconPlayerPauseFilled, IconPlayerPlayFilled, IconRefresh } from '@tabler/icons-react';
import { useMessages } from '../../context/MessagesContext';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';

export default function Stopwatcher() {
    const { setMessagesList } = useMessages();
    const [bestTime, setBestTime] = useState(null);
    const [isStart, setStart] = useState(false);
    const [timeList, setTimeList] = useState([]);
    const [time, setTime] = useState(0); // Tempo em milissegundos
    const startTime = useRef(null);
    const pausedTime = useRef(0);

    const fetchBestTime = useCallback(async () => {
        try {
            const response = await fetch('/api/time/', { credentials: 'include' });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setBestTime(data.time);
        } catch (err) {
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: err.message }]);
        }
    }, [setMessagesList]);

    async function handleSaveTime() {
        if (!confirm(`Você deseja salvar o tempo de ${prettierTime(calcMedia())}`)) return;

        try {
            const response = await fetch('/api/time/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ time: calcMedia(timeList) }),
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setTimeList([]);
            setTime(0);
            pausedTime.current = 0;
            startTime.current = null;
            fetchBestTime();
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'ok', message: data.message }]);
        } catch (err) {
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: err.message }]);
        }
    }

    function formatTime(time) {
        const hours = String(Math.floor((time / 3600000) % 60)).padStart(2, '0');
        const minutes = String(Math.floor((time / 60000) % 60)).padStart(2, '0');
        const secunds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
        const millisecunds = String(Math.floor(time % 1000)).padStart(3, '0');
        return `${hours}:${minutes}:${secunds}.${millisecunds}`;
    }

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

    function handleRefresh() {
        if (!isStart) {
            setTime(0);
            pausedTime.current = 0;
            startTime.current = null;
            if (time !== 0 && timeList.length < 3) {
                setTimeList(prev => [...prev, { id: prev.length + 1, time: Math.round(time) }]);
            }
        }
    }

    function handleStart() {
        setStart(true);
    }

    const handleStop = useCallback(() => {
        setStart(false);
        pausedTime.current = time;
    }, [time]);

    function handleClearTimes() {
        setTimeList([]);
    }

    function calcMedia() {
        return Math.round(timeList.map(item => item.time).reduce((total, value) => total + value) / timeList.length);
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

    useEffect(() => {
        fetchBestTime();
    }, [fetchBestTime]);

    useEffect(() => {
        function handleKeydown(event) {
            event.preventDefault();
        }

        function handleKeyupStart(event) {
            event.preventDefault();
            if (isStart) {
                handleStop();
                return;
            }
            if (!isStart && event.code === 'Space') {
                handleStart();
                return;
            }
        }

        window.addEventListener('keyup', handleKeyupStart);
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keyup', handleKeyupStart);
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [isStart, handleStop]);

    return (
        <PrivateRoute>
            <div className='grid min-h-screen place-items-center'>
                <article>
                    <span className='text-color6-dark font-primary block text-center text-4xl font-bold'>
                        {bestTime && prettierTime(bestTime)}
                    </span>
                    <h1 className='font-primary text-color-text-normal my-8 text-8xl font-bold'>{formatTime(time)}</h1>
                    <div className='flex gap-8'>
                        {timeList.length !== 3 ? (
                            <>
                                {isStart ? (
                                    <button
                                        className='bg-color5-dark hover:shadow-color5 grid flex-1 cursor-pointer place-items-center rounded-2xl px-16 py-4 transition-all duration-250'
                                        onClick={handleStop}
                                    >
                                        <IconPlayerPauseFilled
                                            size={36}
                                            className='stroke-color1-normal fill-color1-normal'
                                        />
                                    </button>
                                ) : (
                                    <button
                                        className='bg-color6-dark hover:shadow-color6 grid flex-1 cursor-pointer place-items-center rounded-2xl px-16 py-4 transition-all duration-250'
                                        onClick={handleStart}
                                    >
                                        <IconPlayerPlayFilled
                                            size={36}
                                            className='stroke-color1-normal fill-color1-normal'
                                        />
                                    </button>
                                )}
                                <button
                                    className='bg-color2-dark hover:shadow-color2 disabled:bg-color-text-dark grid flex-1 cursor-pointer place-items-center rounded-2xl px-16 py-4 transition-all duration-250 disabled:cursor-not-allowed disabled:shadow-none'
                                    onClick={handleRefresh}
                                    disabled={isStart}
                                >
                                    <IconRefresh size={36} className='stroke-color1-normal' />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className='bg-color6-dark font-primary hover:shadow-color6 text-color1-normal flex-1 cursor-pointer rounded-2xl px-16 py-4 text-2xl/[36px] transition-all duration-250'
                                    onClick={handleSaveTime}
                                >
                                    Save
                                </button>
                                <button
                                    className='bg-color5-dark font-primary text-color1-normal hover:shadow-color5 flex-1 cursor-pointer rounded-2xl px-16 py-4 text-2xl/[36px] transition-all duration-250'
                                    onClick={handleClearTimes}
                                >
                                    Clear
                                </button>
                            </>
                        )}
                    </div>
                    <div className='mx-auto mt-4 w-fit p-2'>
                        <ol className='list-decimal'>
                            {timeList.map(time => (
                                <li key={time.id} className='font-primary text-color-text-light p-2 text-2xl'>
                                    {prettierTime(time.time)}
                                </li>
                            ))}
                        </ol>
                        {timeList.length === 3 && (
                            <span>
                                <strong
                                    className={`font-primary p-2 text-2xl font-bold ${bestTime === null || calcMedia() < bestTime ? 'text-color6-dark' : 'text-color5-dark'}`}
                                >
                                    {prettierTime(calcMedia())}
                                </strong>
                            </span>
                        )}
                    </div>
                </article>
            </div>
        </PrivateRoute>
    );
}
