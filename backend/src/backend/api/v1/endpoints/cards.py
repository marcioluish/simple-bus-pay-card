import json

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import HTMLResponse, JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import update
from backend.database.schema import CreateCard, UpdateCard
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


@router.put("/")
def create(details: UpdateCard, db: Session = Depends(get_db)) -> HTMLResponse:
    card_query = db.query(Card).filter(Card.id == details.id).first()
    card = row2dict(card_query)
    float_value = float(card['value'])
    change_value = float(details.value)
    new_value = str(float_value + change_value)

    try:
        db.execute(update(Card).where(
            Card.id == details.id).values(value=new_value))
        db.commit()
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not update card value",
        )

    return HTMLResponse(content='Udapted card value to: {}'.format(new_value), status_code=201)


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

    return JSONResponse(content=cards_list)


def row2dict(card):
    d = {}
    for column in card.__table__.columns:
        d[column.name] = str(getattr(card, column.name))
    return d
