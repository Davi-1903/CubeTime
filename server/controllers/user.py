from database import db
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required, logout_user
from models.user import User


user_bp = Blueprint('user', __name__, url_prefix='/api/user')


@user_bp.get('/')
@login_required
def fecht_user():
    return jsonify({
        'name': current_user.name,
        'email': current_user.email
    })


@user_bp.delete('/delete')
@login_required
def delete_user():
    try:
        db.session.delete(current_user)
        db.session.commit()
        logout_user()
        return jsonify({'ok': True, 'message': 'Usuário deletado com sucesso'}), 200
    
    except:
        db.session.rollback()
        return jsonify({'ok': False, 'message': 'Ocorreu um erro interno'}), 500


@user_bp.patch('/edit')
@login_required
def edit_user():
    try:
        data = request.get_json(silent=True)
        if data is None:
            return jsonify({'ok': False, 'message': 'As informação não foram recebidas'}), 401

        user = db.session.get(User, current_user.id)
        user.name = data['name'] # type: ignore
        user.email = data['email'] # type: ignore
        db.session.commit()
        return jsonify({'ok': True, 'message': 'Informações alteradas com sucesso'}), 200
    
    except:
        db.session.rollback()
        return jsonify({'ok': False, 'message': 'Ocorreu um erro interno'}), 500
