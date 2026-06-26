let IS_PROD = true;
// let IS_PROD = false;

const server = IS_PROD ?
    "https://videocalling-platform-backend.onrender.com" :

    "http://localhost:8000"


export default server;