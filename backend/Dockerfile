FROM python:3.7-slim

SHELL [ "/bin/bash", "-c" ]

RUN apt-get update && apt-get install -y python3-dev \
  && mkdir -p /backend

ENV ROOT=/backend/

COPY ./ $ROOT

WORKDIR $ROOT

RUN pip install dist/backend-0.1.0.tar.gz

EXPOSE 8000

CMD ["python", "main.py"]