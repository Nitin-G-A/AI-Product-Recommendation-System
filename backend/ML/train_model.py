#traning the model using the training data and saving the model and encoders for later use in the API.
# model will be a Random Forest Classifier, and we will use Label Encoding for the categorical features.
# The training data is expected to be in a CSV file named "training_data.csv" with columns "age_group", "gender", "income", and "product_category". 
# After training, the model and encoders will be saved as .pkl files for later use in the API.
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load Data
df = pd.read_csv("training_data.csv")

# Encoders
age_encoder = LabelEncoder()
gender_encoder = LabelEncoder()
income_encoder = LabelEncoder()
product_encoder = LabelEncoder()

df["age_group"] = age_encoder.fit_transform(df["age_group"])
df["gender"] = gender_encoder.fit_transform(df["gender"])
df["income"] = income_encoder.fit_transform(df["income"])

y = product_encoder.fit_transform(df["product_category"])

X = df[["age_group", "gender", "income"]]

# Model
model = RandomForestClassifier()

model.fit(X, y)

# Save
joblib.dump(model, "recommendation_model.pkl")
joblib.dump(age_encoder, "age_encoder.pkl")
joblib.dump(gender_encoder, "gender_encoder.pkl")
joblib.dump(income_encoder, "income_encoder.pkl")
joblib.dump(product_encoder, "product_encoder.pkl")

print("Model Trained Successfully")