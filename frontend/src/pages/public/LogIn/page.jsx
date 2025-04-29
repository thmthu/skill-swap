'use client'

import AuthLayout from '@/components/auth/AuthLayout'
import AuthCard from '@/components/auth/AuthCard'
import LoginForm from '@/components/Form/loginForm'
import { motion } from 'framer-motion'
export default function Login() {
  return (
    <AuthLayout>
      <motion.div
      initial={{ x: 100, opacity: 0 }}  
      animate={{ x: 0, opacity: 1 }}   
      exit={{ x: -100, opacity: 0 }}   
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full h-full"
    >
        <AuthCard
          title="Hello, Welcome to"
          subtitle="Enter your email and password to login to your account."
          footerText="Don't have an account?"
          footerLink="/auth?state=signup"
          footerLinkText="Sign Up"
      >
        <LoginForm />
      </AuthCard>
      </motion.div>
    </AuthLayout>
  )
}
