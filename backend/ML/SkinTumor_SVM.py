'''
This script is a part of the Skin Tumor Classification project. 
It contains the main functions for loading, processing, and training the model on the skin tumor dataset. 
The script also includes functions for generating saliency maps and testing the model on new images. 
The main function executes the sequence of operations, including data loading, processing, model training, and testing. 
The script can be run to train the model and test it on new images.

Created by: Chris Stillman

'''

#IMPORTS
from mpl_toolkits.mplot3d import Axes3D
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import cross_val_score
from sklearn.svm import SVC
from keras.applications.vgg16 import VGG16, preprocess_input
from keras.models import Model
import tensorflow as tf
import os
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import io
import base64
from glob import glob
import seaborn as sns
from PIL import Image
import joblib
import requests

global_pca = None
global_svm_model = None
    
### Description: This function loads and preprocesses image data from specified directories.
### Parameters: benign_train, malignant_train, benign_test, malignant_test - Paths to the image directories.
### Returns: Arrays of training and test data along with their labels.
def loadingData(benign_train, malignant_train, benign_test, malignant_test):
    #LOADING DATA
    folder_benign_train = benign_train
    folder_malignant_train = malignant_train
    folder_benign_test = benign_test
    folder_malignant_test = malignant_test

    # Function to load images
    read = lambda imname: np.asarray(Image.open(imname).convert("RGB"))
    
    # Load in training pictures 
    ims_benign = [read(os.path.join(folder_benign_train, filename)) for filename in os.listdir(folder_benign_train)]
    X_benign = np.array(ims_benign, dtype='uint8')
    ims_malignant = [read(os.path.join(folder_malignant_train, filename)) for filename in os.listdir(folder_malignant_train)]
    X_malignant = np.array(ims_malignant, dtype='uint8')
    
    # Load in testing pictures
    ims_benign = [read(os.path.join(folder_benign_test, filename)) for filename in os.listdir(folder_benign_test)]
    X_benign_test = np.array(ims_benign, dtype='uint8')
    ims_malignant = [read(os.path.join(folder_malignant_test, filename)) for filename in os.listdir(folder_malignant_test)]
    X_malignant_test = np.array(ims_malignant, dtype='uint8')
    
    # Create labels
    y_benign = np.zeros(X_benign.shape[0])
    y_malignant = np.ones(X_malignant.shape[0])
    
    y_benign_test = np.zeros(X_benign_test.shape[0])
    y_malignant_test = np.ones(X_malignant_test.shape[0])
    
    # Merge data 
    X_train = np.concatenate((X_benign, X_malignant), axis = 0)
    y_train = np.concatenate((y_benign, y_malignant), axis = 0)
    
    X_test = np.concatenate((X_benign_test, X_malignant_test), axis = 0)
    y_test = np.concatenate((y_benign_test, y_malignant_test), axis = 0)
    
    # Shuffle data
    s = np.arange(X_train.shape[0])
    np.random.shuffle(s)
    X_train = X_train[s]
    y_train = y_train[s]
    
    s = np.arange(X_test.shape[0])
    np.random.shuffle(s)
    X_test = X_test[s]
    y_test = y_test[s]

    return X_train, y_train, X_test, y_test

### Description: Displays the first 15 images from the training set along with their classifications.
### Parameters: X_train - Array of training images, y_train - Array of training labels.
def testDisplay(X_train, y_train):
    # Display first 15 images of moles, and how they are classified
    w=40
    h=30
    fig=plt.figure(figsize=(12, 8))
    columns = 5
    rows = 3
    
    for i in range(1, columns*rows +1):
        ax = fig.add_subplot(rows, columns, i)
        if y_train[i] == 0:
            ax.title.set_text('Benign')
        else:
            ax.title.set_text('Malignant')
        plt.imshow(X_train[i], interpolation='nearest')
    plt.show()

