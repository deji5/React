from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import uvicorn
import os
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware
from database import db
import bcrypt
from middleware import create_token, verify_token

load_dotenv()

app = FastAPI(title="Tracker", version="1.0.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

token_time = int(os.getenv('token_time'))

@app.get('/')
def welcome():
    return{
        'Message': "Welcome to trackerapp"
    }

class Simple(BaseModel):
    name: str = Field(..., example="Adedeji")
    email: str = Field(..., example="deji@gmail.com")
    password: str = Field(..., example="deji123")

@app.post('/SignUp')
def SignUp(input: Simple):
    try:
        duplicate_query = text("""
            SELECT * FROM users
            WHERE email = :email
        """)
        existing = db.execute(duplicate_query, {"email": input.email})
        if existing:
            print("Email exist try again")

        query = text(""" 
        INSERT INTO users (name , email, password)
        VALUES(:name, :email, :password)
        """)
        
        salt = bcrypt.gensalt()
        hashedPassword = bcrypt.hashpw(input.password.encode('utf-8'), salt)
        print(hashedPassword)

        db.execute(query, {"name": input.name, "email": input.email, "password": hashedPassword})
        db.commit()

        return {"message": "User created Successfully",
                "data": {"name": input.name, "email": input.email,}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
    
class LoginRequest(BaseModel):
    email : str = Field(..., example="deji@gmail.com")
    password : str = Field(..., example="deji123")

@app.post("/Login")
def log_in(input: LoginRequest):
    try:
        query = text("""
        SELECT * FROM users WHERE email = :email
        """)
        result = db.execute(query, {"email": input.email}).fetchone()

        verified_password = bcrypt.checkpw(input.password.encode('utf-8'), result.password.encode('utf-8'))

        if not verified_password:
            raise HTTPException(status_code=404, detail="Invalid email or password")

        if not result: 
            raise HTTPException(status_code=401, detail="invalid email or passworrd")
        
        encoded_token = create_token(details={
            "email": result.email,
            "userId": result.id
        }, expiry=token_time)

        return {
            "message": "Login Successful",
            "token" : encoded_token
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/Display_Expense")
def display():
    try:
        query = text("""
            SELECT * FROM expense
        """)
        db.execute(query)
        db.commit()
        return({
            "message": "Successfully fetched",
        })
    except Exception as e:
        raise HTTPException(status_code=501, detail=str(e))
class add(BaseModel):
    description: str=Field(..., example="Lunch")
    amount: int=Field(..., example=2000)
    
@app.post("/Add to Expense")
def to_add(input:add, user_data= Depends(verify_token)):
    try:
        query = text("""
            INSERT INTO expense(userId, description, amount)
            VALUES(:userId, :description, :amount)
        """)
        db.execute(query, {"userId": user_data["userId"], "description": input.description, "amount": input.amount})
        db.commit()
        return({
            "message": "Successfully added an expense",
            "data": {"userId": user_data["userId"], "description": input.description, "amount": input.amount}
        })
    except Exception as e:
        raise HTTPException(status_code=501, detail=str(e))

    
if __name__=="__main__":
    uvicorn.run(app, host=os.getenv("host"), port=int(os.getenv("port")))