Full Stack Education Website
This is a full-stack web application designed to provide online education similar to platforms like Coursera or Udemy. The platform features courses, streak maintenance, coding practice, rewards, and an AI-driven recommendation system that personalizes learning based on user performance.

Table of Contents
Features
Technologies Used
Installation
Usage
Project Structure
Future Enhancements
Contributing
License
Features
User Authentication (Sign-up, Login)
Course Browsing and Enrolment
Streak Maintenance for Consistent Learning
Coding Practice After Watching Tutorials
AI-based Course Recommendations
24/7 Chatbot for Doubt Clarification
Rewards, Gems, and Achievements for Learning
MongoDB Integration for Storing Course Data and User Profiles
Technologies Used
Frontend:

HTML
CSS
JavaScript
Backend:

Flask (Python)
Database:

MongoDB
Other Libraries/Tools:

Jinja2 for Templating
Flask-Login for Authentication
Flask-PyMongo for MongoDB Integration
Installation
To set up this project locally, follow these steps:

Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/full-stack-education-website.git
cd full-stack-education-website
Create a Virtual Environment:

bash
Copy code
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install Dependencies:

bash
Copy code
pip install -r requirements.txt
Set up MongoDB:

Install and set up MongoDB.
Create a database and a collection for users and courses.
Update your Flask app's MongoDB connection URI in the config.py or wherever appropriate.
Run the Application:

bash
Copy code
flask run
The app will be available at http://127.0.0.1:5000.

Usage
Register or log in as a user.
Browse available courses and enroll.
Maintain streaks by completing daily tasks and coding challenges.
Use the 24/7 chatbot for instant help with learning.
Earn gems and rewards for course completion and activity.
Project Structure
arduino
Copy code
.
├── static/
│   ├── css/
│   ├── js/
│   └── images/
├── templates/
│   ├── index.html
│   ├── login.html
│   ├── courses.html
│   └── ...
├── app.py
├── config.py
├── models.py
├── requirements.txt
└── README.md
app.py: Main Flask application file
models.py: Defines MongoDB models and schemas
templates/: HTML templates for the app
static/: Contains static files such as CSS, JavaScript, and images
Future Enhancements
Add real-time collaboration between students.
Implement video conferencing for live classes.
Add social sharing features.
Create an admin dashboard for course management.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your improvements or ideas.

License
This project is licensed under the MIT License - see the LICENSE file for details.

