import shutil  # Import the shutil module
import numpy as np
from flask_cors import CORS
from flask import Flask, jsonify, send_file
import matplotlib.pyplot as plt
import io
import os
import matplotlib
import base64
import "CVD_kNN"

matplotlib.use('agg')  # Use the 'agg' backend (a non-interactive backend)

app = Flask(__name__)
CORS(app)  # Apply CORS to the app

# where we want to create matplotlib pngs


def text_results():
    return "This is some text from the text_results function."


def generate_plot():
    x = np.linspace(0, 10, 100)
    y = np.sin(x)

    plt.figure(figsize=(6, 4))
    plt.plot(x, y)
    plt.title("Simple Sine Wave Plot")
    plt.xlabel("X-axis")
    plt.ylabel("Y-axis")

    # Save the plot to a BytesIO object as a PNG
    image_bytes_io = io.BytesIO()
    plt.savefig(image_bytes_io, format='png')
    plt.close()

    # Encode the image as a base64 data URL
    image_data = base64.b64encode(image_bytes_io.getvalue()).decode('utf-8')
    data_url = f'data:image/png;base64,{image_data}'

    return data_url

# Routes for retrieving data


@app.route('/api/text-results', methods=['GET'])
def display_text_results():
    text_result = text_results()
    return text_result


@app.route('/api/generate-plot', methods=['GET'])
def generate_and_return_plot():
    data_url = generate_plot()
    return data_url


if __name__ == '__main__':
    app.run(debug=True)
