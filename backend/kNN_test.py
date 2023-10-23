import pandas as pd
url = ("https://archive.ics.uci.edu/ml/machine-learning-databases"
       "/abalone/abalone.data")

abalone = pd.read_csv(url, header=None)

#print(abalone.head())

abalone.columns = ["Sex", "Length", "Diameter", "Height", "Whole weight", "Shucked weight", "Viscera weight", "Shell weight", "Rings",]

abalone = abalone.drop("Sex", axis=1)

import matplotlib.pyplot as plt

abalone["Rings"].hist(bins=15)
#plt.show()

correlation_matrix = abalone.corr()

#print(correlation_matrix["Rings"])

import numpy as np

a = np.array([2,2])
b = np.array([4,4])

#print(np.linalg.norm(a-b))

X = abalone.drop("Rings", axis=1)
X = X.values
y = abalone["Rings"]
y = y.values

new_data_point = np.array([0.569552, 0.446407, 0.154437, 1.016849, 0.439051, 0.222526, 0.291208]) 

distances = np.linalg.norm(X - new_data_point, axis=1)

k = 3
nearest_neighbor_ids = distances.argsort()[:k]
#print(nearest_neighbor_ids)

nearest_neighbor_rings = y[nearest_neighbor_ids]
#print(nearest_neighbor_rings)

prediction = nearest_neighbor_rings.mean()

import scipy.stats
class_neighbors = np.array(["A", "B", "B", "C"])
#print(scipy.stats.mode(class_neighbors))

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=12345)

from sklearn.neighbors import KNeighborsRegressor
knn_model = KNeighborsRegressor(n_neighbors=3)

knn_model.fit(X_train, y_train)

from sklearn.metrics import mean_squared_error
from math import sqrt
train_preds = knn_model.predict(X_train)
mse = mean_squared_error(y_train, train_preds)
rmse = sqrt(mse)
#print(rmse)

test_preds = knn_model.predict(X_test)
mse = mean_squared_error(y_test, test_preds)
rmse = sqrt(mse)
#print(rmse)

import seaborn as sns
cmap = sns.cubehelix_palette(as_cmap=True)
f, ax = plt.subplots()
points = ax.scatter(X_test[:,0], X_test[:,1], c=test_preds, s=50, cmap=cmap)
f.colorbar(points)
#plt.show()

cmap = sns.cubehelix_palette(as_cmap=True)
f, ax = plt.subplots()
points = ax.scatter(X_test[:,0], X_test[:,1], c=y_test, s=50, cmap=cmap)
f.colorbar(points)
#plt.show()

from sklearn.model_selection import GridSearchCV
parameters = {"n_neighbors": range(1, 50)}
gridsearch = GridSearchCV(KNeighborsRegressor(), parameters)
gridsearch.fit(X_train, y_train)

#print(gridsearch.best_params_)

train_preds_grid = gridsearch.predict(X_train)
trains_mse = mean_squared_error(y_train, train_preds_grid)
train_rmse = sqrt(trains_mse)
test_preds_grid = gridsearch.predict(X_test)
test_mse = mean_squared_error(y_test, test_preds_grid)
test_rmse = sqrt(test_mse)
#print(train_rmse)
#print(test_rmse)

parameters = {"n_neighbors": range(1, 50), "weights": ["uniform", "distance"]}
gridsearch = GridSearchCV(KNeighborsRegressor(), parameters)
gridsearch.fit(X_train, y_train)
gridsearch.best_params_
test_preds_grid = gridsearch.predict(X_test)
test_mse = mean_squared_error(y_test, test_preds_grid)
test_rmse = sqrt(test_mse)
#print(test_rmse)

best_k = gridsearch.best_params_["n_neighbors"]
best_weights = gridsearch.best_params_["weights"]
bagged_knn = KNeighborsRegressor(n_neighbors=best_k, weights=best_weights)

from sklearn.ensemble import BaggingRegressor
bagging_model = BaggingRegressor(bagged_knn, n_estimators=100)

bagging_model.fit(X_train, y_train)
test_preds_grid = bagging_model.predict(X_test)
test_mse = mean_squared_error(y_test, test_preds_grid) 
test_rmse = sqrt(test_mse)
print(test_rmse)