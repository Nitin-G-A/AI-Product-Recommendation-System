from flask import Flask, request, jsonify
from deepface import DeepFace
import os
from db import get_connection

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze():

    if "image" not in request.files:
        return jsonify({
            "error": "No image uploaded"
        }), 400

    image = request.files["image"]
    income = request.form.get("income")

    image_path = "temp.jpg"
    image.save(image_path)

    result = DeepFace.analyze(
        img_path=image_path,
        actions=["age", "gender"],
        detector_backend="retinaface",
        enforce_detection=True
    )

    age = result[0]["age"]
    gender = result[0]["dominant_gender"]

    print("Age:", age)
    print("Gender:", gender)
    print("Saving to database...")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
    """
    INSERT INTO customers(age, gender, income)
    VALUES (%s, %s, %s)
    """,
    (age, gender, income)
    )

    conn.commit()
    print("Saved successfully!")

    cursor.close()
    conn.close()

    os.remove(image_path)

    return jsonify({
        "age": age,
        "gender": gender,
        "income": income
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)