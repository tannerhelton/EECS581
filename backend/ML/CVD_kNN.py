# ----------------------------------------
# Imports
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.compose import ColumnTransformer
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.compose import make_column_transformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import GridSearchCV
from sklearn.neighbors import KNeighborsClassifier
from sklearn import metrics
import base64
import io
# ----------------------------------------



def load_and_preprocess_data(filepath):
    """
    Load and preprocess the dataset.
    """
    df = pd.read_csv(filepath)
    df = df[df.columns].replace({
        'Yes': 1, 'No': 0, 'Male': 1, 'Female': 0,
        'No, borderline diabetes': '0', 'Yes (during pregnancy)': '1'
    })
    df['Diabetic'] = df['Diabetic'].astype(int)
    return df

def plot_count_distribution(df, feature):
    """
    Plot count distribution of a feature based on heart disease.
    """
    plt.figure(figsize=(13, 6))
    sns.countplot(x=df[feature], hue='HeartDisease', data=df, palette='YlOrBr')
    plt.xlabel(feature)
    plt.ylabel('Frequency')
    plt.legend(['Normal', 'HeartDisease'])
    plt.title(
        f"Distribution of Cases with Yes/No heart disease according to {feature}")
    plt.show()

def plot_feature_distribution(df, feature, user_value, color, label):
    """
    Plot the distribution of a given feature in the dataset, 
    highlighting a specific user value.
    """
    fig, ax = plt.subplots(figsize=(13, 5))
    # The HeartDisease column should be numeric (1 for Yes, 0 for No)
    sns.kdeplot(df[df["HeartDisease"] == 1][feature], alpha=0.5,
                fill=True, color="red", label="HeartDisease", ax=ax)
    sns.kdeplot(df[df["HeartDisease"] == 0][feature], alpha=0.5,
                fill=True, color="#fccc79", label="Normal", ax=ax)
    plt.axvline(user_value, color=color, linestyle='dashed',
                linewidth=2, label=label)
    plt.title(f'Distribution of {feature} with User Data Point', fontsize=18)
    ax.set_xlabel(feature)
    ax.set_ylabel("Density")
    ax.legend()

    image_bytes_io = io.BytesIO()
    plt.savefig(image_bytes_io, format='png')
    plt.close()

    # Encode the image as a base64 data URL
    image_data = base64.b64encode(image_bytes_io.getvalue()).decode('utf-8')
    data_url = f'data:image/png;base64,{image_data}'

    return data_url

def correlation_analysis(df):
    """
    Perform correlation analysis on the dataset.
    """
    numeric_df = df.select_dtypes(include=[np.number])
    correlation = numeric_df.corr().round(2)
    plt.figure(figsize=(14, 7))
    sns.heatmap(correlation, annot=True, cmap='YlOrBr')
    plt.show()

    sns.set_style('white')
    sns.set_palette('YlOrBr')
    plt.figure(figsize=(13, 6))
    plt.title('Distribution of correlation of features')
    abs(correlation['HeartDisease']).sort_values()[:-1].plot.barh()

    # Save the plot to a BytesIO object as a PNG
    image_bytes_io = io.BytesIO()
    plt.savefig(image_bytes_io, format='png')
    plt.close()

    # Encode the image as a base64 data URL
    image_data = base64.b64encode(image_bytes_io.getvalue()).decode('utf-8')
    data_url = f'data:image/png;base64,{image_data}'

    return data_url

def evaluate_model(model, x_test, y_test):
    """
    Evaluate the given model using test data.
    """
    y_pred = model.predict(x_test)
    acc = metrics.accuracy_score(y_test, y_pred)
    prec = metrics.precision_score(y_test, y_pred)
    rec = metrics.recall_score(y_test, y_pred)
    f1 = metrics.f1_score(y_test, y_pred)
    kappa = metrics.cohen_kappa_score(y_test, y_pred)
    y_pred_proba = model.predict_proba(x_test)[:, 1]
    fpr, tpr, _ = metrics.roc_curve(y_test, y_pred_proba)
    auc = metrics.roc_auc_score(y_test, y_pred_proba)
    cm = metrics.confusion_matrix(y_test, y_pred)

    return {
        'acc': acc, 'prec': prec, 'rec': rec, 'f1': f1,
        'kappa': kappa, 'fpr': fpr, 'tpr': tpr, 'auc': auc, 'cm': cm
    }

