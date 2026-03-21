from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
'''import tensorflow as tf'''
'''from PIL import Image'''
'''import numpy as np'''
import pickle
'''
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash'''
from google import genai 
from google.genai import types
import os
from dotenv import load_dotenv


load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found")

# --- NEW 2026 CLIENT SETUP ---
# This single client handles all your AI requests
client = genai.Client(api_key=GEMINI_API_KEY)


app = Flask(__name__)
CORS(app)
disease_model = tf.keras.models.load_model("ML/crop_model.h5")
#database
'''app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://farmer:123456@localhost/signup'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False'''

'''db = SQLAlchemy(app)

# Table definition
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    mobile = db.Column(db.String(15), nullable=False)
    password = db.Column(db.String(255), nullable=False)

# Create all tables
with app.app_context():
    db.create_all()'''


# Load ML models
crop_model = pickle.load(open("ML/crop_model.pkl", "rb"))
le_soil = pickle.load(open("ML/soil.pkl", "rb"))
le_season = pickle.load(open("ML/season.pkl", "rb"))
le_rain = pickle.load(open("ML/rain.pkl", "rb"))
le_crop = pickle.load(open("ML/crop.pkl", "rb"))

# Home page (Frontend)
@app.route("/index1", methods=["GET"])
def home():
    return render_template("index.html")
# Home page (Frontend)
@app.route("/home", methods=["GET"])
def home1():
    return render_template("home.html")


# Prediction API
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    soil = le_soil.transform([data["soil"]])[0]
    season = le_season.transform([data["season"]])[0]
    rain = le_rain.transform([data["rainfall"]])[0]
    temp = data["temp"]

    result = crop_model.predict([[soil, season, rain, temp]])
    crop = le_crop.inverse_transform(result)[0]

    return jsonify({"recommended_crop": crop})

'''@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    mobile = data.get("mobile")
    password = data.get("password")

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, mobile=mobile, password=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()                     
        return jsonify({"message": "Signup successful!"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"})'''

'''@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        data = request.get_json()
        username = data.get("username")
        mobile = data.get("mobile")
        password = data.get("password")

        hashed_password = generate_password_hash(password)
        new_user = User(username=username, mobile=mobile, password=hashed_password)

        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"message": "Signup successful!"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": f"Error: {str(e)}"})
    else:
        # GET request → render HTML page
        return render_template("sign-up.html")
    
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        user = User.query.filter_by(username=username).first()

        if not user:
            return jsonify({
                "success": False,
                "message": "User not found"
            })

        if not check_password_hash(user.password, password):
            return jsonify({
                "success": False,
                "message": "Incorrect password"
            })

        return jsonify({
            "success": True,
            "message": "Login successful",
            "username": user.username
        }), 200

    # GET request
    return render_template("login.html")

    
@app.route("/forgot",methods=["GET","POST"])
def forgot():
    if request.method=="POST":
        data=request.get_json()
        username = data.get("username")
        new_password = data.get("password")


        if not username or not new_password:
             return jsonify({"message":"fill field"}),400
        
        user=User.query.filter_by(username=username).first()
        if not user:
           return jsonify({"message":"user not found"}),400
    
        hashed_password=generate_password_hash(new_password)
        user.password=hashed_password

        try:

            db.session.commit()
            return jsonify({"message": "Password updated successfully"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": "Error updating password"}), 500

    else:
        return render_template("Forgotpass.html")'''


@app.route("/chat", methods=["GET", "POST"])
def chat():
    if request.method == "POST":
        data = request.get_json()
        question = data.get("question", "").strip()

        if not question:
            return jsonify({"answer": "Please ask a question!"})

        try:
            # Using Gemini 2.5 Flash (Stable in 2026) 
            # or use 'gemini-3-flash-preview' for the latest speed
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=question,
                config=types.GenerateContentConfig(
                system_instruction=(
                    "You are a specialized Agricultural Expert and Farmer Assistant. "
                    "Your goal is to provide practical, accurate, and easy-to-understand advice to farmers. "
                    "Expertise: Soil health, pest management, crop rotation, irrigation, and modern farming techniques. "
                    "Tone: Empathetic, helpful, and professional. "
                    "Rules: If a farmer asks about a disease, suggest organic and chemical remedies. "
                    "Mention relevant Indian government schemes (like PM-KISAN or PMFBY) if they help the farmer's specific problem. "
                    "Keep answers concise and avoid complex jargon."
                )
            )
            )

            return jsonify({"answer": response.text})

        except Exception as e:
            print("Gemini error:", e)
            return jsonify({"answer": "Oops! Something went wrong with the AI."})
        

    else:
        return render_template("Farmer.html")
    
@app.route("/scheme", methods=["GET"])
def scheme():
    return render_template("Scheme_gov.html")
@app.route("/insurance", methods=["GET"])
def insurance():
    return render_template("Insurance.html")

@app.route("/loan", methods=["GET"])
def loan ():
    return render_template("loan.html")

@app.route("/subsidy", methods=["GET"])
def subsidy ():
    return render_template("subsidy.html")

@app.route("/tools", methods=["GET"])
def tools ():
    return render_template("Farmer_tool.html")

@app.route("/pmgl", methods=["GET"])
def pmgl ():
    return render_template("pmgl.html")

'''@app.route("/Desea", methods=["GET"])
def Desea ():
    return render_template("Deseasepre.html")

class_names = ['Early_Blight', 'Healthy', 'Late_Blight']

@app.route("/predict1", methods=["POST"])
def predict1():

    file = request.files["image"]

    image = Image.open(file).convert("RGB")
    image = image.resize((128,128))

    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = disease_model.predict(img_array)

    result_index = np.argmax(prediction)

    disease_name = class_names[result_index]

    confidence = float(np.max(prediction)) * 100

    return jsonify({
        "disease": disease_name,
        "confidence": round(confidence, 2)
    })'''

        
if __name__ == "__main__":
    app.run(debug=True)
