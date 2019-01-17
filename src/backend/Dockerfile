FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /code
COPY . /code

WORKDIR /code

RUN pip install pipenv
RUN pipenv install -r requirements.txt
