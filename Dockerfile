FROM python:3.10
# создание директории
RUN mkdir /fastapi_app
# перемещение в эту директорию
WORKDIR /fastapi_app
# скачиваем все зависимости через requirements.txt
COPY requirements.txt .

RUN pip install -r requirements.txt
# копирование всего остального
COPY . .

#WORKDIR src
#RUN chmod a+x docker_/*.sh

CMD gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000
