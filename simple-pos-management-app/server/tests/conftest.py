import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.models import Base


@pytest.fixture(scope="session")
def engine():
    return create_engine("sqlite:///./test.db")


@pytest.fixture(scope="function")
def db_session(engine):
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.close()
    Base.metadata.drop_all(engine)
