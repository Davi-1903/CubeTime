import os
from flask import Flask
from controllers.auth import auth_bp
from controllers.user import user_bp
from controllers.time import time_bp
from config import config_app


app = Flask(__name__, static_folder='../client/dist')
config_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(time_bp)

# Rota "Catch-All"
@app.route('/')
@app.route('/<path:path>')
def serve_react(path: str = ''):
    if app.static_folder is None:
        raise RuntimeError('STATIC_FOLDER não foi definido')
    if path and not path.startswith('/api') and os.path.exists(os.path.join(app.static_folder, path)):
        return app.send_static_file(path)
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
