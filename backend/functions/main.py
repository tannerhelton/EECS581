# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app

initialize_app()


import os
import openai
from dotenv import load_dotenv

def initialize_api_key():
    load_dotenv()
    openai.api_key = os.getenv("OPENAI_API_KEY")
    if not openai.api_key:
        raise ValueError("OPENAI_API_KEY not found in environment!")

def get_basic_info(name, sex, weight, height, age, activity_level, medical_diagnosis):
    message = (
        f"My name is {name}. I am a {sex.capitalize()}. I weigh {weight} pounds and "
        f"I am {height} inches tall. I am {age} years old and my activity level is "
        f"{activity_level}. I have been diagnosed with {medical_diagnosis.capitalize()}. "
        "Can you provide me with some basic information?"
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            max_tokens=100,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message},
            ]
        )
        return response['choices'][0]['message']['content']
    except openai.error.OpenAIError as error:
        return f"Error: {error}"

def main():
    name = "John"
    sex = "male"
    weight = 180
    height = 72
    age = 35
    activity_level = "moderate"
    medical_diagnosis = "diabetes"
    
    basic_info = get_basic_info(name, sex, weight, height, age, activity_level, medical_diagnosis)
    return basic_info

@https_fn.on_request()
def chat_request(req: https_fn.Request) -> https_fn.Response:
    initialize_api_key()
    info = main()
    return https_fn.Response(info)