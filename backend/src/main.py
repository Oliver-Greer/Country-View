import os

import requests
from fastapi import FastAPI, HTTPException
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    congress_api_key: str | None = os.getenv("CONGRESS_API_KEY")


settings = Settings()
app = FastAPI()


@app.get("/")
async def read_root():
    return {"app": "online"}


@app.get("/api/members")
async def get_members(state: str):

    congress_member_endpoint = f"https://api.congress.gov/v3/member/{state}"

    response = requests.get(
        congress_member_endpoint,
        params={
            "api_key": settings.congress_api_key,
            "format": "json",
            "currentMember": True,
            "limit": 250,
        },
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        },
    )

    if not response:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    response_json = response.json()
    all_member_data = []
    for member in response_json["members"]:
        member_info = {
            "name": member["name"],
            "party": member["partyName"],
            "chamber": member["terms"]["item"][-1]["chamber"],
        }
        if member.get("district"):
            member_info["district"] = member["district"]
        all_member_data.append(member_info)

    structured_response = {
        "members": all_member_data,
    }

    return structured_response
