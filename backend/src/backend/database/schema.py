from pydantic import BaseModel


class CreateCard(BaseModel):
    value: str

class UpdateCard(BaseModel):
    id: int
    value: str
