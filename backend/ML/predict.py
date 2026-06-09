import joblib

# Load Files
model = joblib.load("recommendation_model.pkl")

age_encoder = joblib.load("age_encoder.pkl")
gender_encoder = joblib.load("gender_encoder.pkl")
income_encoder = joblib.load("income_encoder.pkl")
product_encoder = joblib.load("product_encoder.pkl")


def predict_product(age_group, gender, income):

    age = age_encoder.transform([age_group])[0]
    gender = gender_encoder.transform([gender])[0]
    income = income_encoder.transform([income])[0]

    prediction = model.predict([[age, gender, income]])

    category = product_encoder.inverse_transform(prediction)

    return category[0]


# Test

result = predict_product(
    "Young Adult",
    "Male",
    "50000-100000"
)

print("Recommended Product:", result)