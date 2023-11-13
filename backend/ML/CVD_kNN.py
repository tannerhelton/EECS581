# ----------------------------------------
# Imports
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.compose import make_column_transformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn import metrics
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
    plt.title(f"Distribution of Cases with Yes/No heart disease according to {feature}")
    plt.show()

def plot_feature_distribution(df, feature, user_value, color, label):
    """
    Plot the distribution of a given feature in the dataset, 
    highlighting a specific user value.
    """
    fig, ax = plt.subplots(figsize=(13, 5))
    # The HeartDisease column should be numeric (1 for Yes, 0 for No)
    sns.kdeplot(df[df["HeartDisease"] == 1][feature], alpha=0.5, shade=True, color="red", label="HeartDisease", ax=ax)
    sns.kdeplot(df[df["HeartDisease"] == 0][feature], alpha=0.5, shade=True, color="#fccc79", label="Normal", ax=ax)
    plt.axvline(user_value, color=color, linestyle='dashed', linewidth=2, label=label)
    plt.title(f'Distribution of {feature} with User Data Point', fontsize=18)
    ax.set_xlabel(feature)
    ax.set_ylabel("Density")
    ax.legend()
    plt.show()

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
    plt.show()

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

def main():
    # Load and preprocess the dataset
    df = load_and_preprocess_data('.././CVD_datasets/heart_main.csv')

    # Plotting count distributions
    plot_count_distribution(df, "Sex")
    plot_count_distribution(df, "Smoking")
    plot_count_distribution(df, 'Race')
    plot_count_distribution(df, 'AgeCategory')
    plot_count_distribution(df, "KidneyDisease")

    # Define example user data
    user_data = {
        'BMI': 25.5,
        'SleepTime': 7.0,
        'PhysicalHealth': 3.0,
        'MentalHealth': 2.0
    }

    # Plotting feature distributions
    plot_feature_distribution(df, 'BMI', user_data['BMI'], 'red', 'User BMI')
    plot_feature_distribution(df, 'SleepTime', user_data['SleepTime'], 'blue', 'User SleepTime')
    plot_feature_distribution(df, 'PhysicalHealth', user_data['PhysicalHealth'], 'green', 'User PhysicalHealth')
    plot_feature_distribution(df, 'MentalHealth', user_data['MentalHealth'], 'purple', 'User MentalHealth')

    # Correlation Analysis
    correlation_analysis(df)

    # Select Features and Target
    features = df.drop(columns=['HeartDisease'], axis=1)
    target = df['HeartDisease']

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=44)

    # Data Transformation (OneHotEncoder and StandardScaler)
    transformer = make_column_transformer(
        (OneHotEncoder(sparse=False), ['AgeCategory', 'Race', 'GenHealth']),
        remainder='passthrough'
    )
    X_train = transformer.fit_transform(X_train)
    X_test = transformer.transform(X_test)

    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    # Model Building and Evaluation
    knn = KNeighborsClassifier(n_neighbors=5)
    knn.fit(X_train, y_train)
    knn_eval = evaluate_model(knn, X_test, y_test)
    print(knn_eval)

if __name__ == "__main__":
    main()
