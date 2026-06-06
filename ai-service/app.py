from flask import Flask, request, jsonify
from deepface import DeepFace
import os

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze():

    if "image" not in request.files:
        return jsonify({
            "error": "No image uploaded"
        }), 400

    image = request.files["image"]

    image_path = "temp.jpg"
    image.save(image_path)

    result = DeepFace.analyze(
        img_path=image_path,
        actions=["age", "gender"],
        detector_backend="retinaface",
        enforce_detection=True
    )

    os.remove(image_path)

    face = result[0]

    return jsonify({
        "age": int(face["age"]),
        "gender": face["dominant_gender"]
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)