### Description: Displays bar graphs showing the number of benign and malignant moles in the training and test datasets.
### Parameters: X_train, y_train - Training images and labels; X_test, y_test - Test images and labels.
def dataCounts(X_train, y_train, X_test, y_test):
    # Bar graph to show the number of benign and malignant moles in the training and test data
    plt.bar(0, y_train[np.where(y_train == 0)].shape[0], label = 'benign')
    plt.bar(1, y_train[np.where(y_train == 1)].shape[0], label = 'malignant')
    plt.legend()
    plt.title("Training Data")
    plt.show()
    
    plt.bar(0, y_test[np.where(y_test == 0)].shape[0], label = 'benign')
    plt.bar(1, y_test[np.where(y_test == 1)].shape[0], label = 'malignant')
    plt.legend()
    plt.title("Test Data")
    plt.show()

### Description: Normalizes the pixel values of images from 0 to 1.
### Parameters: X_train, X_test - Training and test image arrays.
### Returns: Normalized training and test image arrays.
def normalizeImages(X_train, X_test):
    # Normalize the images to have pixel values between 0 and 1
    def normalize_images(images):
        images = images.astype('float32')
        images /= 255.0  # Scale pixel values to [0, 1]
        return images
    
    X_train_norm = normalize_images(X_train)
    X_test_norm = normalize_images(X_test)

    return X_train_norm, X_test_norm

### Description: Uses a pre-trained VGG16 model to extract features from images.
### Parameters: X_train, X_test - Training and test image arrays.
### Returns: Feature arrays extracted from the images.
def kerasFeatureSelection(X_train, X_test):
    # Load the VGG16 model
    model_vgg16 = VGG16(weights='imagenet', include_top=False)
    # Extract features
    feature_extractor = Model(inputs=model_vgg16.inputs, outputs=model_vgg16.layers[-2].output)
     
    def extract_features(sample):
        features = feature_extractor.predict(sample)
        return features
    
    X_train_features = extract_features(X_train)
    X_test_features = extract_features(X_test)

    return X_train_features, X_test_features

### Description: Uses a pre-trained ResNet50 model to extract features from images.
### Parameters: X_train, X_test - Training and test image arrays.
### Returns: Feature arrays extracted from the images.
def resnetFeatureSelection(X_train, X_test):
    from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
    from tensorflow.keras.models import Model

    # Load the ResNet50 model
    model_resnet = ResNet50(weights='imagenet', include_top=False)
    # Extract features
    feature_extractor = Model(inputs=model_resnet.inputs, outputs=model_resnet.layers[-1].output)

    def extract_features(sample):
        sample_preprocessed = preprocess_input(sample)
        features = feature_extractor.predict(sample_preprocessed)
        return features

    X_train_features = extract_features(X_train)
    X_test_features = extract_features(X_test)

    return X_train_features, X_test_features

### Description: Uses a pre-trained InceptionV3 model to extract features from images.
### Parameters: X_train, X_test - Training and test image arrays.
### Returns: Feature arrays extracted from the images.
def inceptionFeatureSelection(X_train, X_test):
    from tensorflow.keras.applications.inception_v3 import InceptionV3, preprocess_input
    from tensorflow.keras.models import Model

    # Load the InceptionV3 model
    model_inception = InceptionV3(weights='imagenet', include_top=False)
    # Extract features
    feature_extractor = Model(inputs=model_inception.inputs, outputs=model_inception.layers[-1].output)

    def extract_features(sample):
        sample_preprocessed = preprocess_input(sample)
        features = feature_extractor.predict(sample_preprocessed)
        return features

    X_train_features = extract_features(X_train)
    X_test_features = extract_features(X_test)

    return X_train_features, X_test_features

### Description: Uses a pre-trained EfficientNetB0 model to extract features from images.
### Parameters: X_train, X_test - Training and test image arrays.
### Returns: Feature arrays extracted from the images.
def efficientnetFeatureSelection(X_train, X_test):
    from tensorflow.keras.applications.efficientnet import EfficientNetB0, preprocess_input
    from tensorflow.keras.models import Model

    # Load the EfficientNetB0 model
    model_efficientnet = EfficientNetB0(weights='imagenet', include_top=False)
    # Extract features
    feature_extractor = Model(inputs=model_efficientnet.inputs, outputs=model_efficientnet.layers[-1].output)

    def extract_features(sample):
        sample_preprocessed = preprocess_input(sample)
        features = feature_extractor.predict(sample_preprocessed)
        return features

    X_train_features = extract_features(X_train)
    X_test_features = extract_features(X_test)

    return X_train_features, X_test_features

