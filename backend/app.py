from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# -----------------------------
# Load ML Model
# -----------------------------
with open("insurance_premium_model.pkl", "rb") as file:
    model_data = pickle.load(file)

model = model_data["model"]
model_columns = model_data["columns"]

# -----------------------------
# Helper Functions
# -----------------------------
def bp_category(systolic, diastolic):
    if systolic < 90 or diastolic < 60:
        return "Low"
    elif 90 <= systolic <= 120 and 60 <= diastolic <= 80:
        return "Normal"
    else:
        return "High"


def cholesterol_category(cholesterol):
    return "Normal" if cholesterol < 200 else "High"


def yes_no_to_int(value):
    return 1 if str(value).strip().lower() == "yes" else 0


# -----------------------------
# Prediction API
# -----------------------------
@app.route("/predicts", methods=["POST"])
def predicts():
    try:
        data = request.get_json()

        # -----------------------------
        # Derived Categories
        # -----------------------------
        bp_level = bp_category(
            float(data["systolic"]),
            float(data["diastolic"])
        )

        cholesterol_level = cholesterol_category(
            float(data["cholesterol"])
        )

        # -----------------------------
        # ML Input (MATCH TRAINING DATA)
        # -----------------------------
        ml_input = {
            "Age": int(data["age"]),
            "Gender": str(data["gender"]).strip(),
            "Family_Members": int(data["familyCount"]),
            "BP_Level": bp_level,
            "Cholesterol_Level": cholesterol_level,
            "Diabetes": yes_no_to_int(data["diabetes"]),
            "Smoking": yes_no_to_int(data["smoking"]),
            "Alcohol": yes_no_to_int(data["alcohol"]),
            "BMI": float(data["bmi"])
        }

        # -----------------------------
        # DataFrame + Encoding
        # -----------------------------
        df = pd.DataFrame([ml_input])
        df_encoded = pd.get_dummies(df)
        df_encoded = df_encoded.reindex(
            columns=model_columns,
            fill_value=0
        )

        # -----------------------------
        # Prediction
        # -----------------------------
        premium = model.predict(df_encoded)[0]

        # -----------------------------
        # API Response (ALL FEATURES)
        # -----------------------------
        return jsonify({
    "name": data.get("name", ""),
    "age": ml_input["Age"],
    "gender": ml_input["Gender"],
    "family_members": ml_input["Family_Members"],
    "bmi": ml_input["BMI"],

    # 🔹 RAW MEDICAL VALUES
    "systolic": float(data["systolic"]),
    "diastolic": float(data["diastolic"]),
    "cholesterol": float(data["cholesterol"]),

    # 🔹 DERIVED LEVELS
    "bp_level": bp_level,
    "cholesterol_level": cholesterol_level,

    # 🔹 HABITS / CONDITIONS
    "diabetes": ml_input["Diabetes"],
    "smoking": ml_input["Smoking"],
    "alcohol": ml_input["Alcohol"],

    # 🔹 MODEL OUTPUT
    "predicted_premium": round(float(premium), 2)
})


    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e)
        }), 500


# -----------------------------
# Run Server
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True,use_reloader=True)
