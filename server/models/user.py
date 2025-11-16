from flask_login import UserMixin
from sqlalchemy import Column, Integer, String
from database import Base, Session



class User(UserMixin, Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(150), nullable=False)

    @classmethod
    def get(cls, user_id: int) -> 'User | None':
        with Session() as session:
            return session.get(cls, user_id)
