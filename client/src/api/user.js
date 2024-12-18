import instance from "./api";

// get a user from their id 
export const getUser = async (userId) => {
    try {
        const res = await instance.get(`/users/${userId}`);
        return res.data;
    } catch(err) {
        throw err;
    }
}

// get all users
export const getAllUsers = async () => {
    try {
        const res = await instance.get("/users");
        return res.data;
    } catch(err) {
        throw err;
    }
}

// update the pfp of a user
export const editPfp = async (body) => {
    try {
        const res = await instance.put(`/users/${body.userId}/pfp`, body);
        return res.data.updatedUser;
    } catch(err) {
        throw err;
    }
}

// export the description of a user 
export const editDescription = async (body) => {
    try {
        const res = await instance.put(`/users/${body.userId}/description`, body);
        return res.data.updatedUser;
    } catch(err) {
        throw err;
    }
}

// search for users 
export const searchUsers = async (searchQuery) => {
    console.log("Search Query: ", searchQuery);
    try {
        const res = await instance.get(`/users/search/${searchQuery}`);
        console.log(res);
        return res.data;
    } catch(err) {
        throw err;
    }
}