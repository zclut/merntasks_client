import client from "./axios";

const tokenAuth = token => {
    if (token) {
        client.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete client.defaults.headers.common["x-auth-token"];
    }
};

export default tokenAuth;