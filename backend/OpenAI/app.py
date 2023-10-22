import os
import openai

from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def get_basic_info(name, weight, height, age, activity_level, medical_diagnosis):
    message = f"My name is {name}. I weigh {weight} pounds and I am {height} inches tall. I am {age} years old and my activity level is {activity_level}. I have been diagnosed with {medical_diagnosis}. Can you provide me with some basic information?"
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=message,
        temperature=0.8,
        max_tokens=1024
    )
    return response.choices[0].text.strip()

name = "John"
weight = 180
height = 72
age = 35
activity_level = "moderate"
medical_diagnosis = "diabetes"

basic_info = get_basic_info(name, weight, height, age, activity_level, medical_diagnosis)

print(basic_info)
