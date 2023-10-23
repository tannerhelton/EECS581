import os
import openai

from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def get_basic_info(name, sex, weight, height, age, activity_level, medical_diagnosis):
    message = f"My name is {name}. I am a {sex} I weigh {weight} pounds and I am {height} inches tall. I am {age} years old and my activity level is {activity_level}. I have been diagnosed with {medical_diagnosis}. Can you provide me with some basic information?"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        max_tokens=100,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message},
        ]
    )
    return response['choices'][0]['message']['content']

name = "John"
sex = "male"
weight = 180
height = 72
age = 35
activity_level = "moderate"
medical_diagnosis = "diabetes"

basic_info = get_basic_info(name, sex, weight, height, age, activity_level, medical_diagnosis)

print(basic_info)
