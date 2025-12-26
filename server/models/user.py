from flask_login import UserMixin
from database import db


class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False)
    best_time = db.Column(db.Integer) # Tempo em milisegundos

    @classmethod
    def get(cls, user_id: int) -> 'User | None':
        return db.session.get(cls, user_id)
