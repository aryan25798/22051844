import requests

# API Endpoint
url = "http://20.244.56.144/evaluation-service/register"

# Your details (Replace with actual values)
data = {
    "email": "22051844@kiit.ac.in",
    "name": "Aryan",
    "mobileNo": "8804050193",  # Replace with your phone number
    "githubUsername": "aryan25798",
    "rollNo": "22051844",
    "collegeName": "KIIT University",
    "accessCode": "nwpwrZ"
}

# Sending the POST request
response = requests.post(url, json=data)

# Checking the response
if response.status_code == 200:
    print("Registration Successful! Save these credentials:")
    print(response.json())  # Contains clientID and clientSecret
else:
    print("Registration Failed:", response.text)