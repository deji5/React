import jwt
from dotenv import load_dotenv
import os 
from fastapi import Request
from datetime import datetime, timedelta
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials
from fastapi import Security

bearer = HTTPBearer()

load_dotenv()

secret_key = os.getenv("secret_key")

def create_token(details: dict, expiry: int):

    expire = datetime.now() + timedelta(minutes=expiry)

    details.update({"exp": expire})

    encoded_jwt = jwt.encode(details, secret_key)
    return encoded_jwt

def verify_token(request: HTTPAuthorizationCredentials = Security(bearer)):
    token = request.credentials

    verify_token = jwt.decode(token, secret_key, algorithms=["HS256"])

    expiry_time = verify_token.get("exp")

    return {
        "email": verify_token.get("email"),
        "userType": verify_token.get("userType")
    }