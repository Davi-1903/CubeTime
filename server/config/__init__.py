import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_login import LoginManager
from flask_wtf import CSRFProtect
from database import init_database
from models.user import User


def config_app(app: Flask):
    load_dotenv()

    SECRET_KEY = os.environ.get('SECRET_KEY')
    if SECRET_KEY is None or SECRET_KEY == '':
        raise RuntimeError('A variável de ambiante SECRET_KEY não foi definida')

    app.config.update(
        SECRET_KEY=SECRET_KEY,
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SECURE=False,
        SESSION_COOKIE_SAMESITE='Lax'
    )
    CORS(app, supports_credentials=True, origins=['http://localhost:5000'])
    csrf = CSRFProtect(app)

    login_config(app)
    init_database(app)


def login_config(app: Flask):
    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id: int):
        return User.get(user_id)
    
    @login_manager.unauthorized_handler
    def unauthorized():
        return jsonify({'ok': False, 'message': 'Permissão negada'}), 401
