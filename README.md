# uVote
Full Stack Voting App with server-side rendering using React, React-Router, Redux, Node.js, Express, MongoDB and others.

## Installation
### 1. Install dependencies
```
npm install
```
or
```
yarn install
```
### 2. Set environment variables
The following variables need to be set in your environment for the app to work correctly:
```
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
GITHUB_CALLBACK_URL
MONGODB_URI
```
How to set: (OSX)
```
export MONGODB_URI="mongodb:// ... "
```
## Usage
```npm dev``` or ```yarn dev``` for running the app in dev mode.

```npm start``` or ```yarn start``` for running the app in production mode.
### What's the difference between the two?
The biggest difference is, that in dev mode, webpack has hot reloading for the client side .js and .styl enabled and serves ```bundle.js``` and ```vendors.bundle.js``` from memory. In addition, the resulting ```style.css``` (from compiling the .styl) is included in ```bundle.js``` and directly used as ```<style> ... </style>```.

In production mode however, ```bundle.js```, ```vendor.bundle.js``` and ```style.css``` get written to ```/public/``` on the server and served at ```/```.
