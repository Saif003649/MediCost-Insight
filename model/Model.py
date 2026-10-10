import pandas as pd
import numpy as np
import pickle
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Load dataset
data = pd.read_csv("Insurance_DataSets.csv")

X = data.drop("Premium", axis=1)
y = data["Premium"]

# One-hot encoding
X_encoded = pd.get_dummies(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X_encoded, y, random_state=40
)

# Train model
model = RandomForestRegressor(
    random_state=10,
    n_estimators=100,
    max_depth=10
)
model.fit(X_train, y_train)

# Save column names
model_columns = X_encoded.columns

# -------------------------------
# SAVE MODEL USING PICKLE
# -------------------------------
model_data = {
    "model": model,
    "columns": model_columns
}

with open("insurance_premium_model2.pkl", "wb") as file:
    pickle.dump(model)

print("✅ Model saved as insurance_premium_model.pkl")

# -------------------------------
# TEST PREDICTION
# -------------------------------
user_input = {
    "Age": 28,
    "Gender": "Male",
    "Family_Members": 4,
    "BP_Level": "Normal",
    "Cholesterol_Level": "Normal",
    "Diabetes": 0,
    "Smoking": 1,
    "Alcohol": 1,
    "BMI": 23.9
}

user_df = pd.DataFrame([user_input])
user_df = pd.get_dummies(user_df)
user_df = user_df.reindex(columns=model_columns, fill_value=0)

prediction = model.predict(user_df)
print(f"Predicted Insurance Premium: {prediction[0]:.2f}")
