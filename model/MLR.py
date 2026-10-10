import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import pickle
data = pd.read_csv("Insurance_DataSets.csv")
features = data.drop("Premium",axis=1)
target = data["Premium"]

new_features= pd.get_dummies(features)

x_train, x_test, y_train, y_test = train_test_split(new_features.values, target,random_state=40)

model=RandomForestRegressor(random_state=10,n_estimators=100,max_depth=10)
model.fit(x_train,y_train)

y_pred = model.predict(x_test)

# Regression Metrics
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

# MAPE Calculation
mape = np.mean(np.abs((y_test - y_pred) / y_test)) * 100

# Accuracy Calculations
accuracy_mape = 100 - mape          # Accuracy from MAPE
accuracy_r2 = r2 * 100              # Accuracy from R²

print("\n--- Model Evaluation Report ---")
print(f"MAE  : {mae:.2f}")
print(f"MSE  : {mse:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"R²   : {r2:.4f}")

print("\n--- Percentage Scores ---")
print(f"MAPE              : {mape:.2f}%")
print(f"Accuracy (MAPE)   : {accuracy_mape:.2f}%")
print(f"Accuracy (R² Score): {accuracy_r2:.2f}%")
print(new_features.values)

# with open("insurance_premium_model.pkl", "wb") as file:
#     pickle.dump(model, file)

# print("\nModel saved as insurance_premium_model.pkl")

