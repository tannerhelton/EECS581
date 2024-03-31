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

def normalizeImages(X_train, X_test):
    # Normalize the images to have pixel values between 0 and 1
    def normalize_images(images):
        images = images.astype('float32')
        images /= 255.0  # Scale pixel values to [0, 1]
        return images
    
    X_train_norm = normalize_images(X_train)
    X_test_norm = normalize_images(X_test)

    return X_train_norm, X_test_norm

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

def trainModel(X_train_pca, y_train):
    global global_svm_model  # Use the global variable

    # Train the model
    svm_model = SVC(kernel='rbf')
    svm_model.fit(X_train_pca, y_train)

    # Save the model
    global_svm_model = svm_model

    return svm_model

def modelMetrics(svm_model, X_test_pca, X_train_pca, y_test, y_train):
    # Model metrics
    y_pred = svm_model.predict(X_test_pca)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred))

    # Cross-validation
    scores = cross_val_score(svm_model, X_train_pca, y_train, cv=5)
    print("Cross-validation scores:", scores)


def is_url(path):
    return path.startswith('http://') or path.startswith('https://')

def download_image(url):
    response = requests.get(url)
    image = Image.open(io.BytesIO(response.content)).convert('RGB')
    return image

def generateSaliencyMap(test_image_path):
    # Load and preprocess the image
    if is_url(test_image_path):
        img = download_image(test_image_path)
    else:
        img = Image.open(test_image_path).convert('RGB')
    img_resized = img.resize((224, 224))  # Resize to match VGG16 input size
    x = np.array(img_resized)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)  # Preprocess for VGG16

    # Load VGG16 model
    model_vgg16 = VGG16(weights='imagenet', include_top=True)
    
    # Get the top predicted class
    preds = model_vgg16.predict(x)
    top_pred_index = np.argmax(preds[0])
    
    # Get the output of the top predicted class
    output = model_vgg16.output[:, top_pred_index]
    
    # Get the last convolutional layer
    last_conv_layer = model_vgg16.get_layer('block5_conv3')
    
    # Gradient model
    gradient_model = Model([model_vgg16.inputs], [last_conv_layer.output, model_vgg16.output])
    
    # Compute the gradient of the top predicted class for the input image
    with tf.GradientTape() as tape:
        conv_outputs, predictions = gradient_model(x)
        loss = predictions[:, top_pred_index]
    
    # Use the gradients of the top predicted class with respect to the output feature map
    output = conv_outputs[0]
    grads = tape.gradient(loss, conv_outputs)[0]
    
    # Mean pooling the gradients over the height and width axes
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1))
    
    # Weigh the output feature map with the computed gradient values
    heatmap = tf.matmul(output, pooled_grads[..., tf.newaxis])
    heatmap = tf.squeeze(heatmap)
    
    # Normalize the heatmap
    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    heatmap = heatmap.numpy()
    
    # Convert heatmap to RGB
    heatmap = np.uint8(255 * heatmap)
    heatmap = np.array(Image.fromarray(heatmap).resize((img.size)))
    heatmap = np.stack((heatmap,) * 3, axis=-1)
    
    # Create superimposed image
    superimposed_img = heatmap * 0.4 + np.array(img)
    superimposed_img = np.clip(superimposed_img, 0, 255).astype('uint8')

    # Convert images to base64
    def img_to_base64(image_array):
        pil_img = Image.fromarray(image_array)
        buff = io.BytesIO()
        pil_img.save(buff, format="JPEG")
        img_str = base64.b64encode(buff.getvalue()).decode("utf-8")
        return img_str
    
    heatmap_base64 = img_to_base64(heatmap)
    superimposed_img_base64 = img_to_base64(superimposed_img)
    
    # Return JSON values
    return {
        'heatmap': heatmap_base64,
        'superimposed_img': superimposed_img_base64
    }

def tests(str):
    print(str)

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
    prediction = svm_model.predict(test_pca)

    return prediction # 1 for malignant, 0 for benign

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
    prediction = testGrouped('./data/test/malignant/17.jpg') # PREDICTION 1 for malignant, 0 for benign

    print("Prediction:", "Malignant" if prediction[0] == 1 else "Benign")

    print("Generating saliency map")
    generateSaliencyMap('./data/test/malignant/17.jpg') #USE THIS TO DISPLAY THE SALIENCY MAP

if __name__ == '__main__':
    main()
