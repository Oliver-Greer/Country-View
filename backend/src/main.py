from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    x = 2
    return {"app": "online"}
