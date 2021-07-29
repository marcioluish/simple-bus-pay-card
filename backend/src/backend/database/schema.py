from pydantic import BaseModel


class CreateCard(BaseModel):
    value: str
