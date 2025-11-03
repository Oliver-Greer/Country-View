import json
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


@app.get("/members/")
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
        "status_code": response.status_code,
        "members": all_member_data,
        "number_of_reps": len(all_member_data),
    }

    return structured_response
