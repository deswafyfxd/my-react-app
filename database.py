import os
from pymongo import MongoClient

def get_db_connection():
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client['outlook_management']
    return db

def add_account(outlook_account, recovery_email):
    db = get_db_connection()
    db.accounts.insert_one({
        "outlook_account": outlook_account,
        "recovery_email": recovery_email
    })

def get_account(outlook_account):
    db = get_db_connection()
    return db.accounts.find_one({"outlook_account": outlook_account})
