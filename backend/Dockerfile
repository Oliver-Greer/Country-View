FROM python:3.14-slim

WORKDIR /

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["uvicorn", "main:src", "--host", "0.0.0.0", "--port", "8080"]
