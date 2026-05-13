// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token') || null);
//   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (token) {
// //       // Verify token and fetch user profile
// //       verifyToken();
// //     } else {
// //       setLoading(false);
// //     }
// //   }, []);

// // useEffect(() => {
// //   if (token) {
// //     verifyToken();
// //   } else {
// //     setLoading(false);
// //   }
// // }, [token]);

// useEffect(() => {
//   const checkToken = async () => {
//     if (token) {
//       try {
//         const response = await axios.get('/api/users/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error('Token verification failed:', error);
//         localStorage.removeItem('token');
//         setToken(null);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       setLoading(false);
//     }
//   };

//   checkToken();
// }, [token]);

// //   const verifyToken = async () => {
// //     try {
// //       const response = await axios.get('/api/users/profile', {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       setUser(response.data);
// //     } catch (error) {
// //       console.error('Token verification failed:', error);
// //       localStorage.removeItem('token');
// //       setToken(null);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

//   const loginWithGoogle = async (googleId, email, name, profilePicture) => {
//     try {
//       const response = await axios.post('/api/auth/google', {
//         googleId,
//         email,
//         name,
//         profilePicture
//       });
//       setToken(response.data.token);
//       setUser(response.data.user);
//       localStorage.setItem('token', response.data.token);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const loginWithEmail = async (email, password) => {
//     try {
//       const response = await authService.login({ email, password });
//       setToken(response.data.token);
//       setUser(response.data.user);
//       localStorage.setItem('token', response.data.token);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const signupWithEmail = async (email, name, password, profilePicture) => {
//     try {
//       const response = await authService.signup({
//         email,
//         name,
//         password,
//         profilePicture
//       });
//       setToken(response.data.token);
//       setUser(response.data.user);
//       localStorage.setItem('token', response.data.token);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const loginAsGuest = async (name) => {
//     try {
//       const response = await authService.guestLogin({ name });
//       setToken(response.data.token);
//       setUser(response.data.user);
//       localStorage.setItem('token', response.data.token);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('token');
//   };

//   const refreshUser = async () => {
//     if (token) {
//       try {
//         const response = await axios.get('/api/users/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUser(response.data);
//         return response.data;
//       } catch (error) {
//         console.error('Failed to refresh user:', error);
//         throw error;
//       }
//     }
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       token,
//       loading,
//       loginWithGoogle,
//       loginWithEmail,
//       signupWithEmail,
//       loginAsGuest,
//       logout,
//       refreshUser
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




import React, { createContext, useState, useEffect } from 'react';
import { authService, userService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const response = await userService.getUserProfile(token);
          setUser(response);
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          setToken(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkToken();
  }, [token]);

  const loginWithGoogle = async (
    googleId,
    email,
    name,
    profilePicture
  ) => {
    try {
      const response = await authService.googleLogin({
        googleId,
        email,
        name,
        profilePicture
      });

      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const response = await authService.login({
        email,
        password
      });

      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const signupWithEmail = async (
    email,
    name,
    password,
    profilePicture
  ) => {
    try {
      const response = await authService.signup({
        email,
        name,
        password,
        profilePicture
      });

      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const loginAsGuest = async (name) => {
    try {
      const response = await authService.guestLogin({
        name
      });

      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const refreshUser = async () => {
    if (token) {
      try {
        const response = await userService.getUserProfile(token);
        setUser(response);
        return response;
      } catch (error) {
        console.error('Failed to refresh user:', error);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        loginAsGuest,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};