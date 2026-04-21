import numpy as np
from PIL import Image
from rest_framework.decorators import api_view
from django.http import JsonResponse
import tensorflow as tf

# Load model
model = tf.keras.models.load_model("crops/models/plant_model.h5")

labels = ["Healthy", "Powdery Mildew", "Rust"]

# Detailed advisory data
advisory_data = {
    "Healthy": {
        "crop_status": "The crop looks healthy.",
        "identification": [
            "Leaves appear green and fresh",
            "No major spots, fungal growth, or rust pustules visible",
            "Normal plant growth is seen"
        ],
        "damage": [
            "No disease damage detected"
        ],
        "possible_insects": [
            "No major insect issue visible from this prediction"
        ],
        "treatment": {
            "organic": [
                "Continue regular field monitoring",
                "Use compost or organic manure for balanced nutrition",
                "Maintain proper irrigation schedule"
            ],
            "chemical": [
                "No chemical treatment required at this stage"
            ]
        },
        "prevention": [
            "Inspect leaves regularly for early signs of disease",
            "Avoid overwatering",
            "Maintain proper plant spacing for airflow",
            "Use disease-free seeds and healthy soil"
        ]
    },

    "Powdery Mildew": {
        "crop_status": "The crop may be affected by Powdery Mildew.",
        "identification": [
            "White powder-like fungal coating on leaves",
            "Leaves may curl, dry, or turn yellow",
            "In severe infection, plant growth becomes weak"
        ],
        "damage": [
            "Reduces photosynthesis",
            "Weakens plant growth",
            "Can reduce crop yield and quality"
        ],
        "possible_insects": [
            "This is mainly a fungal disease, not an insect attack",
            "However, weak crops may become more vulnerable to pests"
        ],
        "treatment": {
            "organic": [
                "Spray neem oil at recommended dosage",
                "Use baking soda spray with mild soap solution if suitable",
                "Remove heavily infected leaves"
            ],
            "chemical": [
                "Use sulfur-based fungicide",
                "Use systemic fungicides like hexaconazole or myclobutanil as per agricultural guidance",
                "Follow label dosage strictly"
            ]
        },
        "prevention": [
            "Avoid excess humidity around plants",
            "Ensure proper airflow and spacing",
            "Do not overuse nitrogen fertilizer",
            "Monitor crop regularly for early white patches"
        ]
    },

    "Rust": {
        "crop_status": "The crop may be affected by Rust disease.",
        "identification": [
            "Orange, yellow, brown, or reddish pustules on leaves",
            "Leaves may dry early",
            "Spots often spread quickly under humid conditions"
        ],
        "damage": [
            "Reduces leaf efficiency and photosynthesis",
            "Weakens the crop",
            "Can cause serious yield loss if not controlled early"
        ],
        "possible_insects": [
            "Rust is a fungal disease, not an insect",
            "Still inspect field for aphids or other sap-sucking insects because stressed plants are more vulnerable"
        ],
        "treatment": {
            "organic": [
                "Remove infected leaves if infection is limited",
                "Improve air circulation in the field",
                "Use neem-based preventive sprays where suitable"
            ],
            "chemical": [
                "Apply fungicides like propiconazole or tebuconazole as recommended",
                "Repeat spray based on disease severity and expert advice",
                "Use only approved agricultural products"
            ]
        },
        "prevention": [
            "Use resistant crop varieties if available",
            "Avoid prolonged leaf wetness",
            "Maintain field sanitation",
            "Inspect crop frequently during humid or cool conditions"
        ]
    }
}

def preprocess(img):
    img = img.convert("RGB")
    img = img.resize((224, 224))
    img = np.array(img, dtype=np.float32) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@api_view(["POST"])
def predict(request):
    try:
        if "image" not in request.FILES:
            return JsonResponse({"error": "No image file provided"}, status=400)

        file = request.FILES["image"]
        image = Image.open(file)
        processed = preprocess(image)

        prediction = model.predict(processed)
        index = int(np.argmax(prediction))
        confidence = float(np.max(prediction))
        disease_name = labels[index]

        advice = advisory_data.get(disease_name, {})

        return JsonResponse({
            "disease": disease_name,
            "confidence": round(confidence * 100, 2),
            "advisory": advice
        }, status=200)

    except Exception as e:
        return JsonResponse({
            "error": str(e)
        }, status=500)