### Description: Reshapes the feature arrays and applies PCA to reduce dimensions while retaining 90% of the variance.
### Parameters: X_train_features, X_test_features - Feature arrays from the training and test sets.
### Returns: PCA-transformed training and test data.
def dataReshape(X_train_features, X_test_features):
    global global_pca  # Use the global variable

    # Reshape the training data
    num_training_samples = X_train_features.shape[0]
    X_train_reshaped = X_train_features.reshape(num_training_samples, -1)
    
    # Reshape the testing data
    num_testing_samples = X_test_features.shape[0]
    X_test_reshaped = X_test_features.reshape(num_testing_samples, -1)
    
    # Now, apply PCA on the reshaped data
    pca = PCA(n_components=0.9)  # retain 90% of the variance
    X_train_pca = pca.fit_transform(X_train_reshaped)
    X_test_pca = pca.transform(X_test_reshaped)

    # Save the PCA model
    global_pca = pca

    return X_train_pca, X_test_pca

### Description: Trains a Support Vector Machine (SVM) model on the PCA-transformed data.
### Parameters: X_train_pca - PCA-transformed training data, y_train - Training labels.
### Returns: Trained SVM model.
def trainModel(X_train_pca, y_train):
    global global_svm_model  # Use the global variable

    # Train the model
    svm_model = SVC(kernel='rbf', probability=True, random_state=42)
    svm_model.fit(X_train_pca, y_train)

    # Save the model
    global_svm_model = svm_model

    return svm_model

### Description: Evaluates the SVM model using accuracy and cross-validation and prints the results.
### Parameters: svm_model - Trained SVM model, X_test_pca, X_train_pca - PCA-transformed test and training data, y_test, y_train - Test and training labels.
def modelMetrics(svm_model, X_test_pca, X_train_pca, y_test, y_train):
    # Model metrics
    y_pred = svm_model.predict(X_test_pca)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred))

    # Cross-validation
    scores = cross_val_score(svm_model, X_train_pca, y_train, cv=5)
    print("Cross-validation scores:", scores)

### Description: Checks if a given path is a URL.
### Parameters: path - String path to check.
### Returns: Boolean indicating if the path is a URL.
def is_url(path):
    """Check if the given path is a URL."""
    return path.startswith('http://') or path.startswith('https://')

### Description: Opens an image from a local path or URL.
### Parameters: path - Path or URL of the image.
### Returns: Image object.
def open_image(path):
    """Open an image from a local path or a URL."""
    if is_url(path):
        response = requests.get(path)
        img = Image.open(io.BytesIO(response.content))
    else:
        img = Image.open(path)
    return img

def gsm(test_image_path):
   # Load and preprocess the image
    img = Image.open(test_image_path)
    img = img.resize((224, 224))  # Resize to match VGG16 input size
    x = np.array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)  # Preprocess for VGG16

    # Load VGG16 model
    model_vgg16 = VGG16(weights='imagenet', include_top=True)

    # Get the top predicted class
    preds = model_vgg16.predict(x)
    top_pred_index = tf.argmax(preds[0])

    # Get the output of the top predicted class
    output = model_vgg16.output[:, top_pred_index]

    # Get the last convolutional layer
    last_conv_layer = model_vgg16.get_layer('block5_conv3')
    last_conv_layer_model = Model(model_vgg16.inputs, last_conv_layer.output)

    # Gradient model
    gradient_model = Model([model_vgg16.inputs], [last_conv_layer.output, model_vgg16.output])

    # Compute the gradient of the top predicted class for the input image
    with tf.GradientTape() as tape:
        last_conv_layer_output, preds = gradient_model(x)
        top_class_pred = preds[:, top_pred_index]

    # Use the gradients of the top predicted class with respect to the output feature map
    grads = tape.gradient(top_class_pred, last_conv_layer_output)

    # Mean pooling the gradients over the height and width axes
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    # Weigh the output feature map with the computed gradient values
    last_conv_layer_output = last_conv_layer_output[0]
    heatmap = last_conv_layer_output @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)

    # Normalize the heatmap
    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    heatmap = heatmap.numpy()

    # Display heatmap
    plt.matshow(heatmap)
    plt.show()

    # Superimpose the heatmap with the original image
    img = np.array(img)
    heatmap = np.uint8(255 * heatmap)  # Convert to RGB
    heatmap = np.array(Image.fromarray(heatmap).resize((img.shape[1], img.shape[0])))
    heatmap = np.stack((heatmap,) * 3, axis=-1)
    superimposed_img = heatmap * 0.4 + img
    plt.imshow(superimposed_img.astype('uint8'))
    plt.show()
    
