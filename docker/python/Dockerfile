FROM python:latest
WORKDIR /var/www
COPY . .
RUN pip3 install -r requirements.txt
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000"]