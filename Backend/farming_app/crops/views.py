import numpy as np
from PIL import Image
from rest_framework.decorators import api_view
from django.http import JsonResponse
import tensorflow as tf

# Load model
model = tf.keras.models.load_model("crops/models/plant_model.h5")

labels = ["Healthy", "Powdery Mildew", "Rust"]

def preprocess(img):
    img = img.resize((224, 224))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@api_view(["POST"])
def predict(request):
    file = request.FILES["image"]

    image = Image.open(file)
    processed = preprocess(image)

    prediction = model.predict(processed)
    index = np.argmax(prediction)
    confidence = float(np.max(prediction))

    return JsonResponse({
        "disease": labels[index],
        "confidence": round(confidence * 100, 2)
    })