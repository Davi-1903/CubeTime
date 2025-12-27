import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticated } from '../../context/authcontext';
import type { ProtectedRouteProps } from '../../interface/Props';
import Loading from '../loading';

export default function ProtectedRoute({ children, isPrivate }: ProtectedRouteProps) {
    const [isOk, setOk] = useState<boolean | null>(null);
    const [isLoading, setLoading] = useState(false);
    const { setAuthenticated } = useAuthenticated();

    useEffect(() => {
        const loadingId = setTimeout(() => {
            setLoading(true);
        }, 100);

        fetch('/api/auth/check', { credentials: 'include' })
            .then(res => {
                const result = res.status === 200;
                setOk(result);
                setAuthenticated(result);
            })
            .catch(err => {
                setOk(false);
                setAuthenticated(false);
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
                clearTimeout(loadingId);
            });

        return () => clearTimeout(loadingId);
    }, [setAuthenticated]);

    if (isOk === null && isLoading) return <Loading />;
    if (isOk !== null && isPrivate && !isOk) return <Navigate to='/signin' />;
    if (isOk !== null && !isPrivate && isOk) return <Navigate to='/dash' />;
    if (isOk !== null) return children;
}
