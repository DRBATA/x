from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import uuid

app = Flask(__name__)
CORS(app)

# Conversation class and responses dictionary remain unchanged
# ... (keep the existing Conversation class and responses dictionary)

# Store conversation states
conversations = {}

# Helper function to find best match
def find_best_match(user_input, state):
    user_input = user_input.lower()
    for pattern, response in responses[state].items():
        match = re.search(pattern, user_input)
        if match:
            return response, match
    return None, None

@app.route("/api/chatbot", methods=["POST"])
def chatbot():
    data = request.json
    user_input = data.get('input', '')
    session_id = data.get('session_id')

    if not session_id or session_id not in conversations:
        session_id = str(uuid.uuid4())
        conversations[session_id] = Conversation()

    conversation = conversations[session_id]
    response_data, match = find_best_match(user_input, conversation.state)

    if response_data:
        if isinstance(response_data, str):
            response = response_data
            conversation.state = "initial"
        else:
            if callable(response_data["response"]):
                response = response_data["response"](*match.groups())
            else:
                response = response_data["response"]
            conversation.state = response_data.get("next_state", "initial")
    else:
        response = "I'm not quite sure how to help with that specific issue. As a general recommendation, I suggest a tincture of lavender and a fortnight's rest. If your symptoms persist or worsen, please seek further medical attention."
        conversation.state = "initial"

    return jsonify({
        'response': response,
        'session_id': session_id
    })

# This is for local development. Vercel will use the app object directly.
if __name__ == "__main__":
    app.run(debug=True)
