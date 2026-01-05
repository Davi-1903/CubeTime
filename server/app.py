from flask import Flask
from controllers.auth import auth_bp
from controllers.user import user_bp
from controllers.time import time_bp
from config import config_app


app = Flask(__name__)
config_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(time_bp)
