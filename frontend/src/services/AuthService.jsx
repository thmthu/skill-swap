'use client'
import axios from 'axios'
import { API_CONFIG } from '@/lib/config'
import { useNavigate } from 'react-router-dom'

export const authService = {
  async login(email, password, rememberMe = false) {
    try {
      console.log(email, password, rememberMe)
      const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/login`, {
        email,
        password
      })
      
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to login')
    }
  },
  async register(fullName, email, password) {
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/register`, {
        username: fullName,
        email: email,
        password: password
      })
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to signup')
    }   
  },

  async loginWithGoogle() {
    try {
      window.location.href = `${API_CONFIG.BASE_URL}/auth/google/login`
      
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to login with Google' + error + API_CONFIG.BASE_URL)
    }
  },

  async signupWithGoogle() {
    try {
      window.location.href = `${API_CONFIG.BASE_URL}/auth/google/signup`
      
    } catch (error) {
        console.log(error)
      throw new Error(error.response?.data?.message || 'Failed to signup with Google' + error + API_CONFIG.BASE_URL)
    }
  },

  // Logout user
  async logout() {
    try {
      await axios.post(`${API_CONFIG.BASE_URL}/auth/logout`)
      localStorage.removeItem('user')
    } catch (error) {
      console.error('Logout error:', error)
      localStorage.removeItem('user')
    }
  },

  // Get current user
  async getCurrentUser() {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    
    try {
      const user = JSON.parse(userStr)
      await axios.get(`${API_CONFIG.BASE_URL}/users/me`)
      return user
    } catch (error) {
      localStorage.removeItem('user')
      return null
    }
  }
}