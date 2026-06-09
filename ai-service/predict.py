import joblib

model = joblib.load("recommendation_model.pkl")

age_encoder = joblib.load("age_encoder.pkl")
gender_encoder = joblib.load("gender_encoder.pkl")
income_encoder = joblib.load("income_encoder.pkl")
product_encoder = joblib.load("product_encoder.pkl")


def predict_product(age_group, gender, income):

    age_encoded = age_encoder.transform([age_group])[0]

    gender_encoded = gender_encoder.transform([gender])[0]

    income_encoded = income_encoder.transform([income])[0]

    prediction = model.predict([
        [age_encoded, gender_encoded, income_encoded]
    ])

    category = product_encoder.inverse_transform(prediction)

    return category[0]