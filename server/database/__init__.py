import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def init_database(app: Flask):
    DATABASE_URI = os.environ.get('DATABASE_URI')
    if DATABASE_URI is None or DATABASE_URI == '':
        raise RuntimeError('DATABASE_URI não foi definida')

    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        db.create_all()
