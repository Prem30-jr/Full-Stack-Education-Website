from flask import Flask, render_template, request, redirect, url_for
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/eduweb"
mongo = PyMongo(app)

users_collection = mongo.db.users  

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/category1')
def category1():
    return render_template('category/category1.html')

@app.route('/category2')
def category2():
    return render_template('category/category2.html')

@app.route('/category3')
def category3():
    return render_template('category/category3.html')

@app.route('/category4')
def category4():
    return render_template('category/category4.html')
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')
@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
       
        user = users_collection.find_one({"username": username})

        if user and check_password_hash(user['password'], password):
            return redirect(url_for('home'))  
        else:
            return "Invalid credentials", 401  
    
    return render_template('login.html')

@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['signup_username']
    email = request.form['email']
    password = request.form['signup_password']

    hashed_password = generate_password_hash(password)

    existing_user = users_collection.find_one({"username": username})

    if existing_user is None:

        users_collection.insert_one({
            "username": username,
            "email": email,
            "password": hashed_password
        })
        return redirect(url_for('login'))  
    else:
        return "User already exists!", 400 

if __name__ == '__main__':
    app.run(debug=True)