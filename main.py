from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import requests
from dotenv import load_dotenv
import os

load_dotenv()
app=FastAPI()

app.add_middleware(
   CORSMiddleware,
   allow_origins=["*"],
   allow_credentials=[True],
   allow_methods=["*"]
)

@app.get('/quotes')
def get_quotes(category: str = 'dreams'):
    api_url = 'https://api.api-ninjas.com/v1/quotes?category={}'.format(category)
    response = requests.get(api_url, headers={'X-Api-Key': os.getenv("QUOTES_API_KEY")})
    if response.status_code == requests.codes.ok:
        return response.json()
    else:
        return {'error' : 'something went wrong'}

@app.get('/jokes')
def get_jokes():
    response = requests.get(os.getenv("CHRISTMAS_JOKE_API_URL"))
    if response.status_code == requests.codes.ok:
        return response.json()
    else:
         return {'error' : 'something went wrong'}