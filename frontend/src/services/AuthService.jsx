"use client";
import axios from "@/lib/axiosClient";
import { API_CONFIG } from "@/lib/config";
import { useNavigate } from "react-router-dom";

export const authService = {
  async login(email, password, rememberMe = false) {
    try {
      // console.log(email, password, rememberMe);
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to login");
    }
  },
  async register(fullName, email, password) {
    try {
      const response = await axios.post(
        "/auth/register",
        {
          username: fullName,
          email: email,
          password: password,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to signup");
    }
  },

	async loginWithGoogle() {
		try {
			window.location.href = `${API_CONFIG.BASE_URL}/auth/google/login`;
		} catch (error) {
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

  // Logout user
  async logout() {
    try {
      const response = await axios.post("/auth/logout");
      console.log("Logout response:", response.data);
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  async getCurrentUser() {
    try {
      const response = await axios.get("/users/me");

			return response.data;
		} catch (error) {
			console.error("getCurrentUser error:", error);
			localStorage.removeItem("user");
			return null;
		}
	},
};
