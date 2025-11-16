import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticated } from '../../context/AuthContext';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import './Profile.css';

export default function Profile() {
    const [user, setUser] = useState({ name: '', email: '' });
    const [formData, setFormData] = useState(null);
    const [isEditing, setEditing] = useState(false);
    const { setAuthenticated } = useAuthenticated();
    const naviage = useNavigate();

    async function handleLogout() {
        if (!confirm('Você realmente deseja sair?')) return;

        try {
            const response = await fetch('/api/auth/logout', { credentials: 'include' });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setAuthenticated(false);
            naviage('/');
        } catch (err) {
            alert(`Ocorreu um erro. ${err}`);
        }
    }

    async function handleDelete() {
        if (!confirm('Você tem certeza que deseja apagar sua conta?')) return;

        try {
            const response = await fetch('/api/user/delete', { method: 'DELETE', credentials: 'include' });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setAuthenticated(false);
            naviage('/');
            alert(data.message);
        } catch (err) {
            alert(`Ocorreu um erro. ${err}`);
        }
    }

    async function handleEditing() {
        try {
            const response = await fetch('/api/user/edit', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.message);

            setEditing(false);
            fecthUser();
            alert(data.message);
        } catch (err) {
            alert(`Ocorreu um erro. ${err}`);
        }
    }

    function handleIsEditing() {
        setEditing(!isEditing);
        setFormData({ ...user });
    }

    async function fecthUser() {
        try {
            const response = await fetch('/api/user/', { credentials: 'include' });
            const data = await response.json();
            if (response.status !== 200) throw new Error(data.message);

            console.log(data);
            setUser(data);
        } catch (err) {
            alert(`Ocorreu um erro. ${err}`);
        }
    }

    useEffect(() => {
        fecthUser();
    }, []);

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
                            <button id='sair' onClick={handleLogout}>
                                Sair
                            </button>
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
