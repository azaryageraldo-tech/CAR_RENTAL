import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('/api/user')
                .then(response => setUser(response.data))
                .catch(() => localStorage.removeItem('auth_token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/login', { email, password });
            const { token, user: userData } = response.data;

            localStorage.setItem('auth_token', token);
            setUser(userData);
            navigate('/admin/dashboard');
        } catch (e) {
            console.error(e);
            throw new Error("Login failed");
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/logout');
        } catch (e) {
            console.error("Logout failed:", e);
        } finally {
            localStorage.removeItem('auth_token');
            setUser(null);
            navigate('/login');
        }
    };

    if (loading) {
        return <div>Loading application...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}