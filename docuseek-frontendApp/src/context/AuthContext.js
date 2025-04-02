import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
// Create Auth Context
const AuthContext = createContext();

// Token expiration time in milliseconds (30 minutes)
const TOKEN_EXPIRATION = 30 * 60 * 1000;

// Export Auth Context Provider
export const AuthProvider = ({ children }) => {
    // Initialize state from localStorage if available
    const [currentUser, setCurrentUser] = useState(() => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });

    const [loading, setLoading] = useState(true);

    const [token, setToken] = useState(() => {
        return localStorage.getItem('authToken') || null;
    });

    // Check if user is logged in when the component mounts
    useEffect(() => {
        const checkUserSession = () => {
            const userData = localStorage.getItem('user');
            const storedToken = localStorage.getItem('authToken');
            const tokenExpiration = localStorage.getItem('tokenExpiration');

            if (userData && storedToken && tokenExpiration) {
                // Check if token has expired
                if (new Date().getTime() < parseInt(tokenExpiration, 10)) {
                    setCurrentUser(JSON.parse(userData));
                    setToken(storedToken);
                } else {
                    // Token has expired, clear storage
                    logout();
                }
            }
            setLoading(false);
        };

        checkUserSession();

        // Set up event listener for storage changes (for multi-tab support)
        const handleStorageChange = (e) => {
            if (e.key === 'authToken' && !e.newValue) {
                // Token was removed in another tab
                setCurrentUser(null);
                setToken(null);
            } else if (e.key === 'user' && e.newValue) {
                // User was updated in another tab
                setCurrentUser(JSON.parse(e.newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            // Get the registered user data from localStorage

            const response = await axios.post('https://emploeeservice.onrender.com/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'abcdef',
                },
                withCredentials: true
            });

            if (response.status === 200 || response.status === 201) {
                // If validation passes, set the user
                const user = {
                    email,
                    empId: response?.data?.empId
                };

                // Generate mock token
                const mockToken = response.data?.token;

                try {
                    const employeesResponse = await axios.post('https://emploeeservice.onrender.com/employees', {}, {
                        headers: {
                            'Authorization': `Bearer ${mockToken}`
                        }
                    });

                    if (employeesResponse.status === 200 && employeesResponse.data) {
                        localStorage.setItem('allEmployees', JSON.stringify(employeesResponse.data));
                    }
                } catch (error) {
                    console.error('Failed to fetch employees data:', error);
                }

                // Set expiration time (current time + 30 minutes)
                const expirationTime = new Date().getTime() + TOKEN_EXPIRATION;

                // Store in localStorage
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('authToken', mockToken);
                localStorage.setItem('tokenExpiration', expirationTime.toString());

                // Set in state
                setCurrentUser(user);
                setToken(mockToken);

                // Set up auto-logout when token expires
                setTimeout(() => {
                    logout();
                }, TOKEN_EXPIRATION);

                return user;
            }
        } catch (error) {
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('lastAttendanceDate');
        setCurrentUser(null);
        setToken(null);
    };

    // Check if token is valid
    const isAuthenticated = () => {
        // Check token in state first
        if (token) {
            const tokenExpiration = localStorage.getItem('tokenExpiration');
            return !!tokenExpiration && new Date().getTime() < parseInt(tokenExpiration, 10);
        }

        // If no token in state, check localStorage directly (useful during refresh)
        const storedToken = localStorage.getItem('authToken');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        return !!storedToken && !!tokenExpiration && new Date().getTime() < parseInt(tokenExpiration, 10);
    };

    const value = {
        currentUser,
        login,
        logout,
        loading,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext); 