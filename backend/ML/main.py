import sys
import pandas as pd
import numpy as np
import sklearn
import matplotlib
#import keras
import matplotlib.pyplot as plt
from pandas.plotting import scatter_matrix
import seaborn as sns

print('Python: {}'.format(sys.version))
print('Pandas: {}'.format(pd.__version__))
print('Numpy: {}'.format(np.__version__))
print('Sklearn: {}'.format(sklearn.__version__))
print('Matplotlib: {}'.format(matplotlib.__version__))
#print('Keras: {}'.format(keras.__version__))

cleveland = pd.read_csv('../CVD_datasets/processed.cleveland.data', header=None)

print( 'Shape of DataFrame: {}'.format(cleveland.shape))
print (cleveland.loc[1])

cleveland.loc[280:]

data = cleveland[~cleveland.isin(['?'])]
data.loc[280:]

data = data.dropna(axis=0)
data.loc[280:]

print(data.shape)
print(data.dtypes)

data = data.apply(pd.to_numeric)
data.dtypes

data.describe()

data.hist(figsize = (12, 12))
plt.show()

pd.crosstab(data.age,data.target).plot(kind="bar",figsize=(20,6))
plt.title('Heart Disease Frequency for Ages')
plt.xlabel('Age')
plt.ylabel('Frequency')
plt.show()

plt.figure(figsize=(10,10))
sns.heatmap(data.corr(),annot=True,fmt='.1f')
plt.show()

age_unique=sorted(data.age.unique())
age_thalach_values=data.groupby('age')['thalach'].count().values
mean_thalach=[]
for i,age in enumerate(age_unique):
    mean_thalach.append(sum(data[data['age']==age].thalach)/age_thalach_values[i])
    
plt.figure(figsize=(10,5))
sns.pointplot(x=age_unique,y=mean_thalach,color='red',alpha=0.8)
plt.xlabel('Age',fontsize = 15,color='blue')
plt.xticks(rotation=45)
plt.ylabel('Thalach',fontsize = 15,color='blue')
plt.title('Age vs Thalach',fontsize = 15,color='blue')
plt.grid()
plt.show()