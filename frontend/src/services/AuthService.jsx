"use client";
import axios from "axios";
import { API_CONFIG } from "@/lib/config";
import { useNavigate } from "react-router-dom";

export const authService = {
  async login(email, password, rememberMe = false) {
    const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/login`, { email, password, rememberMe }, { withCredentials: true });
    return response.data.user;
  },

  async loginWithGoogle() {
    try {
      window.location.href = `${API_CONFIG.BASE_URL}/auth/google/login`;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to login with Google" + error + API_CONFIG.BASE_URL
      );
    }
  },
  async signupWithGoogle() {
    try {
      window.location.href = `${API_CONFIG.BASE_URL}/auth/google/signup`;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to signup with Google" + error + API_CONFIG.BASE_URL
      );
    }
  },

  async register(fullName, email, password) {
    const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/register`, 
                                    { "username":fullName, 
                                      "email":email, 
                                      "password":password }, 
                                    { withCredentials: true });
    return response.data.user;
  },

  async logout() {
    await axios.post('/auth/logout', {}, { withCredentials: true });
  },

  async getCurrentUser() {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/users/me`, { withCredentials: true });
    // console.log("response in auth service", response.data)
    return response.data;
  }
};
