import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase


DATABASE_URI = os.environ.get('DATABASE_URI')
if DATABASE_URI is None:
    raise RuntimeError('DATABASE_URI não foi definida')

engine = create_engine(DATABASE_URI)
Session = sessionmaker(autoflush=False, autocommit=False, bind=engine)


class Base(DeclarativeBase):
    pass


def init_database():
    Base.metadata.create_all(engine)
