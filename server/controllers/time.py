from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from database import Session
from models.user import User
from math import floor



time_bp = Blueprint('time', __name__, url_prefix='/api/time')


def format_time(time: int) -> str:
    hours = floor((time / 3600000) % 60)
    minutes = floor((time / 600000) % 60)
    secunds = floor((time / 1000) % 60)
    millisecunds = floor(time % 1000)
    if hours:
        return f'{hours}h {minutes}min {secunds}s {millisecunds}ms'
    if minutes:
        return f'{minutes}min {secunds}s {millisecunds}ms'
    if secunds:
        return f'{secunds}s {millisecunds}ms'
    return f'{millisecunds}ms'


@time_bp.get('/')
@login_required
def get_time():
    return jsonify({'ok': True, 'time': current_user.best_time}), 200


@time_bp.post('/new')
@login_required
def new_time():
    with Session() as session:
        try:
            data = request.get_json(silent=True)
            if data is None:
                return jsonify({'ok': False, 'message': 'As informações não foram recebidas'}), 401
            
            user = session.get(User, current_user.id)
            user.best_time = data['time'] # type: ignore
            session.commit()
            return jsonify({'ok': True, 'message': f'Novo tempo registrado: {format_time(data["time"])}'}), 200
    
        except:
            session.rollback()
            return jsonify({'ok': False, 'message': 'Ocorreu um erro interno'}), 500