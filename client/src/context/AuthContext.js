import { createContext, useState, useEffect } from 'react';
import { checkAuth } from '../api/auth.js';
import { getUser } from '../api/user.js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // check if user is authenticated on load 
    useEffect(() => {
        checkAuth().then((data) => {
            if(data) {
                getUser(data.id).then((res) => {
                    setUser(res);
                }).catch((err) => {
                    console.error(err);
                });
            } else {
                setUser(null);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;