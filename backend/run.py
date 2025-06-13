from flask import Flask
from flask_cors import CORS
from app.routes import routes
  # Make sure routes.py exists in the same folder

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Register your rule-based routes
app.register_blueprint(routes)

if __name__ == '__main__':
    app.run(debug=True, port=6969)