def transform_data(df, categorical_features):
    """
    Apply data transformations (OneHotEncoding and Standardization) to the DataFrame.
    Returns the transformed DataFrame and the transformers.
    """
    transformer = ColumnTransformer(
        [(f"onehot_{col}", OneHotEncoder(sparse_output=False), [col])
         for col in categorical_features],
        remainder='passthrough'
    )
    df_transformed = transformer.fit_transform(df)

    scaler = StandardScaler()
    df_transformed = scaler.fit_transform(df_transformed)

    return df_transformed, transformer, scaler

def perform_grid_search(X_train, y_train):
    '''
    Perform grid search to find the best hyperparameters for the kNN model.
    Returns the best model and the best number of neighbors.
    '''
    # Instantiate kNN model
    model = KNeighborsClassifier()

    # Define the parameter grid for n_neighbors
    param_grid = {'n_neighbors': range(1, 31)}
    print("Performing grid search...")
    # Create GridSearchCV object
    grid_search = GridSearchCV(model, param_grid, cv=5, scoring='accuracy')
    print("Grid search done.")
    # Fit the model using Grid Search
    grid_search.fit(X_train, y_train)
    print("Best parameters: ", grid_search.best_params_)
    # Retrieve the best number of neighbors and the best model
    best_n_neighbors = grid_search.best_params_['n_neighbors']
    best_model = grid_search.best_estimator_

    return best_model, best_n_neighbors

def train_model(X_train, y_train):
    """
    Train the kNN model on the provided training data.
    Returns the trained model.
    """
    model = KNeighborsClassifier(
        n_neighbors=30,      # Number of neighbors to use
        weights='distance', # Weight type (uniform or distance)
        algorithm='auto',   # Algorithm to compute nearest neighbors ('ball_tree', 'kd_tree', 'brute', or 'auto')
        leaf_size=30,       # Leaf size for the tree algorithm
        p=2,                # Power parameter for the Minkowski metric (p=2 is equivalent to using Euclidean distance)
        metric='minkowski'  # Distance metric to use ('euclidean', 'manhattan', 'minkowski', etc.)
    )
    model.fit(X_train, y_train)
    return model

def predict_heart_disease(filepath, user_input):
    # Re-importing the dataset to start fresh
    df = pd.read_csv(filepath)

    categorical_columns = [
        'Smoking', 'AlcoholDrinking', 'Stroke', 'DiffWalking', 'Sex', 'AgeCategory',
        'Race', 'Diabetic', 'PhysicalActivity', 'GenHealth',
        'Asthma', 'KidneyDisease', 'SkinCancer'
    ]

    numerical_columns = [
        'BMI', 'PhysicalHealth', 'MentalHealth', 'SleepTime'
    ]

    # Checking for missing values in the dataset
    missing_values_in_dataset = df.isnull().sum().sum()

    # Encode the target variable
    y = df['HeartDisease'].map({'Yes': 1, 'No': 0})

    # Now, let's manually encode the categorical variables using pd.get_dummies
    # and scale the numerical features using StandardScaler.
    X = df.drop('HeartDisease', axis=1)
    X_encoded = pd.get_dummies(X, columns=categorical_columns)
    scaler = StandardScaler()
    
    X_encoded[numerical_columns] = scaler.fit_transform(
        X_encoded[numerical_columns])

    # Split the dataset into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(
        X_encoded, y, test_size=0.2, random_state=42)

    # Retrain the KNeighborsClassifier
    knn_model = KNeighborsClassifier(n_neighbors=5)
    knn_model.fit(X_train, y_train)

    # Function to predict heart disease with manual preprocessing
    def predict_heart_disease_manual(user_input):
        user_input_df = pd.DataFrame([user_input])

        user_input_encoded = pd.get_dummies(
            user_input_df, columns=categorical_columns)
        user_input_encoded = user_input_encoded.reindex(
            columns=X_train.columns, fill_value=0)
        user_input_encoded[numerical_columns] = scaler.transform(
            user_input_encoded[numerical_columns])
        probability = knn_model.predict_proba(user_input_encoded)[0, 1]
        return probability

    # Checking for missing values and retraining the model
    missing_values_in_dataset

    return predict_heart_disease_manual(user_input)

