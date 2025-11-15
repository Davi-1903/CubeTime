import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import './Profile.css';

export default function Profile() {
    const user = {
        name: 'Fulano',
        email: 'fulano@fulano.com',
    };

    return (
        <PrivateRoute>
            <div className='profile-container'>
                <article>
                    <div className='foto-perfil'>{user.name[0].toUpperCase()}</div>
                    <div className='input-label'>
                        <label htmlFor='name'>Nome</label>
                        <input type='text' id='name' value={user.name} readOnly />
                    </div>
                    <div className='input-label'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' value={user.email} readOnly />
                    </div>
                    <button id='sair'>Sair</button>
                    <button id='editar'>Editar</button>
                    <button id='excluir'>Excluir</button>
                </article>
            </div>
        </PrivateRoute>
    );
}
