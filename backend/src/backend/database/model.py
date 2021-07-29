from sqlalchemy import Column, Integer, String
from .database import Base


class Card(Base):
    __tablename__ = 'cards'

    id = Column(Integer, primary_key=True)
    value = Column(String, primary_key=False)
