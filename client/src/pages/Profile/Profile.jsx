import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticated } from '../../context/AuthContext';
import { useMessages } from '../../context/MessagesContext';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import './Profile.css';

export default function Profile() {
    const [user, setUser] = useState({ name: '', email: '' });
    const [formData, setFormData] = useState(null);
    const [isEditing, setEditing] = useState(false);
    const { setAuthenticated } = useAuthenticated();
    const { setMessagesList } = useMessages();
    const naviage = useNavigate();

    async function handleDelete() {
        if (!confirm('Você tem certeza que deseja apagar sua conta?')) return;

        try {
            const response = await fetch('/api/user/delete', { method: 'DELETE', credentials: 'include' });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setAuthenticated(false);
            naviage('/');
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'ok', message: data.message }]);
        } catch (err) {
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'ok', message: err.message }]);
        }
    }

    async function handleEditing() {
        const isDiferent = !!(user.name != formData?.name || user.email != formData?.email);
        if (!isDiferent) {
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: 'Não há alterações' }]);
            return;
        }
        if (isDiferent && !confirm('Você deseja realizar essas mudanças?')) return;

        try {
            const response = await fetch('/api/user/edit', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setEditing(false);
            fetchUser();
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: data.message }]);
        } catch (err) {
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: err.message }]);
        }
    }

    function handleIsEditing() {
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
            setMessagesList(prev => [...prev, { id: prev.length + 1, type: 'danger', message: err.message }]);
        }
    }, [setMessagesList]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <PrivateRoute>
            <div className='profile-container'>
                <article>
                    <div className='foto-perfil'>{user.name[0]?.toUpperCase()}</div>
                    <div className='input-label'>
                        <label htmlFor='name'>Nome</label>
                        <input
                            type='text'
                            id='name'
                            value={isEditing ? formData.name : user.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className='input-label'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            value={isEditing ? formData.email : user.email}
                            onChange={e => setFormData({ ...user, email: e.target.value })}
                            readOnly={!isEditing}
                        />
                    </div>
                    {isEditing ? (
                        <>
                            <button id='save' onClick={handleEditing}>
                                Save
                            </button>
                            <button id='cancel' onClick={handleIsEditing}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button id='editar' onClick={handleIsEditing}>
                                Editar
                            </button>
                            <button id='excluir' onClick={handleDelete}>
                                Excluir
                            </button>
                        </>
                    )}
                </article>
            </div>
        </PrivateRoute>
    );
}
