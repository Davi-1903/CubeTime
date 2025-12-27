import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticated } from '../../../context/authcontext';
import { useMessages } from '../../../context/messagescontext';
import type { User } from '../../../interface/Objects';
import ProtectedRoute from '../../../components/protectedroute';
import getCSRF from '../../../api/csrf';

export default function Profile() {
    const [user, setUser] = useState<User>({ name: '', email: '' });
    const [formData, setFormData] = useState<User | null>(null);
    const [isEditing, setEditing] = useState(false);
    const { isAuthenticated, setAuthenticated } = useAuthenticated();
    const { setMessagesList } = useMessages();
    const naviage = useNavigate();

    async function handleDelete(): Promise<void> {
        if (!confirm('Você tem certeza que deseja apagar sua conta?')) return;
        const csrf = await getCSRF();

        try {
            const response = await fetch('/api/user/delete', {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'X-CSRFToken': csrf },
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setAuthenticated(false);
            naviage('/');
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'ok', message: data.message }]);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro desconhecido';
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'ok', message: message }]);
        }
    }

    async function handleEditing(): Promise<void> {
        const isDiferent = !!(user.name != formData?.name || user.email != formData?.email);
        if (!isDiferent) {
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: 'Não há alterações' }]);
            return;
        }
        if (isDiferent && !confirm('Você deseja realizar essas mudanças?')) return;
        const csrf = await getCSRF();

        try {
            const response = await fetch('/api/user/edit', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrf,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setEditing(false);
            fetchUser();
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'ok', message: data.message }]);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro desconhecido';
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: message }]);
        }
    }

    function handleIsEditing(): void {
        const isDiferent = !!(user.name != formData?.name || user.email != formData?.email);
        if (isEditing && isDiferent && !confirm('Deseja descartar as mudanças?')) return;

        setEditing(!isEditing);
        setFormData({ ...user });
    }

    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch('/api/user/', { credentials: 'include' });
            const data = await response.json();
            if (response.status !== 200) throw new Error(data.message);

            setUser(data);
        } catch (err) {
            if (isAuthenticated) {
                const message = err instanceof Error ? err.message : 'Erro desconhecido';
                setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: message }]);
            }
        }
    }, [isAuthenticated, setMessagesList]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <ProtectedRoute isPrivate={true}>
            <article className='bg-color1-light shadow-basic flex w-sm flex-col gap-8 rounded-2xl p-8'>
                <div className='font-primary text-color1-normal bg-color2-normal mx-[30%] grid aspect-square w-4/10 place-items-center rounded-full text-6xl font-bold'>
                    {user.name[0]?.toUpperCase()}
                </div>
                <div>
                    <label htmlFor='name' className='font-secundary text-color-text-normal block text-lg'>
                        Nome
                    </label>
                    <input
                        type='text'
                        id='name'
                        className='text-md font-secundary bg-color1-dark aspect-20/3 w-full rounded-lg px-4 outline-0'
                        value={isEditing ? formData?.name : user.name}
                        onChange={e => setFormData({ ...user, name: e.target.value })}
                        readOnly={!isEditing}
                    />
                </div>
                <div>
                    <label htmlFor='email' className='font-secundary text-color-text-normal block text-lg'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        className='text-md font-secundary bg-color1-dark aspect-20/3 w-full rounded-lg px-4 outline-0'
                        value={isEditing ? formData?.email : user.email}
                        onChange={e => setFormData({ ...user, email: e.target.value })}
                        readOnly={!isEditing}
                    />
                </div>
                {isEditing ? (
                    <>
                        <button
                            className='font-secundary bg-color6-dark hover:shadow-color6 text-color1-normal aspect-20/3 cursor-pointer rounded-lg text-lg transition-all duration-125'
                            onClick={handleEditing}
                        >
                            Save
                        </button>
                        <button
                            className='font-secundary bg-color5-dark hover:shadow-color5 text-color1-normal aspect-20/3 cursor-pointer rounded-lg text-lg transition-all duration-125'
                            onClick={handleIsEditing}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className='font-secundary bg-color2-dark hover:shadow-color2 text-color1-normal aspect-20/3 cursor-pointer rounded-lg text-lg transition-all duration-125'
                            onClick={handleIsEditing}
                        >
                            Editar
                        </button>
                        <button
                            className='font-secundary bg-color5-dark hover:shadow-color5 text-color1-normal aspect-20/3 cursor-pointer rounded-lg text-lg transition-all duration-125'
                            onClick={handleDelete}
                        >
                            Excluir
                        </button>
                    </>
                )}
            </article>
        </ProtectedRoute>
    );
}
