# EasyGP - Old English Village GP Chatbot

This project is a serverless Flask app with a React front end, designed to be deployed on Vercel. It simulates a conversation with an Old English Village GP.

## Local Development and Testing

To test the application locally:

1. Run the Flask backend:
   ```
   cd api
   flask run
   ```

2. In a new terminal, run the React frontend:
   ```
   npm start
   ```

3. Open a web browser and navigate to `http://localhost:3000` to test the application.

## Deployment to Vercel

To deploy the application to Vercel:

1. Ensure you have the Vercel CLI installed:
   ```
   npm install -g vercel
   ```

2. In the project root directory, run:
   ```
   vercel
   ```

3. Follow the prompts to link your project to Vercel.

4. Once deployed, Vercel will provide you with a URL for your live application.

## Project Structure

- `/api`: Contains the Flask backend (`chatbot.py`)
- `/src`: Contains the React frontend (`App.tsx`, `App.css`)
- `vercel.json`: Configuration for Vercel deployment
- `package.json`: Node.js dependencies and scripts
- `requirements.txt`: Python dependencies for the Flask backend

## Note

Make sure all necessary dependencies are installed before running the application locally:

- For the backend: `pip install -r api/requirements.txt`
- For the frontend: `npm install`
