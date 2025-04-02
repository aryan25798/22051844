import requests

# API Endpoints
AUTH_URL = "http://20.244.56.144/evaluation-service/auth"
USERS_URL = "http://20.244.56.144/evaluation-service/users"

# Credentials (Replace with your actual credentials)
auth_data = {
    "email": "22051844@kiit.ac.in",
    "name": "Aryan",
    "rollNo": "22051844",
    "accessCode": "nwpwrZ",
    "clientID": "47350c53-4e45-40c1-bf55-1942e52f2d46",  # Replace with your generated clientID
    "clientSecret": "dCGrFKkKcRavUhYv"  # Replace with your generated clientSecret
}

# Step 1: Get Authentication Token
try:
    auth_response = requests.post(AUTH_URL, json=auth_data)
    auth_response.raise_for_status()  # Raise an error for bad status codes

    token_data = auth_response.json()
    access_token = token_data.get("access_token")

    if not access_token:
        print("❌ Failed to get access token")
        exit()

    print("✅ Access Token Obtained!")

except requests.exceptions.RequestException as e:
    print(f"❌ Error fetching token: {e}")
    exit()

# Step 2: Fetch Users Using the Token
headers = {"Authorization": f"Bearer {access_token}"}

try:
    users_response = requests.get(USERS_URL, headers=headers)
    users_response.raise_for_status()  # Raise an error for bad status codes

    users = users_response.json()
    print("✅ Users Fetched Successfully!")
    print(users)

except requests.exceptions.HTTPError as http_err:
    if users_response.status_code == 401:
        print("❌ Unauthorized! Check your access token.")
    elif users_response.status_code == 404:
        print("❌ API endpoint not found. Check the URL.")
    else:
        print(f"❌ HTTP Error: {http_err}")

except requests.exceptions.RequestException as e:
    print(f"❌ Failed to fetch users: {e}")