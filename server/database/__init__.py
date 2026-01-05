import os
from time import sleep
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from sqlalchemy.exc import OperationalError


def check_connection(db: SQLAlchemy):
    for _ in range(10):
        try:
            with db.engine.connect() as connection:
                connection.execute(text('SELECT 1'))
            return
        except OperationalError:
            sleep(3)
    raise RuntimeError('Não foi possível estabelecer uma conexão com o banco de dados')


db = SQLAlchemy()


def init_database(app: Flask):
    DATABASE_URI = os.environ.get('DATABASE_URI')
    if DATABASE_URI is None or DATABASE_URI == '':
        raise RuntimeError('DATABASE_URI não foi definida')

    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        check_connection(db)
        db.create_all()
