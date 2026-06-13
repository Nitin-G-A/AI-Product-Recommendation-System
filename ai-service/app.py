from flask import Flask, request, jsonify
from deepface import DeepFace
import os

from db import get_connection
from predict import predict_product

app = Flask(__name__)


def age_to_group(age):
    if age <= 12:
        return "Child"
    elif age <= 19:
        return "Teen"
    elif age <= 35:
        return "Young Adult"
    elif age <= 55:
        return "Adult"
    else:
        return "Senior"


@app.route("/analyze", methods=["POST"])
def analyze():

    if "image" not in request.files:
        return jsonify({
            "error": "No image uploaded"
        }), 400

    image = request.files["image"]

    income = request.form.get("income")

    # Convert frontend income values to ML values
    income_mapping = {
    "Below 20,000": "Below20000",
    "20,000 - 50,000": "20000-50000",
    "50,000 - 1,00,000": "50000-100000",
    "Above 1,00,000": "Above100000"
}

    income = income_mapping.get(income, income)

    image_path = "temp.jpg"
    image.save(image_path)

    try:

        result = DeepFace.analyze(
            img_path=image_path,
            actions=["age", "gender"],
            detector_backend="retinaface",
            enforce_detection=True
        )

        age = result[0]["age"]
        gender = result[0]["dominant_gender"]

        # Convert DeepFace gender values
        if gender == "Man":
            gender = "Male"
        elif gender == "Woman":
            gender = "Female"

        age_group = age_to_group(age)

        product = predict_product(
            age_group,
            gender,
            income
        )
        confidence = 90.0

        reason = (
        f"{age_group} {gender}s in this income range "
        f"commonly prefer {product}"
      )

        print("Age:", age)
        print("Gender:", gender)
        print("Age Group:", age_group)
        print("Income:", income)
        print("Recommended Product:", product)

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
    """
    INSERT INTO customers(
        age,
        gender,
        income,
        age_group,
        recommended_product,
        confidence_score,
        recommendation_reason
    )
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """,
    (
        age,
        gender,
        income,
        age_group,
        product,
        confidence,
        reason
    )
)

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
    "age": age,
    "age_group": age_group,
    "gender": gender,
    "income": income,
    "recommended_product": product,
    "confidence": confidence,
    "reason": reason
      })
    except Exception as e:
        print("ERROR:", e)

        return jsonify({
            "error": str(e)
        }), 500
    finally:
        if os.path.exists(image_path):
            os.remove(image_path)


if __name__ == "__main__":
    app.run(port=5001, debug=True)