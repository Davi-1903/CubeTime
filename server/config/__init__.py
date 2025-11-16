import os
from dotenv import load_dotenv
from flask_cors import CORS
from flask_login import LoginManager
from database import init_database
from models.user import User


def config_app(app):
    load_dotenv()
    CORS(app, supports_credentials=True, origins=['http://localhost:5000'])

    login_config(app)
    init_database()


def login_config(app):
    SECRET_KEY = os.environ.get('SECRET_KEY')
    if SECRET_KEY is None:
        raise RuntimeError('SECRET_KEY não foi definida')
    
    app.secret_key = SECRET_KEY

    login_manager = LoginManager(app)

    @login_manager.user_loader
    def load_user(user_id: int):
        return User.get(user_id)
