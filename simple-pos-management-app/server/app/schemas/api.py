from pydantic import BaseModel
from typing import Generic, List, TypeVar

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total_pages: int
    total: int