def main():
    # Load and preprocess the dataset
    df = load_and_preprocess_data('../CVD_datasets/heart_main.csv')

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

    # Define categorical and numerical columns
    categorical_columns = [
        'Smoking', 'AlcoholDrinking', 'Stroke', 'DiffWalking', 'Sex', 'AgeCategory',
        'Race', 'Diabetic', 'PhysicalActivity', 'GenHealth',
        'Asthma', 'KidneyDisease', 'SkinCancer'
    ]

    numerical_columns = [
        'BMI', 'PhysicalHealth', 'MentalHealth', 'SleepTime'
    ]

    # Select Features and Target
    features = df.drop(columns=['HeartDisease'], axis=1)
    target = df['HeartDisease']

    # Transform data
    X_transformed, transformer, scaler = transform_data(
        features, categorical_columns)

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X_transformed, target, test_size=0.2, random_state=42)

    # Train model
    model = train_model(X_train, y_train)

    # Evaluate model
    evaluation = evaluate_model(model, X_test, y_test)

    # Print evaluation metrics
    print("Evaluation Metrics:")
    print("-----------------------------")
    print(f"Accuracy: {evaluation['acc']}")
    print(f"Precision: {evaluation['prec']}")
    print(f"Recall: {evaluation['rec']}")
    print(f"F1 Score: {evaluation['f1']}")
    print(f"Cohen's Kappa: {evaluation['kappa']}")
    print(f"AUC: {evaluation['auc']}")
    print(f"Confusion Matrix: \n{evaluation['cm']}")
    print("-----------------------------")

    # Perform grid search   
    #best_model, best_n_neighbors = perform_grid_search(X_train, y_train)

    # Define example user data
    user_dataTest = {
        'BMI': 26.5,
        'Smoking': 'Yes',
        'AlcoholDrinking': 'Yes',
        'Stroke': 'No',
        'PhysicalHealth': 1.0,
        'MentalHealth': 1.0,
        'DiffWalking': 'No',
        'Sex': 'Male',
        'AgeCategory': '80 or older',
        'Race': 'White',
        'Diabetic': 'Yes',
        'PhysicalActivity': 'Yes',
        'GenHealth': 'Poor',
        'SleepTime': 7.0,
        'Asthma': 'No',
        'KidneyDisease': 'No',
        'SkinCancer': 'No'
    }

    plot_feature_distribution(
        df, 'BMI', user_dataTest['BMI'], 'red', 'User BMI')
    probability_manual = predict_heart_disease(
        '../CVD_datasets/heart_main.csv', user_dataTest)
    probability_percentage_manual = probability_manual * 100  # Convert to percentage
    print(probability_percentage_manual)
    return [
        probability_percentage_manual,
        plot_feature_distribution(
            df, 'BMI', user_dataTest['BMI'], 'red', 'User BMI'),
        plot_feature_distribution(
            df, 'SleepTime', user_dataTest['SleepTime'], 'blue', 'User SleepTime'),
        plot_feature_distribution(
            df, 'PhysicalHealth', user_dataTest['PhysicalHealth'], 'green', 'User PhysicalHealth'),
        plot_feature_distribution(
            df, 'MentalHealth', user_dataTest['MentalHealth'], 'purple', 'User MentalHealth')]


if __name__ == "__main__":
    main()