### Description: Generates a saliency map for a given image using VGG16 model to highlight areas most affecting the model's prediction.
### Parameters: test_image_path - Path to the test image.
### Returns: Dictionary with base64-encoded heatmap and superimposed image.
def generateSaliencyMap(test_image_path):
   # Load and preprocess the image
    img = open_image(test_image_path)  # Assuming open_image is defined as before
    img = img.resize((224, 224))  # Resize to match VGG16 input size
    x = np.array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)  # Preprocess for VGG16

    # Convert x from a numpy array to a TensorFlow tensor
    x_tensor = tf.convert_to_tensor(x, dtype=tf.float32)

    # Load VGG16 model
    model_vgg16 = VGG16(weights='imagenet', include_top=True)

    # Get the top predicted class
    preds = model_vgg16.predict(x_tensor)
    top_pred_index = tf.argmax(preds[0])

    # Get the output of the top predicted class
    output = model_vgg16.output[:, top_pred_index]

    # Get the last convolutional layer
    last_conv_layer = model_vgg16.get_layer('block5_conv3')

    # Gradient model
    gradient_model = Model([model_vgg16.inputs], [last_conv_layer.output, model_vgg16.output])

    # Compute the gradient of the top predicted class for the input image
    with tf.GradientTape() as tape:
        tape.watch(x_tensor)
        last_conv_layer_output, preds = gradient_model(x_tensor)
        top_class_pred = preds[:, top_pred_index]
    # Use the gradients of the top predicted class with respect to the output feature map
    grads = tape.gradient(top_class_pred, last_conv_layer_output)

    # Mean pooling the gradients over the height and width axes
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    # Weigh the output feature map with the computed gradient values
    last_conv_layer_output = last_conv_layer_output[0]
    heatmap = tf.matmul(last_conv_layer_output, pooled_grads[..., tf.newaxis])
    heatmap = tf.squeeze(heatmap)

    # Normalize the heatmap
    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    heatmap = heatmap.numpy()

    # Superimpose the heatmap with the original image
    img = np.array(img)
    heatmap = np.uint8(255 * heatmap)  # Convert to RGB
    heatmap = np.array(Image.fromarray(heatmap).resize((img.shape[1], img.shape[0])))
    heatmap = np.stack((heatmap,) * 3, axis=-1)
    superimposed_img = heatmap * 0.4 + img

    # Convert images to base64 for web display or API response
    def img_to_base64(image_array):
        pil_img = Image.fromarray(image_array.astype(np.uint8))
        buff = io.BytesIO()
        pil_img.save(buff, format="JPEG")
        img_str = base64.b64encode(buff.getvalue()).decode("utf-8")
        return img_str

    heatmap_base64 = img_to_base64(heatmap)
    superimposed_img_base64 = img_to_base64(superimposed_img)

    # Return base64-encoded images
    return {
        'heatmap': heatmap_base64,
        'superimposed_img': superimposed_img_base64
    }

### Description: Initializes and trains global models for PCA and SVM, processing images for feature extraction and dimensionality reduction.
### Parameters: benign_train, malignant_train, benign_test, malignant_test - Paths to the image directories.
def setup_global_models(benign_train, malignant_train, benign_test, malignant_test):
    global global_pca, global_svm_model

    # Load and preprocess the data
    X_train, y_train, X_test, y_test = loadingData(benign_train, malignant_train, benign_test, malignant_test)

    # Normalize images
    X_train_norm, X_test_norm = normalizeImages(X_train, X_test)

    # Select one of the feature selection methods (e.g., using VGG16)
    X_train_features, X_test_features = kerasFeatureSelection(X_train_norm, X_test_norm)

    # Reshape data for PCA and initialize PCA
    X_train_reshaped = X_train_features.reshape(X_train_features.shape[0], -1)
    global_pca = PCA(n_components=0.9).fit(X_train_reshaped)

    # Apply PCA transformation
    X_train_pca = global_pca.transform(X_train_reshaped)

    # Train SVM model
    global_svm_model = SVC(kernel='rbf', probability=True, random_state=42)
    global_svm_model.fit(X_train_pca, y_train)

