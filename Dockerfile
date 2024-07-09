FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    wget \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /crewai

COPY requirements.txt /crewai/

RUN pip install --upgrade pip setuptools

RUN pip install -r requirements.txt

COPY . /crewai/

EXPOSE 5000

CMD ["python", "crewai/index.py"]