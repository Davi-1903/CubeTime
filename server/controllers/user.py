from flask import Blueprint, jsonify
from flask_login import current_user, login_required, logout_user
from database import Session


user_bp = Blueprint('user', __name__, url_prefix='/api/user')


@user_bp.route('/')
@login_required
def fecht_user():
    return jsonify({
        'name': current_user.name,
        'email': current_user.email
    })


@user_bp.route('/delete')
@login_required
def delete_user():
    with Session() as session:
        try:
            session.delete(current_user)
            session.commit()
            logout_user()
            return jsonify({'ok': True, 'message': 'Usuário deletado com sucesso'}), 200
        except:
            session.rollback()
            return jsonify({'ok': False, 'message': 'Ocorreu um erro interno'}), 500
