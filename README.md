# WealthWise

#Output Video

https://github.com/user-attachments/assets/28a0c960-d05b-4efb-a58d-2ca9f4704812


This project is a full-stack web application with a React frontend and a Flask backend. It helps users set and achieve financial goals using a rule-based inference engine.

## Project Structure


backend/
  run.py            # Flask app entry point
  app/
    __init__.py
    routes.py       # API routes and inference logic
frontend/
  package.json      # React app dependencies
  src/
    App.js
    components/
    pages/


### Prerequisites

- Python 3.x
- Node.js & npm

  ### Backend Setup (Flask)

1. Open a terminal and navigate to the `backend` directory:
   
   cd backend
   
2. (Optional) Create and activate a virtual environment:
   
   python3 -m venv venv
   source venv/bin/activate


3. Install dependencies:
   
   pip install flask flask-cors
  
4. Run the backend server (on port 6969):
   
   python3 run.py
   
   The backend will be available at `http://localhost:6969`.

   ### Frontend Setup (React)
   
1. Open a new terminal and navigate to the `frontend` directory:

   cd frontend
  
2. Install dependencies:
   
   npm install
  
3. Start the React app:
   
   npm start
   
   The frontend will be available at `http://localhost:3000`.

## Configuration
- The frontend should make API requests to `http://localhost:6969` for backend communication.
- Update API URLs in the frontend code if needed (commonly in `src/components` or `src/pages`).

## Features
- User-friendly React interface for entering financial data and goals
- Flask backend with a rule-based inference engine for recommendations
- CORS enabled for seamless frontend-backend integration

## License
This project is for educational purposes.
