import shutil  # Import the shutil module
import numpy as np
from flask_cors import CORS
from flask import Flask, jsonify, send_file
import matplotlib.pyplot as plt
import io
import os
import matplotlib
import base64
from contextlib import redirect_stdout
import CVD_kNN


matplotlib.use('agg')  # Use the 'agg' backend (a non-interactive backend)

app = Flask(__name__)
CORS(app)  # Apply CORS to the app

# where we want to create matplotlib pngs


# Plotting count distributions
# plot_count_distribution(df, "Sex")
# plot_count_distribution(df, "Smoking")
# plot_count_distribution(df, 'Race')
# plot_count_distribution(df, 'AgeCategory')
# plot_count_distribution(df, "KidneyDisease")

# Plotting feature distributions
# plot_feature_distribution(df, 'BMI', user_data['BMI'], 'red', 'User BMI')
# plot_feature_distribution(df, 'SleepTime', user_data['SleepTime'], 'blue', 'User SleepTime')
# plot_feature_distribution(df, 'PhysicalHealth', user_data['PhysicalHealth'], 'green', 'User PhysicalHealth')
# plot_feature_distribution(df, 'MentalHealth', user_data['MentalHealth'], 'purple', 'User MentalHealth')


def text_results():
    text_output = io.StringIO()
    with redirect_stdout(text_output):
        CVD_kNN.main()

    # Get the captured text output as a string
    text_result = text_output.getvalue()

    return text_result


def generate_plots():
    plots = CVD_kNN.main()

    return plots

# Routes for retrieving data


@app.route('/api/main', methods=['GET'])
def main_route():
    result = CVD_kNN.main()  # Call your main function
    return jsonify({
        'probability': result[0],
        'plots': result[1:]
    })

# Routes for retrieving data

@app.route('/api/text-results', methods=['GET'])
def display_text_results():
    text_result = text_results()
    return text_result


@app.route('/api/generate-plot', methods=['GET'])
def generate_and_return_plot():
    data_urls = generate_plots()
    return jsonify(data_urls)


if __name__ == '__main__':
    app.run(debug=True)
