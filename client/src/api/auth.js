import instance from "./api";

// attempts to login user 
export const login = async (body) => {
    try {
        const res = await instance.post("/auth/login", body)
        return res;
    } catch(err) {
        console.error("Login error: ", err);
    }
}

// registers a user 
export const register = async (body) => {
    try {
        const res = await instance.post("/auth/register", body)
        return res;
    } catch(err) {
        console.error("Register error: ", err);
        throw err.response.data;
    }
}

// checks if user is authenticated 
export const checkAuth = async () => {  
    try {
        const res = await instance.get("/auth/check");
        return res.data;
    } catch(err) {
        console.error("Authentication error: ", err);
        return null;
    }
}

// logs out the user 
export const logout = async () => {
    const res = await instance.post("/auth/logout");
    return res;
}