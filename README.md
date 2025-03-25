# URL Shortener API

This is the URL shortening API, built using **Node.js**, **Express**, and **Firebase Functions**. The API allows users to shorten URLs and redirect them to the original link when accessed.

## Technologies

- **Node.js**: JavaScript runtime environment used for the backend.
- **Express**: Framework used to build the API.
- **Firebase Functions**: Used for deploying the API in the cloud using serverless functions.
- **Firebase Firestore**: Storage for the shortened URLs.
- **CORS**: Enabled to allow requests from external origins.

## Features

- **POST /api/shorten**: Receives a URL and returns a shortened version.
- **GET /api/:shortCode**: Redirects the user to the original link from a shortened URL.

## Folder Structure

- **functions**: Contains the API code using Firebase Functions.
  - **index.js**: Main file with functions and routes.
  - **node_modules**: Contains the project dependencies (not included in the repository).
  - **package.json**: Dependency manager for the backend.

## How to Set Up and Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/renantheodoro/url-shortener-api.git
   ```

## Install the dependencies:

```bash
npm install
```


## Configure Firebase CLI:

Install Firebase CLI globally (if not installed):

```bash
npm install -g firebase-tools
```

### Log in with your Firebase account:

```bash
firebase login
```

### Then initialize Firebase in the project folder:

```bash
firebase init
```

To run locally:

```bash
firebase emulators:start
```

### To deploy the function to Firebase:

```bash
firebase deploy --only functions
```

## How It Works
When the user submits a URL to the POST /api/shorten route, the server generates a unique code using the shortid library and saves the URL in Firebase Firestore.

When accessing a shortened URL via the GET /:shortCode route, the server looks up the original URL in Firestore and redirects the user to it.

## How to Use
Make a POST request to https://https://url-shortener-api-c5488.web.app/api/shorten with a body containing the original URL:

```json
{
  "url": "https://www.example.com"
}
```

The response will be a JSON object with the short code and the shortened link:

```json
{
  "alias": "Kvjp5lF1f",
  "_links": {
    "self": "https://https://url-shortener-api-c5488.web.app/api/Kvjp5lF1f",
    "short": "https://https://url-shortener-api-c5488.web.app/api/Kvjp5lF1f"
  }
}
```

Access the shortened URL in your browser to be redirected to the original link. Example: https://url-shortener-api-c5488.web.app/yRtYjv2lO
