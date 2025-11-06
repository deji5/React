from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from pymysql.constants import CLIENT
from dotenv import load_dotenv
import os

load_dotenv()

db_url = f'mysql+pymysql://{os.getenv("dbuser")}:{os.getenv("dbpassword")}@{os.getenv("dbhost")}:{os.getenv("dbport")}/{os.getenv("dbname")}'

engine = create_engine(
    db_url,
    connect_args={"client_flag": CLIENT.MULTI_STATEMENTS}
)
session = sessionmaker(bind=engine)

db = session()

create_tables = text("""
CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR (100) NOT NULL                 
    );
CREATE TABLE IF NOT EXISTS Tracker(
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR (500) NOT NULL,
    amount INT NOT NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id)                
    )
""")

db.execute(create_tables)

print("Table successful")