### Description: Simple test function to print a string.
### Parameters: str - String to print.
def tests(str):
    print(str)

### Description: Processes a test image to predict probabilities of benign and malignant classifications using a pre-trained SVM.
### Parameters: test_image_path - Path to the test image.
### Returns: Tuple of probabilities for benign and malignant classifications.
def testGrouped(test_image_path):
    #USE TO CONNECT TO FRONTEND
    # Load the image
    if is_url(test_image_path):
        img = download_image(test_image_path)
    else:
        img = Image.open(test_image_path).convert('RGB')
    img = img.convert('RGB')
    img = img.resize((224, 224))

    # Preprocess the image
    test_image = img.resize((224, 224))  # Resize to match VGG16 input
    test_image = np.array(test_image)
    test_image = np.expand_dims(test_image, axis=0)  # Add batch dimension
    #test_image = preprocess_input(test_image)  # Preprocess for VGG16

    # Load the VGG16 model
    model_vgg16 = VGG16(weights='imagenet', include_top=False)

    # Extract features
    feature_extractor = Model(inputs=model_vgg16.inputs, outputs=model_vgg16.layers[-2].output)
    test_feature = feature_extractor.predict(test_image)

    # Reshape the test data
    num_testing_samples = test_feature.shape[0]
    test_reshaped = test_feature.reshape(num_testing_samples, -1)

    # Load the PCA model
    pca = global_pca
    test_pca = pca.transform(test_reshaped)

    # Load the model
    svm_model = global_svm_model

    # Make a prediction
    probabilities = svm_model.predict_proba(test_pca)

    benign_prob = probabilities[0][0]
    malignant_prob = probabilities[0][1]

    return benign_prob,malignant_prob 

### Description: Main function to execute the sequence of operations including data loading, processing, model training, and testing.
def main(): 
    print("Loading data")
    X_train, y_train, X_test, y_test = loadingData('./data/train/benign', './data/train/malignant', './data/test/benign', './data/test/malignant')
    
    print("Displaying first 15 images of moles, and how they are classified")
    testDisplay(X_train, y_train)

    print("Data counts")
    dataCounts(X_train, y_train, X_test, y_test)

    print("Normalizing images")
    X_train_norm, X_test_norm = normalizeImages(X_train, X_test)

    print("Keras feature selection")
    X_train_features, X_test_features = kerasFeatureSelection(X_train_norm, X_test_norm)

    print("Reshaping the image data into 2d arrays")
    X_train_pca, X_test_pca = dataReshape(X_train_features, X_test_features) #PCA model is saved in global_pca

    print("Training model")
    svm_model = trainModel(X_train_pca, y_train)

    print("Model metrics")
    modelMetrics(svm_model, X_test_pca, X_train_pca, y_test, y_train) #Model training ends here. The model is saved in global_svm_model

    print("Testing")
    benign_prob, malignant_prob = testGrouped('./data/test/malignant/17.jpg') # Returns prediction probabilities for benign and malignant

    print("Generating saliency map")
    generateSaliencyMap('./data/test/malignant/17.jpg') #USE THIS TO DISPLAY THE SALIENCY MAP

    # FRONT END LOADING AND TESTING
        # 1. Loading and preprocessing the images - Print this at start of loadingData()
        # 2. Extracting features using VGG16 CNN model - Print this at start of kerasFeatureSelection()
        # 3. Reshaping the data and applying PCA - Print this at start of dataReshape()
        # 4. Training the SVM model - Print this at start of trainModel()
        # 5. Testing the model using your test image - Print this at start of testGrouped()
            #5.1. Update on the prediction. There are two predictions, one for benign and one for malignant. Return both to the front end after completion.
        # 6. Success!
if __name__ == '__main__':
    main()
