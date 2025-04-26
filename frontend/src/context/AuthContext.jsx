'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/AuthService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUserLoggedIn()
  }, [])

  const login = async (userData) => {
    setLoading(true)
    try {
      // const userData = await authService.login(email, password, rememberMe)
      setUser(userData)
      return userData
    } finally {
      setLoading(false)
    }
  }
  const register = async (userData) => {
    try {
      // const userData = await authService.register(fullName, email, password)
      setUser(userData)
      // navigate('/auth?state=login&message=Signup successful')
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }


  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      const userData = await authService.loginWithGoogle()
      setUser(userData)
      navigate('/home?message=Login successful') 
      return userData
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await authService.logout()
      setUser(null)
      navigate('/auth?state=login&message=Logout successful')
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    logout,
    register,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthProvider;
