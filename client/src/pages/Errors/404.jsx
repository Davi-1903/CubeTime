import { Link } from 'react-router-dom';
import './Error404.css';

export default function Error404() {
    return (
        <div className='error-container'>
            <h1>404 | Página não encontrada :{'('}</h1>
            <Link to='/'>
                <button>Inicio</button>
            </Link>
        </div>
    );
}
