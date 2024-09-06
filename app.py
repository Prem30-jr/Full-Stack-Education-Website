from flask import Flask, render_template, request, redirect, url_for
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/eduweb"
mongo = PyMongo(app)

# MongoDB collection
users_collection = mongo.db.users  # Collection where user data will be stored

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

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

# Login Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Fetch user from the database
        user = users_collection.find_one({"username": username})

        if user and check_password_hash(user['password'], password):
            return redirect(url_for('home'))  # Redirect to home on successful login
        else:
            return "Invalid credentials", 401  # Return an error if login fails
    
    return render_template('login.html')

# Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['signup_username']
    email = request.form['email']
    password = request.form['signup_password']

    # Hash the password for security
    hashed_password = generate_password_hash(password)

    # Check if the user already exists
    existing_user = users_collection.find_one({"username": username})

    if existing_user is None:
        # Create a new user
        users_collection.insert_one({
            "username": username,
            "email": email,
            "password": hashed_password
        })
        return redirect(url_for('login'))  # Redirect to login after signup
    else:
        return "User already exists!", 400  # Return an error if the user exists

if __name__ == '__main__':
    app.run(debug=True)
