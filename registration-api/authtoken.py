import requests

# API Endpoint for authentication
auth_url = "http://20.244.56.144/evaluation-service/auth"

# Replace with actual values
auth_data = {
    "email": "22051844@kiit.ac.in",
    "name": "Aryan",
    "rollNo": "22051844",
    "accessCode": "nwpwrZ",
    "clientID": "47350c53-4e45-40c1-bf55-1942e52f2d46",  # Replace with your generated clientID
    "clientSecret": "dCGrFKkKcRavUhYv"  # Replace with your generated clientSecret
}

# Sending the authentication request
auth_response = requests.post(auth_url, json=auth_data)

# Handling the response properly
if auth_response.status_code in [200, 201]:  # Accept both 200 & 201
    response_json = auth_response.json()
    print("✅ Authentication Successful!")
    print("Access Token:", response_json["access_token"])
else:
    print(f"❌ Authentication Failed: {auth_response.status_code}")
    print(auth_response.text)