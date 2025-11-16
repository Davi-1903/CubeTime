from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from flask import Blueprint, jsonify, request
from flask_login import login_required, login_user, logout_user
from database import Session
from models.user import User


auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
ph = PasswordHasher()


@auth_bp.route('/register', methods=['POST'])
def register():
    with Session() as session:
        try:
            data = request.get_json(silent=True)
            if data is None:
                return jsonify({'ok': False, 'message': 'As informações não foram recebidas'}), 401
            
            user = session.query(User).filter_by(email=data['email']).first()
            if user:
                return jsonify({'ok': False, 'message': 'Este email já está cadastrado'}), 401
            
            new_user = User(name=data['name'], email=data['email'], password=ph.hash(data['password']))
            session.add(new_user)
            session.commit()
            login_user(new_user)
            return jsonify({'ok': True, 'message': 'Usuário cadastrado com sucesso'}), 200
        
        except:
            session.rollback()
            return jsonify({'ok': False, 'message': 'Ocorreu um erro interno'}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    with Session() as session:
        try:
            data = request.get_json(silent=True)
            if data is None:
                return jsonify({'ok': False, 'message': 'As informações não forma recebidas'}), 401
            
            user = session.query(User).filter_by(email=data['email']).first()
            if user is None:
                return jsonify({'ok': False, 'message': 'Este email não está cadastrado'}), 401
            
            # Verifica a senha. Caso haja um erro, será lançado um erro (VerifyMismatchError)
            ph.verify(user.password, data['password']) # type: ignore

            login_user(user)
            return jsonify({'ok': True, 'message': 'Usuário autenticado com sucesso'}), 200
        except VerifyMismatchError:
            return jsonify({'ok': False, 'message': 'Senha incorreta'}), 401
        
        except:
            return jsonify({'ok': False, 'message': 'Ocorreu um erro interno'}), 500


@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'ok': True, 'message': 'O usuário saiu do sistema'}), 200


@auth_bp.route('/check')
@login_required
def check_auth():
    return jsonify({'ok': True}), 200
