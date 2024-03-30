# Import required libraries
import shutil
import numpy as np
from flask_cors import CORS
from flask import Flask, jsonify, send_file, request
import matplotlib.pyplot as plt
import io
import os
import matplotlib
import base64
from contextlib import redirect_stdout
import CVD_kNN
from werkzeug.utils import secure_filename
import SkinTumor_SVM

# Set matplotlib to use 'agg' backend, which is non-interactive and suitable for server environments
matplotlib.use('agg')

# Initialize a Flask app
app = Flask(__name__)
# Apply Cross-Origin Resource Sharing (CORS) to the Flask app to allow cross-origin requests
CORS(app)

# Function to capture and return text results from the CVD_kNN module
def text_results():
    text_output = io.StringIO()
    with redirect_stdout(text_output):
        CVD_kNN.main()  # Run the main function of CVD_kNN and capture its printed output

    # Get the captured text output as a string and return it
    text_result = text_output.getvalue()
    return text_result

# Function to generate plots using the CVD_kNN module and return them
def generate_plots():
    plots = CVD_kNN.main()  # Run the main function of CVD_kNN to get plots
    return plots

# Flask route for the main functionality, returning JSON data including probability and plots
@app.route('/api/main', methods=['GET'])
def main_route():
    result = CVD_kNN.main()  # Call the main function from the CVD_kNN module
    return jsonify({
        'probability': result[0],  # Probability result from CVD_kNN
        'plots': result[1:]  # Plot data from CVD_kNN
    })

# Flask route for retrieving text results
@app.route('/api/text-results', methods=['GET'])
def display_text_results():
    text_result = text_results()  # Get text results
    return text_result  # Return the text results as a response

# Flask route for generating and returning plot data
@app.route('/api/generate-plot', methods=['GET'])
def generate_and_return_plot():
    data_urls = generate_plots()  # Generate plots
    return jsonify(data_urls)  # Return plot data as JSON

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get the JSON data
    file_identifier = data.get('fileIdentifier')
    
    if not file_identifier:
        return jsonify({'error': 'No file identifier provided'}), 400

    # Logic to locate your file based on `file_identifier` and process it
    # For example:
    file_path = os.path.join('uploads', file_identifier)
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404

    prediction = SkinTumor_SVM.testGrouped(file_path)
    os.remove(file_path)  # Clean up after prediction
    
    result_text = "Malignant" if prediction[0] == 1 else "Benign"
    return jsonify({'prediction': result_text})

# Run the Flask app in debug mode if this script is the main program
if __name__ == '__main__':
    app.run(debug=True)
