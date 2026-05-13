import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


export const authService = {
  signup: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
    return response.data;
  },

  login: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    return response.data;
  },

  guestLogin: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/auth/guest`, data);
    return response.data;
  },

  googleLogin: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/auth/google`, data);
    return response.data;
  }
};


export const templateService = {
  getTemplates: async (category = null, isPremium = null) => {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (isPremium !== null) params.append('isPremium', isPremium);
      
      const response = await axios.get(`${API_BASE_URL}/templates?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/templates/categories`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTemplate: async (templateId, token = null) => {
    try {
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const response = await axios.get(`${API_BASE_URL}/templates/${templateId}`, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const userService = {
  getUserProfile: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (token, { name, profilePicture }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/profile`, {
        name,
        profilePicture
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  upgradePremium: async (token, months = 1) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/upgrade-premium`, {
        months
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const shareService = {
  generateShareLink: async (token, templateId, userName, userImage) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/share/generate-link`, {
        templateId,
        userName,
        userImage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getSharedCard: async (shareId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/share/${shareId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
