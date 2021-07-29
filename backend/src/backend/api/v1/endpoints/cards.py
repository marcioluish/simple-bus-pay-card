import json

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from backend.database.schema import CreateCard
from backend.database.database import get_db
from backend.database.model import Card

router = APIRouter()


@router.post("/")
def create(details: CreateCard, db: Session = Depends(get_db)) -> HTMLResponse:
    new_card = Card(
        value=details.value
    )

    try:
        db.add(new_card)
        db.commit()
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not add new card",
        )

    return HTMLResponse(content='Added new card {}'.format(new_card.value), status_code=201)


@router.get("/")
def retrieve(db: Session = Depends(get_db)) -> HTMLResponse:
    cards_list = []
    try:
        cards = db.query(Card).all()
        for card in cards:
            cards_list.append(row2dict(card))
        print('$$$$$$ list: {}'.format(cards_list))
        db.commit()
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Could not retrieve from cards table',
        )

    return HTMLResponse(content=json.dumps(cards_list), status_code=201)


def row2dict(card):
    d = {}
    for column in card.__table__.columns:
        d[column.name] = str(getattr(card, column.name))
    return d
